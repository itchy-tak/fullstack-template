'use client';

import { Group, Tooltip } from '@mantine/core';
import Link from 'next/link';
import { ComponentProps, ReactNode } from 'react';

import { useHealthStatus } from './health-check-provider';
import { HEALTH_STATUS_CONTENT } from './health-status-content';

type Props = ComponentProps<typeof Link>;

export function GatedLink({ onNavigate, children, ...props }: Props): ReactNode {
  const status = useHealthStatus();

  if (status === 'healthy') {
    return (
      <Link {...props} onNavigate={onNavigate}>
        {children}
      </Link>
    );
  }

  const content = HEALTH_STATUS_CONTENT[status];

  return (
    <Tooltip label={content.message}>
      <Link
        {...props}
        aria-disabled
        onNavigate={(event) => {
          onNavigate?.(event);
          event.preventDefault();
        }}
      >
        <Group component="span" gap={4} wrap="nowrap" style={{ display: 'inline-flex' }}>
          {children}
          {content.icon(14)}
        </Group>
      </Link>
    </Tooltip>
  );
}
