'use client';

import type { OperationResponse } from 'api-types';
import { ReactNode, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Paragraph } from '@/components/ui/paragraph';
import { apiClient, type ApiClientParams } from '@/lib/api-client.server';

type AuthorDetail = OperationResponse<'AuthorsController_findOne'>;

export function SearchAuthorForm(): ReactNode {
  const [searchId, setSearchId] = useState('');
  const [foundAuthor, setFoundAuthor] = useState<AuthorDetail | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = async (): Promise<void> => {
    setSearchError(null);
    setFoundAuthor(null);
    if (!searchId.trim()) {
      return;
    }
    try {
      const params: ApiClientParams<'AuthorsController_findOne'> = {
        path: { id: Number(searchId) },
      };
      const data = await apiClient('AuthorsController_findOne', params);
      setFoundAuthor(data);
    } catch (e) {
      setSearchError(e instanceof Error ? e.message : 'Not found');
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Get Author by ID</CardTitle>
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
        {foundAuthor !== null && (
          <Card className="mt-2">
            <CardHeader>
              <CardTitle>
                #{foundAuthor.id} — {foundAuthor.name}
              </CardTitle>
            </CardHeader>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
