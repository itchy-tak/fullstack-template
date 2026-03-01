'use client';

import type { OperationResponse, User } from '@takuya-ichikawa/api-types';
import { useRouter } from 'next/navigation';
import { ReactNode, useCallback, useState } from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Paragraph } from '@/components/ui/paragraph';
import { Separator } from '@/components/ui/separator';
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
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <CreateUserForm onCreated={() => void refreshUsers()} onError={setError} />

      <SearchUserForm />

      <Separator className="my-6" />

      {/* --- List --- */}
      <Heading as="h2" className="mb-3 text-base">
        All Users
      </Heading>
      {users.length === 0 ? (
        <Paragraph variant="muted">
          ユーザーがいません。上のフォームから作成してください。
        </Paragraph>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <Card key={user.id}>
              <CardContent>
                {editingId === user.id ? (
                  <div className="flex flex-col gap-2">
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
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
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
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle>
                        #{user.id} — {user.email}
                      </CardTitle>
                      {user.name !== null && <Paragraph variant="muted">{user.name}</Paragraph>}
                    </div>
                    <div className="flex items-center gap-1">
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
                        variant="destructive"
                        onClick={() => void handleDelete(user.id)}
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
        <Button variant="outline" onClick={() => void refreshUsers()}>
          Refresh
        </Button>
      </div>
    </>
  );
}
