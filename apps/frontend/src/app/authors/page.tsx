import type { OperationResponse } from 'api-types';
import { ReactNode } from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Heading } from '@/components/ui/heading';
import { Paragraph } from '@/components/ui/paragraph';
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
    <div className="mx-auto max-w-[800px] px-4 py-10">
      <Heading as="h1" className="mb-2 text-3xl">
        Authors
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

      <AuthorListPanel initialAuthors={initialAuthors} />
    </div>
  );
}
