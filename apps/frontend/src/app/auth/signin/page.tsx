import { Container, Paper, Title } from '@mantine/core';
import { Metadata } from 'next';
import { ReactNode } from 'react';

import { SignInContent } from '@/components/auth/sign-in-content';
import { BackButton } from '@/components/BackButton';

export const metadata: Metadata = { title: 'サインイン' };

type Props = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

export default async function SignInPage({ searchParams }: Props): Promise<ReactNode> {
  const { callbackUrl } = await searchParams;

  return (
    <Container size="sm">
      <BackButton />
      <Paper withBorder shadow="md" p="xl" radius="md">
        <Title order={3} mb="md" ta="center">
          サインイン
        </Title>
        <SignInContent callbackUrl={callbackUrl} />
      </Paper>
    </Container>
  );
}
