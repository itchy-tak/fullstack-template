'use client';

import { Alert, Button, Card, Divider, Group, Stack, Text, TextInput, Title } from '@mantine/core';
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
      setError(e instanceof Error ? e.message : 'Unknown error');
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
      setError(e instanceof Error ? e.message : 'Update failed');
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    setError(null);
    try {
      const removeParams: ApiClientParams<'AuthorsController_remove'> = { path: { id } };
      await apiClient('AuthorsController_remove', removeParams);
      await refreshAuthors();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Delete failed');
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
        All Authors
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
                      PATCH
                    </Button>
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => {
                        setEditingId(null);
                      }}
                    >
                      Cancel
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
                      Edit
                    </Button>
                    <Button size="sm" color="red" onClick={() => void handleDelete(author.id)}>
                      DELETE
                    </Button>
                  </Group>
                </Group>
              )}
            </Card>
          ))}
        </Stack>
      )}

      <div style={{ marginTop: 24 }}>
        <Button variant="default" onClick={() => void refreshAuthors()}>
          Refresh
        </Button>
      </div>
    </>
  );
}
