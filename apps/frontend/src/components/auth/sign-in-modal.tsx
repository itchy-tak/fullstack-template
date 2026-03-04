'use client';

import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ReactNode } from 'react';

import { SignInContent } from './sign-in-content';

export function SignInModal(): ReactNode {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button variant="outline" size="sm" onClick={open}>
        サインイン
      </Button>
      <Modal opened={opened} onClose={close} title="サインイン" centered>
        <SignInContent onSignInAction={close} />
      </Modal>
    </>
  );
}
