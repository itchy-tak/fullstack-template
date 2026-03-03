'use client';

import type { OperationResponse } from 'api-types';
import { useRouter } from 'next/navigation';
import { ReactNode, useCallback, useState } from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Paragraph } from '@/components/ui/paragraph';
import { Separator } from '@/components/ui/separator';
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

  // --- Update form ---
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
      const params: ApiClientParams<'AuthorsController_update'> = {
        path: { id },
        body,
      };
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
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <CreateAuthorForm onCreated={() => void refreshAuthors()} onError={setError} />

      <SearchAuthorForm />

      <Separator className="my-6" />

      {/* --- List --- */}
      <Heading as="h2" className="mb-3 text-base">
        All Authors
      </Heading>
      {authors.length === 0 ? (
        <Paragraph variant="muted">著者がいません。上のフォームから作成してください。</Paragraph>
      ) : (
        <div className="space-y-3">
          {authors.map((author) => (
            <Card key={author.id}>
              <CardContent>
                {editingId === author.id ? (
                  <div className="flex flex-col gap-2">
                    <Input
                      placeholder="name"
                      value={editName}
                      onChange={(e) => {
                        setEditName(e.target.value);
                      }}
                    />
                    <div className="flex items-center gap-2">
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
                        #{author.id} — {author.name}
                      </CardTitle>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          startEditing(author);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => void handleDelete(author.id)}
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
        <Button variant="outline" onClick={() => void refreshAuthors()}>
          Refresh
        </Button>
      </div>
    </>
  );
}
