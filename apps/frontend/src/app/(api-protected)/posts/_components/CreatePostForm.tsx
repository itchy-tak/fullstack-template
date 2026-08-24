'use client';

import { Button, Card, CardSection, Checkbox, Group, Stack, TextInput } from '@mantine/core';
import { ReactNode, useState } from 'react';

import { apiClient, type ApiClientParams } from '@/lib/api-client.server';

interface CreatePostFormProps {
  onCreated: () => void;
  onError: (message: string) => void;
}

export function CreatePostForm({ onCreated, onError }: CreatePostFormProps): ReactNode {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [published, setPublished] = useState(false);

  const handleCreate = async (): Promise<void> => {
    if (!title.trim()) {
      return;
    }
    try {
      const params: ApiClientParams<'PostsController_create'> = {
        body: {
          title,
          published,
          ...(content.trim() ? { content } : {}),
          ...(authorId.trim() ? { authorId: Number(authorId) } : {}),
        },
      };
      await apiClient('PostsController_create', params);
      setTitle('');
      setContent('');
      setAuthorId('');
      setPublished(false);
      onCreated();
    } catch (e) {
      onError(e instanceof Error ? e.message : '作成に失敗しました');
    }
  };

  return (
    <Card withBorder mb="lg">
      <CardSection withBorder inheritPadding py="xs" mb="sm">
        <strong>投稿を作成</strong>
      </CardSection>
      <Stack gap="sm">
        <Group>
          <TextInput
            placeholder="タイトル（必須）"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            style={{ flex: 1 }}
          />
          <TextInput
            placeholder="著者ID（任意）"
            value={authorId}
            onChange={(e) => {
              setAuthorId(e.target.value);
            }}
            style={{ width: 160 }}
          />
        </Group>
        <TextInput
          placeholder="本文（任意）"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <Group>
          <Checkbox
            id="create-post-published"
            label="公開"
            checked={published}
            onChange={(e) => {
              setPublished(e.target.checked);
            }}
          />
          <Button onClick={() => void handleCreate()} style={{ flexShrink: 0 }}>
            作成
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
