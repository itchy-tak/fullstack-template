import { Container, Text, Title } from '@mantine/core';
import { Metadata } from 'next';
import { ReactNode } from 'react';

import { BackButton } from '@/components/BackButton';

export const metadata: Metadata = { title: '認証必須ページ' };

/**
 * 認証必須画面のテンプレート
 * middleware.ts によって、未認証ユーザーはサインイン画面にリダイレクトされる
 */
export default function ProtectedPage(): ReactNode {
  return (
    <Container size="sm" py="xl">
      <BackButton />
      <Title order={1} mb="md">
        認証必須ページ
      </Title>
      <Text c="dimmed">このページはログイン済みのユーザーのみ閲覧できます。</Text>
    </Container>
  );
}
