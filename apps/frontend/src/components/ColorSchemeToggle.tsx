'use client';

import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { ReactNode } from 'react';

export function ColorSchemeToggle(): ReactNode {
  const { toggleColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <ActionIcon
      onClick={() => {
        toggleColorScheme();
      }}
      variant="default"
      size="lg"
      aria-label="カラースキーム切替"
    >
      <IconSun
        display={computedColorScheme === 'light' ? 'block' : 'none'}
        suppressHydrationWarning
      />
      <IconMoon
        display={computedColorScheme === 'dark' ? 'block' : 'none'}
        suppressHydrationWarning
      />
    </ActionIcon>
  );
}
