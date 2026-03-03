'use client';

import { Group } from '@mantine/core';
import { ReactNode } from 'react';

import { AuthButton } from './auth/auth-button';
import { ColorSchemeToggle } from './ColorSchemeToggle';

// 画面右上に固定表示するグローバルヘッダーUI
export function GlobalHeader(): ReactNode {
  return (
    <Group pos="fixed" top={16} right={16} style={{ zIndex: 1000 }} gap="xs">
      <AuthButton />
      <ColorSchemeToggle />
    </Group>
  );
}
