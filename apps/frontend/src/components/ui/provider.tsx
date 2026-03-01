'use client';

import type { ThemeProviderProps } from 'next-themes';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

import { TooltipProvider } from '@/components/ui/tooltip';

export function Provider({ children, ...props }: ThemeProviderProps): ReactNode {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  );
}
