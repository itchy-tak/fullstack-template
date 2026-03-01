'use client';

import { ReactNode, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { apiClient, type ApiClientParams } from '@/lib/api-client.server';

interface CreateUserFormProps {
  onCreated: () => void;
  onError: (message: string) => void;
}

export function CreateUserForm({ onCreated, onError }: CreateUserFormProps): ReactNode {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleCreate = async (): Promise<void> => {
    if (!email.trim()) {
      return;
    }
    try {
      const params: ApiClientParams<'UsersController_create'> = {
        body: { email, ...(name ? { name } : {}) },
      };
      await apiClient('UsersController_create', params);
      setEmail('');
      setName('');
      onCreated();
    } catch (e) {
      onError(e instanceof Error ? e.message : 'Create failed');
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Create User</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <Input
            placeholder="email (required)"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
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
