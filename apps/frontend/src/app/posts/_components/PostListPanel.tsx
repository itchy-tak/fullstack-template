'use client';

import {
  Alert,
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
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

import { CreatePostForm } from './CreatePostForm';
import { SearchPostForm } from './SearchPostForm';

type Post = OperationResponse<'PostsController_findAll'>[number];

interface PostListPanelProps {
  initialPosts: Post[];
}

export function PostListPanel({ initialPosts }: PostListPanelProps): ReactNode {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editPublished, setEditPublished] = useState(false);

  const refreshPosts = useCallback(async () => {
    setError(null);
    try {
      const data = await apiClient('PostsController_findAll');
      setPosts(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    }
    router.refresh();
  }, [router]);

  const handleUpdate = async (id: number): Promise<void> => {
    setError(null);
    try {
      const body: { title?: string; content?: string; published?: boolean } = {
        published: editPublished,
      };
      if (editTitle.trim()) {
        body.title = editTitle;
      }
      if (editContent.trim()) {
        body.content = editContent;
      }
      const params: ApiClientParams<'PostsController_update'> = { path: { id }, body };
      await apiClient('PostsController_update', params);
      setEditingId(null);
      setEditTitle('');
      setEditContent('');
      setEditPublished(false);
      await refreshPosts();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Update failed');
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    setError(null);
    try {
      const removeParams: ApiClientParams<'PostsController_remove'> = { path: { id } };
      await apiClient('PostsController_remove', removeParams);
      await refreshPosts();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Delete failed');
    }
  };

  const startEditing = (post: Post): void => {
    setEditingId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content ?? '');
    setEditPublished(post.published);
  };

  return (
    <>
      {error !== null && (
        <Alert color="red" mb="md">
          {error}
        </Alert>
      )}

      <CreatePostForm onCreated={() => void refreshPosts()} onError={setError} />

      <SearchPostForm />

      <Divider my="lg" />

      <Title order={2} size="h5" mb="sm">
        All Posts
      </Title>

      {posts.length === 0 ? (
        <Text c="dimmed">まだ投稿がありません。上のフォームから作成してください。</Text>
      ) : (
        <Stack gap="sm">
          {posts.map((post) => (
            <Card key={post.id} withBorder>
              {editingId === post.id ? (
                <Stack gap="xs">
                  <TextInput
                    placeholder="title"
                    value={editTitle}
                    onChange={(e) => {
                      setEditTitle(e.target.value);
                    }}
                  />
                  <TextInput
                    placeholder="content"
                    value={editContent}
                    onChange={(e) => {
                      setEditContent(e.target.value);
                    }}
                  />
                  <Group>
                    <Checkbox
                      id={`published-${String(post.id)}`}
                      label="Published"
                      checked={editPublished}
                      onChange={(e) => {
                        setEditPublished(e.target.checked);
                      }}
                    />
                    <Button size="sm" onClick={() => void handleUpdate(post.id)}>
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
                <Group justify="space-between" align="flex-start">
                  <Stack gap={4}>
                    <Title order={4}>
                      #{post.id} — {post.title}
                    </Title>
                    {post.content !== null && <Text size="sm">{post.content}</Text>}
                    <Group gap="xs">
                      <Badge color={post.published ? 'blue' : 'gray'}>
                        {post.published ? '公開' : '下書き'}
                      </Badge>
                      {post.authorId !== null && (
                        <Text size="sm">Author ID: {String(post.authorId)}</Text>
                      )}
                    </Group>
                  </Stack>
                  <Group gap="xs">
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => {
                        startEditing(post);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      color="red"
                      onClick={() => {
                        void handleDelete(post.id);
                      }}
                    >
                      DELETE
                    </Button>
                  </Group>
                </Group>
              )}
            </Card>
          ))}
        </Stack>
      )}

      <Box mt={24}>
        <Button variant="default" onClick={() => void refreshPosts()}>
          Refresh
        </Button>
      </Box>
    </>
  );
}
