'use client';

import type { OperationResponse, Post } from 'api-types';
import { useRouter } from 'next/navigation';
import { ReactNode, useCallback, useState } from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Paragraph } from '@/components/ui/paragraph';
import { Separator } from '@/components/ui/separator';
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
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <CreatePostForm onCreated={() => void refreshPosts()} onError={setError} />

      <SearchPostForm />

      <Separator className="my-6" />

      {/* --- List --- */}
      <Heading as="h2" className="mb-3 text-base">
        All Posts
      </Heading>
      {posts.length === 0 ? (
        <Paragraph variant="muted">
          まだ投稿がありません。上のフォームから作成してください。
        </Paragraph>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardContent>
                {editingId === post.id ? (
                  <div className="flex flex-col gap-2">
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
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`published-${String(post.id)}`}
                          checked={editPublished}
                          onCheckedChange={(checked) => {
                            setEditPublished(checked === true);
                          }}
                        />
                        <Label htmlFor={`published-${String(post.id)}`}>Published</Label>
                      </div>
                      <Button size="sm" onClick={() => void handleUpdate(post.id)}>
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
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle>
                        #{post.id} — {post.title}
                      </CardTitle>
                      {post.content !== null && <Paragraph variant="sm">{post.content}</Paragraph>}
                      <div className="flex items-center gap-2">
                        <Badge variant={post.published ? 'default' : 'secondary'}>
                          {post.published ? '公開' : '下書き'}
                        </Badge>
                        {post.authorId !== null && (
                          <Paragraph variant="sm">Author ID: {String(post.authorId)}</Paragraph>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
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
                        variant="destructive"
                        onClick={() => {
                          void handleDelete(post.id);
                        }}
                      >
                        DELETE
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-6">
        <Button variant="outline" onClick={() => void refreshPosts()}>
          Refresh
        </Button>
      </div>
    </>
  );
}
