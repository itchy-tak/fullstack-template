import { Alert, Container, Text, Title } from '@mantine/core';
import type { OperationResponse } from 'api-types';
import { ReactNode } from 'react';

import { apiClient } from '@/lib/api-client.server';

import { AuthorListPanel } from './_components';

type Authors = OperationResponse<'AuthorsController_findAll'>;

/**
 * /authors — SSR page (Server Component).
 * サーバーサイドで Backend API から著者一覧を取得し、
 * インタラクティブな CRUD 操作は Client Component に委譲する。
 */
export default async function AuthorsPage(): Promise<ReactNode> {
  let initialAuthors: Authors = [];
  let fetchError: string | null = null;

  try {
    initialAuthors = await apiClient('AuthorsController_findAll');
  } catch (e) {
    fetchError = e instanceof Error ? e.message : 'Failed to fetch authors';
  }

  return (
    <Container size="sm" py="xl">
      <Title order={1} mb={4}>
        Authors
      </Title>
      <Text size="sm" c="dimmed" mb="lg">
        SSR — サーバーサイドでデータ取得 / CSR コンポーネントで CRUD 操作
      </Text>

      {fetchError !== null && (
        <Alert color="red" mb="md">
          サーバーサイドでのデータ取得に失敗しました: {fetchError}
        </Alert>
      )}

      <AuthorListPanel initialAuthors={initialAuthors} />
    </Container>
  );
}
