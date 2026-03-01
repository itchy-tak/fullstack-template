'use client';

import { ReactNode, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { apiClient, type ApiClientParams } from '@/lib/api-client';

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
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Create Post</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Input
              placeholder="title (required)"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <Input
              placeholder="authorId (optional)"
              value={authorId}
              onChange={(e) => {
                setAuthorId(e.target.value);
              }}
              className="max-w-[160px]"
            />
          </div>
          <Input
            placeholder="content (optional)"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="create-post-published"
                checked={published}
                onCheckedChange={(checked) => {
                  setPublished(checked === true);
                }}
              />
              <Label htmlFor="create-post-published">Published</Label>
            </div>
            <Button onClick={() => void handleCreate()} className="shrink-0">
              POST
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
