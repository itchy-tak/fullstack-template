import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const paragraphVariants = cva('', {
  variants: {
    variant: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      sm: 'text-sm text-muted-foreground',
      destructive: 'text-destructive',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type ParagraphProps = React.ComponentProps<'p'> & VariantProps<typeof paragraphVariants>;

function Paragraph({ className, variant, ...props }: ParagraphProps): React.ReactNode {
  return (
    <p data-slot="paragraph" className={cn(paragraphVariants({ variant, className }))} {...props} />
  );
}

export { Paragraph, paragraphVariants };
export type { ParagraphProps };
