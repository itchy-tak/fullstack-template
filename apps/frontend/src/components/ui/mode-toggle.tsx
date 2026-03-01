'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useSyncExternalStore } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';

const emptySubscribe = (): (() => void) => () => {};

function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export function ModeToggle({
  className,
  ...props
}: Omit<React.ComponentProps<'div'>, 'children'>): React.ReactNode {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return <Skeleton className="h-5 w-16 rounded-full" />;
  }

  const isDark = resolvedTheme === 'dark';

  const handleToggle = (checked: boolean): void => {
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <div className={`flex items-center gap-2 ${className ?? ''}`} {...props}>
      <Sun className="size-4 text-muted-foreground" />
      <Switch checked={isDark} onCheckedChange={handleToggle} aria-label="Toggle theme" />
      <Moon className="size-4 text-muted-foreground" />
    </div>
  );
}
