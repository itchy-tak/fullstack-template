'use client';

import {
  Badge,
  Button,
  Card,
  CardSection,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import type { OperationResponse } from 'api-types';
import { ReactNode, useState } from 'react';

import { apiClient, type ApiClientParams } from '@/lib/api-client.server';

type PostDetail = OperationResponse<'PostsController_findOne'>;

export function SearchPostForm(): ReactNode {
  const [searchId, setSearchId] = useState('');
  const [foundPost, setFoundPost] = useState<PostDetail | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = async (): Promise<void> => {
    setSearchError(null);
    setFoundPost(null);
    if (!searchId.trim()) {
      return;
    }
    try {
      const params: ApiClientParams<'PostsController_findOne'> = {
        path: { id: Number(searchId) },
      };
      const data = await apiClient('PostsController_findOne', params);
      setFoundPost(data);
    } catch (e) {
      setSearchError(e instanceof Error ? e.message : '投稿が見つかりませんでした');
    }
  };

  return (
    <Card withBorder mb="lg">
      <CardSection withBorder inheritPadding py="xs" mb="sm">
        <strong>IDで投稿を検索</strong>
      </CardSection>
      <Group mb="xs">
        <TextInput
          placeholder="id"
          value={searchId}
          onChange={(e) => {
            setSearchId(e.target.value);
          }}
          style={{ width: 120 }}
        />
        <Button onClick={() => void handleSearch()}>検索</Button>
      </Group>
      {searchError !== null && (
        <Text c="red" size="sm">
          {searchError}
        </Text>
      )}
      {foundPost !== null && (
        <Card withBorder mt="xs">
          <Title order={4} mb={4}>
            #{foundPost.id} — {foundPost.title}
          </Title>
          {foundPost.content !== null && (
            <Text size="sm" c="dimmed" mb="xs">
              {foundPost.content}
            </Text>
          )}
          <Stack gap={4}>
            <Group gap="xs">
              <Badge color={foundPost.published ? 'blue' : 'gray'}>
                {foundPost.published ? '公開' : '下書き'}
              </Badge>
              {foundPost.authorId !== null && (
                <Text size="sm">著者ID: {String(foundPost.authorId)}</Text>
              )}
            </Group>
          </Stack>
        </Card>
      )}
    </Card>
  );
}
