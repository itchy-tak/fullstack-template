'use client';

import { AppShell, Group } from '@mantine/core';
import { ReactNode } from 'react';

import { AuthButton } from './auth/auth-button';
import { ColorSchemeToggle } from './ColorSchemeToggle';

export function AppShellLayout({ children }: { children: ReactNode }): ReactNode {
  return (
    <AppShell padding="md" header={{ height: 60 }}>
      <AppShell.Header>
        <Group h="100%" px="md" justify="flex-end" gap="xs">
          <AuthButton />
          <ColorSchemeToggle />
        </Group>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
