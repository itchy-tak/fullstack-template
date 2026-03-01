import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  List (ul / ol)                                                     */
/* ------------------------------------------------------------------ */

const listVariants = cva('space-y-2 pl-4', {
  variants: {
    as: {
      ul: 'list-disc',
      ol: 'list-decimal',
    },
  },
  defaultVariants: {
    as: 'ul',
  },
});

type ListElement = NonNullable<VariantProps<typeof listVariants>['as']>;

type UnorderedListProps = React.ComponentProps<'ul'> & {
  as?: 'ul';
};

type OrderedListProps = React.ComponentProps<'ol'> & {
  as: 'ol';
};

type ListProps = (UnorderedListProps | OrderedListProps) & VariantProps<typeof listVariants>;

function List({ as = 'ul', className, ...props }: ListProps): React.ReactNode {
  if (as === 'ol') {
    return (
      <ol
        data-slot="list"
        className={cn(listVariants({ as, className }))}
        {...(props as React.ComponentProps<'ol'>)}
      />
    );
  }
  return (
    <ul
      data-slot="list"
      className={cn(listVariants({ as, className }))}
      {...(props as React.ComponentProps<'ul'>)}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  ListItem (li)                                                      */
/* ------------------------------------------------------------------ */

type ListItemProps = React.ComponentProps<'li'>;

function ListItem({ className, ...props }: ListItemProps): React.ReactNode {
  return <li data-slot="list-item" className={cn(className)} {...props} />;
}

export { List, ListItem, listVariants };
export type { ListElement, ListItemProps, ListProps };
