'use client';

import { Button } from '@mantine/core';
import { signOut, useSession } from 'next-auth/react';
import { ReactNode } from 'react';

import { SignInModal } from './sign-in-modal';

export function AuthButton(): ReactNode {
  const { status } = useSession();

  const handleSignOut = async (): Promise<void> => {
    await signOut();
  };

  if (status === 'authenticated') {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          void handleSignOut();
        }}
      >
        サインアウト
      </Button>
    );
  }

  return (
    <>
      <SignInModal />
    </>
  );
}
