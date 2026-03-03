'use client';

import { ReactNode, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { apiClient, type ApiClientParams } from '@/lib/api-client.server';

interface CreateAuthorFormProps {
  onCreated: () => void;
  onError: (message: string) => void;
}

export function CreateAuthorForm({ onCreated, onError }: CreateAuthorFormProps): ReactNode {
  const [name, setName] = useState('');

  const handleCreate = async (): Promise<void> => {
    try {
      const params: ApiClientParams<'AuthorsController_create'> = {
        body: { ...(name ? { name } : {}) },
      };
      await apiClient('AuthorsController_create', params);
      setName('');
      onCreated();
    } catch (e) {
      onError(e instanceof Error ? e.message : 'Create failed');
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Create Author</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <Input
            placeholder="name (optional)"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Button onClick={() => void handleCreate()} className="shrink-0">
            POST
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
