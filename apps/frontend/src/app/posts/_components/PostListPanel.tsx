'use client';

import { Box, Button, Heading, HStack, Input, Stack, Text, VStack } from '@chakra-ui/react';
import type { OperationResponse, Post } from '@takuya-ichikawa/api-types';
import { useRouter } from 'next/navigation';
import { ReactNode, useCallback, useState } from 'react';

import { apiClient, type ApiClientParams } from '@/lib/api-client';

import { CreatePostForm } from './CreatePostForm';
import { SearchPostForm } from './SearchPostForm';

type Posts = OperationResponse<'PostsController_findAll'>;

interface PostListPanelProps {
  initialPosts: Posts;
}

export function PostListPanel({ initialPosts }: PostListPanelProps): ReactNode {
  const router = useRouter();
  const [posts, setPosts] = useState<Posts>(initialPosts);
  const [error, setError] = useState<string | null>(null);

  // --- Update form ---
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
      const params: ApiClientParams<'PostsController_update'> = {
        path: { id },
        body,
      };
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
        <Box mb={4} p={3} bg="red.50" borderRadius="md">
          <Text color="red.600">{error}</Text>
        </Box>
      )}

      <CreatePostForm onCreated={() => void refreshPosts()} onError={setError} />

      <SearchPostForm />

      {/* --- List --- */}
      <Heading as="h2" size="md" mb={3}>
        All Posts
      </Heading>
      {posts.length === 0 ? (
        <Text color="gray.500">まだ投稿がありません。上のフォームから作成してください。</Text>
      ) : (
        <Stack gap={3}>
          {posts.map((post) => (
            <Box key={post.id} p={4} borderWidth="1px" borderRadius="lg">
              {editingId === post.id ? (
                <VStack align="stretch" gap={2}>
                  <Input
                    placeholder="title"
                    value={editTitle}
                    onChange={(e) => {
                      setEditTitle(e.target.value);
                    }}
                  />
                  <Input
                    placeholder="content"
                    value={editContent}
                    onChange={(e) => {
                      setEditContent(e.target.value);
                    }}
                  />
                  <HStack gap={2}>
                    <label>
                      <input
                        type="checkbox"
                        checked={editPublished}
                        onChange={(e) => {
                          setEditPublished(e.target.checked);
                        }}
                      />{' '}
                      Published
                    </label>
                    <Button
                      size="sm"
                      colorPalette="green"
                      onClick={() => void handleUpdate(post.id)}
                    >
                      PATCH
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingId(null);
                      }}
                    >
                      Cancel
                    </Button>
                  </HStack>
                </VStack>
              ) : (
                <HStack justifyContent="space-between">
                  <Box>
                    <Text fontWeight="bold">
                      #{post.id} — {post.title}
                    </Text>
                    {post.content !== null && (
                      <Text color="gray.600" fontSize="sm">
                        {post.content}
                      </Text>
                    )}
                    <Text fontSize="xs" color="gray.400">
                      {post.published ? '公開' : '下書き'}
                      {post.authorId !== null ? ` · Author ID: ${String(post.authorId)}` : ''}
                    </Text>
                  </Box>
                  <HStack gap={1}>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        startEditing(post);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      colorPalette="red"
                      variant="outline"
                      onClick={() => {
                        void handleDelete(post.id);
                      }}
                    >
                      DELETE
                    </Button>
                  </HStack>
                </HStack>
              )}
            </Box>
          ))}
        </Stack>
      )}

      <Box mt={6}>
        <Button variant="outline" onClick={() => void refreshPosts()}>
          Refresh
        </Button>
      </Box>
    </>
  );
}
