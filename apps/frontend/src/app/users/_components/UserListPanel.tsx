'use client';

import { Box, Button, Heading, HStack, Input, Stack, Text, VStack } from '@chakra-ui/react';
import type { OperationResponse, User } from '@takuya-ichikawa/api-types';
import { useRouter } from 'next/navigation';
import { ReactNode, useCallback, useState } from 'react';

import { apiClient, type ApiClientParams } from '@/lib/api-client';

import { CreateUserForm } from './CreateUserForm';
import { SearchUserForm } from './SearchUserForm';

type Users = OperationResponse<'UsersController_findAll'>;

interface UserListPanelProps {
  initialUsers: Users;
}

export function UserListPanel({ initialUsers }: UserListPanelProps): ReactNode {
  const router = useRouter();
  const [users, setUsers] = useState<Users>(initialUsers);
  const [error, setError] = useState<string | null>(null);

  // --- Update form ---
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editEmail, setEditEmail] = useState('');
  const [editName, setEditName] = useState('');

  const refreshUsers = useCallback(async () => {
    setError(null);
    try {
      const data = await apiClient('UsersController_findAll');
      setUsers(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    }
    router.refresh();
  }, [router]);

  const handleUpdate = async (id: number): Promise<void> => {
    setError(null);
    try {
      const body: { email?: string; name?: string } = {};
      if (editEmail.trim()) {
        body.email = editEmail;
      }
      if (editName.trim()) {
        body.name = editName;
      }
      const params: ApiClientParams<'UsersController_update'> = {
        path: { id },
        body,
      };
      await apiClient('UsersController_update', params);
      setEditingId(null);
      setEditEmail('');
      setEditName('');
      await refreshUsers();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Update failed');
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    setError(null);
    try {
      const removeParams: ApiClientParams<'UsersController_remove'> = { path: { id } };
      await apiClient('UsersController_remove', removeParams);
      await refreshUsers();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Delete failed');
    }
  };

  const startEditing = (user: User): void => {
    setEditingId(user.id);
    setEditEmail(user.email);
    setEditName(user.name ?? '');
  };

  return (
    <>
      {error !== null && (
        <Box mb={4} p={3} bg="red.50" borderRadius="md">
          <Text color="red.600">{error}</Text>
        </Box>
      )}

      <CreateUserForm onCreated={() => void refreshUsers()} onError={setError} />

      <SearchUserForm />

      {/* --- List --- */}
      <Heading as="h2" size="md" mb={3}>
        All Users
      </Heading>
      {users.length === 0 ? (
        <Text color="gray.500">ユーザーがいません。上のフォームから作成してください。</Text>
      ) : (
        <Stack gap={3}>
          {users.map((user) => (
            <Box key={user.id} p={4} borderWidth="1px" borderRadius="lg">
              {editingId === user.id ? (
                <VStack align="stretch" gap={2}>
                  <Input
                    placeholder="email"
                    value={editEmail}
                    onChange={(e) => {
                      setEditEmail(e.target.value);
                    }}
                  />
                  <Input
                    placeholder="name"
                    value={editName}
                    onChange={(e) => {
                      setEditName(e.target.value);
                    }}
                  />
                  <HStack gap={2}>
                    <Button
                      size="sm"
                      colorPalette="green"
                      onClick={() => {
                        void handleUpdate(user.id);
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
                  </HStack>
                </VStack>
              ) : (
                <HStack justifyContent="space-between">
                  <Box>
                    <Text fontWeight="bold">
                      #{user.id} — {user.email}
                    </Text>
                    {user.name !== null && <Text color="gray.500">{user.name}</Text>}
                  </Box>
                  <HStack gap={1}>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        startEditing(user);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      colorPalette="red"
                      variant="outline"
                      onClick={() => void handleDelete(user.id)}
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
        <Button variant="outline" onClick={() => void refreshUsers()}>
          Refresh
        </Button>
      </Box>
    </>
  );
}
