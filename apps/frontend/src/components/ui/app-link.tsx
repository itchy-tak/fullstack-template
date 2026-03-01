import { cva, type VariantProps } from 'class-variance-authority';
import NextLink from 'next/link';
import * as React from 'react';

import { cn } from '@/lib/utils';

const appLinkVariants = cva(
  'inline-flex items-center font-medium underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
  {
    variants: {
      variant: {
        default: 'text-primary hover:text-primary/80',
        muted: 'text-muted-foreground hover:text-foreground',
        accent: 'text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300',
      },
    },
    defaultVariants: {
      variant: 'accent',
    },
  },
);

type AppLinkProps = React.ComponentProps<typeof NextLink> & VariantProps<typeof appLinkVariants>;

function AppLink({ className, variant, ...props }: AppLinkProps): React.ReactNode {
  return (
    <NextLink
      data-slot="app-link"
      className={cn(appLinkVariants({ variant, className }))}
      {...props}
    />
  );
}

export { AppLink, appLinkVariants };
export type { AppLinkProps };
