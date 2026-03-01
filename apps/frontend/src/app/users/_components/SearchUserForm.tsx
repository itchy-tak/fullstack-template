'use client';

import type { OperationResponse } from 'api-types';
import { ReactNode, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Paragraph } from '@/components/ui/paragraph';
import { apiClient, type ApiClientParams } from '@/lib/api-client';

type UserDetail = OperationResponse<'UsersController_findOne'>;

export function SearchUserForm(): ReactNode {
  const [searchId, setSearchId] = useState('');
  const [foundUser, setFoundUser] = useState<UserDetail | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = async (): Promise<void> => {
    setSearchError(null);
    setFoundUser(null);
    if (!searchId.trim()) {
      return;
    }
    try {
      const params: ApiClientParams<'UsersController_findOne'> = {
        path: { id: Number(searchId) },
      };
      const data = await apiClient('UsersController_findOne', params);
      setFoundUser(data);
    } catch (e) {
      setSearchError(e instanceof Error ? e.message : 'Not found');
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Get User by ID</CardTitle>
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
        {foundUser !== null && (
          <Card className="mt-2">
            <CardHeader>
              <CardTitle>
                #{foundUser.id} — {foundUser.email}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Paragraph variant="muted">
                {foundUser.name !== null ? foundUser.name : '(名前未設定)'}
              </Paragraph>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
