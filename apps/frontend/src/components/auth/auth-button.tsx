'use client';

import { Button } from '@mantine/core';
import { signIn, signOut, useSession } from 'next-auth/react';
import { ReactNode } from 'react';

export function AuthButton(): ReactNode {
  const { status } = useSession();

  const handleClick = async (): Promise<void> => {
    if (status === 'authenticated') {
      await signOut();
    } else {
      await signIn('google');
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        void handleClick();
      }}
    >
      {status === 'authenticated' ? 'サインアウト' : 'サインイン'}
    </Button>
  );
}
