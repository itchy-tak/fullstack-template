import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const headingVariants = cva('font-bold tracking-tight text-foreground', {
  variants: {
    as: {
      h1: 'text-4xl',
      h2: 'text-2xl',
      h3: 'text-xl',
      h4: 'text-lg',
    },
  },
  defaultVariants: {
    as: 'h2',
  },
});

type HeadingLevel = NonNullable<VariantProps<typeof headingVariants>['as']>;

type HeadingProps = React.ComponentProps<'h1'> &
  VariantProps<typeof headingVariants> & {
    as?: HeadingLevel;
  };

function Heading({ as = 'h2', className, ...props }: HeadingProps): React.ReactNode {
  const Comp = as;
  return <Comp data-slot="heading" className={cn(headingVariants({ as, className }))} {...props} />;
}

export { Heading, headingVariants };
export type { HeadingLevel, HeadingProps };
