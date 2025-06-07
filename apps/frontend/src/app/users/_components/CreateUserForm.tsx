'use client';

import { Box, Button, Heading, HStack, Input } from '@chakra-ui/react';
import { ReactNode, useState } from 'react';

import { apiClient, type ApiClientParams } from '@/lib/api-client';

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
    <Box mb={8} p={5} borderWidth="1px" borderRadius="lg">
      <Heading as="h2" size="md" mb={3}>
        Create User
      </Heading>
      <HStack gap={2}>
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
        <Button colorPalette="blue" onClick={() => void handleCreate()} flexShrink={0}>
          POST
        </Button>
      </HStack>
    </Box>
  );
}
