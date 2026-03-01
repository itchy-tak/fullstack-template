'use client';

import type { OperationResponse } from '@takuya-ichikawa/api-types';
import { ReactNode, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Paragraph } from '@/components/ui/paragraph';
import { apiClient, type ApiClientParams } from '@/lib/api-client';

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
      setSearchError(e instanceof Error ? e.message : 'Not found');
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Get Post by ID</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-2 flex items-center gap-2">
          <Input
            placeholder="id"
            value={searchId}
            onChange={(e) => {
              setSearchId(e.target.value);
            }}
            className="max-w-[120px]"
          />
          <Button onClick={() => void handleSearch()}>GET</Button>
        </div>
        {searchError !== null && <Paragraph variant="destructive">{searchError}</Paragraph>}
        {foundPost !== null && (
          <Card className="mt-2">
            <CardHeader>
              <CardTitle>
                #{foundPost.id} — {foundPost.title}
              </CardTitle>
              {foundPost.content !== null && <CardDescription>{foundPost.content}</CardDescription>}
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Badge variant={foundPost.published ? 'default' : 'secondary'}>
                  {foundPost.published ? '公開' : '下書き'}
                </Badge>
                {foundPost.authorId !== null && (
                  <Paragraph variant="sm">Author ID: {String(foundPost.authorId)}</Paragraph>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
