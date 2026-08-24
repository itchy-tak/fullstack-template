'use client';

import { Stack, Text } from '@mantine/core';
import { IconBrandGithub, IconBrandGoogle } from '@tabler/icons-react';
import { signIn } from 'next-auth/react';
import { ReactNode } from 'react';

import { GatedButton } from '@/components/health/gated-button';

type Props = {
  callbackUrl?: string;
  onSignInAction?: () => void;
};

export function SignInContent({ callbackUrl, onSignInAction }: Props): ReactNode {
  const handleSignIn = async (provider: 'google' | 'github'): Promise<void> => {
    onSignInAction?.();
    await signIn(provider, callbackUrl ? { callbackUrl } : undefined);
  };

  return (
    <Stack>
      <Text size="sm" c="dimmed">
        認証プロバイダーを選択してください
      </Text>
      <GatedButton
        leftSection={<IconBrandGoogle size={18} />}
        variant="default"
        onClick={() => {
          void handleSignIn('google');
        }}
      >
        Google でサインイン
      </GatedButton>
      <GatedButton
        leftSection={<IconBrandGithub size={18} />}
        variant="default"
        onClick={() => {
          void handleSignIn('github');
        }}
      >
        GitHub でサインイン
      </GatedButton>
    </Stack>
  );
}
