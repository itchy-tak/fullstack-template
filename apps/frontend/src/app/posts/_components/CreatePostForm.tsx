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
      onError(e instanceof Error ? e.message : 'Create failed');
    }
  };

  return (
    <Card withBorder mb="lg">
      <CardSection withBorder inheritPadding py="xs" mb="sm">
        <strong>Create Post</strong>
      </CardSection>
      <Stack gap="sm">
        <Group>
          <TextInput
            placeholder="title (required)"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            style={{ flex: 1 }}
          />
          <TextInput
            placeholder="authorId (optional)"
            value={authorId}
            onChange={(e) => {
              setAuthorId(e.target.value);
            }}
            style={{ width: 160 }}
          />
        </Group>
        <TextInput
          placeholder="content (optional)"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <Group>
          <Checkbox
            id="create-post-published"
            label="Published"
            checked={published}
            onChange={(e) => {
              setPublished(e.target.checked);
            }}
          />
          <Button onClick={() => void handleCreate()} style={{ flexShrink: 0 }}>
            POST
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
