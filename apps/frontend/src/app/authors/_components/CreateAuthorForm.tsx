'use client';

import { Button, Card, CardSection, Group, TextInput } from '@mantine/core';
import { ReactNode, useState } from 'react';

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
    <Card withBorder mb="lg">
      <CardSection withBorder inheritPadding py="xs" mb="sm">
        <strong>Create Author</strong>
      </CardSection>
      <Group>
        <TextInput
          placeholder="name (optional)"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          style={{ flex: 1 }}
        />
        <Button onClick={() => void handleCreate()} style={{ flexShrink: 0 }}>
          POST
        </Button>
      </Group>
    </Card>
  );
}
