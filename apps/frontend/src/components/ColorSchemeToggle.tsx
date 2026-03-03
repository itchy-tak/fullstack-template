'use client';

import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { ReactNode } from 'react';

import { withClientOnly } from '@/utlis/with-client-only';

function ColorSchemeToggleContent(): ReactNode {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');

  const toggle = (): void => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ActionIcon onClick={toggle} variant="default" size="lg" aria-label="カラースキーム切替">
      {computedColorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
    </ActionIcon>
  );
}

// withClientOnly を適用して、クライアント側でのみレンダリングされるようにする
export const ColorSchemeToggle = withClientOnly(ColorSchemeToggleContent);
