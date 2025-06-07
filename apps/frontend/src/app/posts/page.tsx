import { Container, Heading, Text } from '@chakra-ui/react';
import type { OperationResponse } from '@takuya-ichikawa/api-types';
import { ReactNode } from 'react';

import { PostListPanel } from './_components';

const BACKEND_URL = process.env.BACKEND_URL ?? 'http://localhost:5000';

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
    const res = await fetch(`${BACKEND_URL}/posts`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`${String(res.status)} ${res.statusText}`);
    }
    initialPosts = (await res.json()) as Posts;
  } catch (e) {
    fetchError = e instanceof Error ? e.message : 'Failed to fetch posts';
  }

  return (
    <Container maxW="800px" py={10}>
      <Heading as="h1" size="2xl" mb={2}>
        Posts
      </Heading>
      <Text color="gray.500" mb={6} fontSize="sm">
        SSR — サーバーサイドでデータ取得 / CSR コンポーネントで CRUD 操作
      </Text>

      {fetchError !== null && (
        <Text color="red.500" mb={4}>
          サーバーサイドでのデータ取得に失敗しました: {fetchError}
        </Text>
      )}

      <PostListPanel initialPosts={initialPosts} />
    </Container>
  );
}
