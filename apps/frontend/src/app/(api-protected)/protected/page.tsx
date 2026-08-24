import { Alert, Container, Text, Title } from '@mantine/core';
import { Metadata } from 'next';
import { ReactNode } from 'react';

import { BackButton } from '@/components/BackButton';
import { apiClient } from '@/lib/api-client.server';

export const metadata: Metadata = { title: '認証必須ページ' };

/**
 * 認証必須画面
 * バックエンドの GET /protected を呼び出し、結果を表示する
 */
export default async function ProtectedPage(): Promise<ReactNode> {
  const result = await apiClient('AppController_getProtected');

  return (
    <Container size="sm">
      <BackButton />
      <Title order={1} mb="md">
        認証必須ページ
      </Title>
      <Text c="dimmed" mb="lg">
        このページはログイン済みのユーザーのみ閲覧できます。
      </Text>
      <Alert title="バックエンド応答">{result.message}</Alert>
    </Container>
  );
}
