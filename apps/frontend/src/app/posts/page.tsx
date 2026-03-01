import type { OperationResponse } from 'api-types';
import { ReactNode } from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Heading } from '@/components/ui/heading';
import { Paragraph } from '@/components/ui/paragraph';
import { apiClient } from '@/lib/api-client.server';

import { PostListPanel } from './_components';

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
    fetchError = e instanceof Error ? e.message : 'Failed to fetch posts';
  }

  return (
    <div className="mx-auto max-w-[800px] px-4 py-10">
      <Heading as="h1" className="mb-2 text-3xl">
        Posts
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

      <PostListPanel initialPosts={initialPosts} />
    </div>
  );
}
