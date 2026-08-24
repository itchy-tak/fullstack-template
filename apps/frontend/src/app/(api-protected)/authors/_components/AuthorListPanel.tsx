'use client';

import {
  Alert,
  Box,
  Button,
  Card,
  Divider,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import type { OperationResponse } from 'api-types';
import { useRouter } from 'next/navigation';
import { ReactNode, useCallback, useState } from 'react';

import { apiClient, type ApiClientParams } from '@/lib/api-client.server';

import { CreateAuthorForm } from './CreateAuthorForm';
import { SearchAuthorForm } from './SearchAuthorForm';

type Author = OperationResponse<'AuthorsController_findAll'>[number];

interface AuthorListPanelProps {
  initialAuthors: Author[];
}

export function AuthorListPanel({ initialAuthors }: AuthorListPanelProps): ReactNode {
  const router = useRouter();
  const [authors, setAuthors] = useState<Author[]>(initialAuthors);
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');

  const refreshAuthors = useCallback(async () => {
    setError(null);
    try {
      const data = await apiClient('AuthorsController_findAll');
      setAuthors(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : '不明なエラーが発生しました');
    }
    router.refresh();
  }, [router]);

  const handleUpdate = async (id: number): Promise<void> => {
    setError(null);
    try {
      const body: { name?: string } = {};
      if (editName.trim()) {
        body.name = editName;
      }
      const params: ApiClientParams<'AuthorsController_update'> = { path: { id }, body };
      await apiClient('AuthorsController_update', params);
      setEditingId(null);
      setEditName('');
      await refreshAuthors();
    } catch (e) {
      setError(e instanceof Error ? e.message : '更新に失敗しました');
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    setError(null);
    try {
      const removeParams: ApiClientParams<'AuthorsController_remove'> = { path: { id } };
      await apiClient('AuthorsController_remove', removeParams);
      await refreshAuthors();
    } catch (e) {
      setError(e instanceof Error ? e.message : '削除に失敗しました');
    }
  };

  const startEditing = (author: Author): void => {
    setEditingId(author.id);
    setEditName(author.name ?? '');
  };

  return (
    <>
      {error !== null && (
        <Alert color="red" mb="md">
          {error}
        </Alert>
      )}

      <CreateAuthorForm onCreated={() => void refreshAuthors()} onError={setError} />

      <SearchAuthorForm />

      <Divider my="lg" />

      <Title order={2} size="h5" mb="sm">
        著者一覧
      </Title>

      {authors.length === 0 ? (
        <Text c="dimmed">著者がいません。上のフォームから作成してください。</Text>
      ) : (
        <Stack gap="sm">
          {authors.map((author) => (
            <Card key={author.id} withBorder>
              {editingId === author.id ? (
                <Stack gap="xs">
                  <TextInput
                    placeholder="name"
                    value={editName}
                    onChange={(e) => {
                      setEditName(e.target.value);
                    }}
                  />
                  <Group>
                    <Button
                      size="sm"
                      onClick={() => {
                        void handleUpdate(author.id);
                      }}
                    >
                      更新
                    </Button>
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => {
                        setEditingId(null);
                      }}
                    >
                      キャンセル
                    </Button>
                  </Group>
                </Stack>
              ) : (
                <Group justify="space-between">
                  <Title order={4}>
                    #{author.id} — {author.name}
                  </Title>
                  <Group gap="xs">
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => {
                        startEditing(author);
                      }}
                    >
                      編集
                    </Button>
                    <Button size="sm" color="red" onClick={() => void handleDelete(author.id)}>
                      削除
                    </Button>
                  </Group>
                </Group>
              )}
            </Card>
          ))}
        </Stack>
      )}

      <Box mt={24}>
        <Button variant="default" onClick={() => void refreshAuthors()}>
          更新
        </Button>
      </Box>
    </>
  );
}
