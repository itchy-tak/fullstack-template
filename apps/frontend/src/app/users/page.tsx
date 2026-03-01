import type { OperationResponse } from 'api-types';
import { ReactNode } from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Heading } from '@/components/ui/heading';
import { Paragraph } from '@/components/ui/paragraph';

import { UserListPanel } from './_components';

const BACKEND_URL = process.env.BACKEND_URL ?? 'http://localhost:5000';

type Users = OperationResponse<'UsersController_findAll'>;

/**
 * /users — SSR page (Server Component).
 * サーバーサイドで Backend API からユーザー一覧を取得し、
 * インタラクティブな CRUD 操作は Client Component に委譲する。
 */
export default async function UsersPage(): Promise<ReactNode> {
  let initialUsers: Users = [];
  let fetchError: string | null = null;

  try {
    const res = await fetch(`${BACKEND_URL}/users`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`${String(res.status)} ${res.statusText}`);
    }
    initialUsers = (await res.json()) as Users;
  } catch (e) {
    fetchError = e instanceof Error ? e.message : 'Failed to fetch users';
  }

  return (
    <div className="mx-auto max-w-[800px] px-4 py-10">
      <Heading as="h1" className="mb-2 text-3xl">
        Users
      </Heading>
      <Paragraph variant="sm" className="mb-6">
        SSR — サーバーサイドでデータ取得 / CSR コンポーネントで CRUD 操作
      </Paragraph>

      {fetchError !== null && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            サーバーサイドでのデータ取得に失敗しました: {fetchError}
          </AlertDescription>
        </Alert>
      )}

      <UserListPanel initialUsers={initialUsers} />
    </div>
  );
}
