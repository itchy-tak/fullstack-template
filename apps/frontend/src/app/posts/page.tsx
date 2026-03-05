import { Alert, Container, Text, Title } from '@mantine/core';
import type { OperationResponse } from 'api-types';
import { Metadata } from 'next';
import { ReactNode } from 'react';

import { BackButton } from '@/components/BackButton';
import { apiClient } from '@/lib/api-client.server';

import { PostListPanel } from './_components';

export const metadata: Metadata = { title: '投稿' };

type Posts = OperationResponse<'PostsController_findAll'>;

/**
 * /posts — SSR page (Server Component).
 * サーバーサイドで Backend API から投稿一覧を取得し、
 * インタラクティブな CRUD 操作は Client Component に委譲する。
 */
export default async function PostsPage(): Promise<ReactNode> {
  let initialPosts: Posts = [];
  let fetchError: string | null = null;

  try {
    initialPosts = await apiClient('PostsController_findAll');
  } catch (e) {
    fetchError = e instanceof Error ? e.message : '投稿の取得に失敗しました';
  }

  return (
    <Container size="sm" py="xl">
      <BackButton />
      <Title order={1} mb={4}>
        投稿
      </Title>
      <Text size="sm" c="dimmed" mb="lg">
        SSR — サーバーサイドでデータ取得 / CSR コンポーネントで CRUD 操作
      </Text>

      {fetchError !== null && (
        <Alert color="red" mb="md">
          サーバーサイドでのデータ取得に失敗しました: {fetchError}
        </Alert>
      )}

      <PostListPanel initialPosts={initialPosts} />
    </Container>
  );
}
