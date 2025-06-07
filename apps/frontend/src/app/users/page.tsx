import { Container, Heading, Text } from '@chakra-ui/react';
import type { OperationResponse } from '@takuya-ichikawa/api-types';
import { ReactNode } from 'react';

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
    <Container maxW="800px" py={10}>
      <Heading as="h1" size="2xl" mb={2}>
        Users
      </Heading>
      <Text color="gray.500" mb={6} fontSize="sm">
        SSR — サーバーサイドでデータ取得 / CSR コンポーネントで CRUD 操作
      </Text>

      {fetchError !== null && (
        <Text color="red.500" mb={4}>
          サーバーサイドでのデータ取得に失敗しました: {fetchError}
        </Text>
      )}

      <UserListPanel initialUsers={initialUsers} />
    </Container>
  );
}
