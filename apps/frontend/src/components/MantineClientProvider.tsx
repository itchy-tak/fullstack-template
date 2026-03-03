'use client';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ReactNode } from 'react';

import { ColorSchemeToggle } from './ColorSchemeToggle';

export function MantineClientProvider({ children }: { children: ReactNode }): ReactNode {
  return (
    <MantineProvider>
      <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}>
        <ColorSchemeToggle />
      </div>
      <Notifications position="bottom-right" />
      {children}
    </MantineProvider>
  );
}
