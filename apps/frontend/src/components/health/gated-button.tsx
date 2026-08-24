'use client';

import { Button, ButtonProps, Group, Tooltip } from '@mantine/core';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

import { useHealthStatus } from './health-check-provider';
import { HEALTH_STATUS_CONTENT } from './health-status-content';

type Props = ButtonProps & ComponentPropsWithoutRef<'button'>;

export function GatedButton(props: Props): ReactNode {
  const status = useHealthStatus();

  if (status === 'healthy') {
    return <Button {...props} />;
  }

  const content = HEALTH_STATUS_CONTENT[status];

  return (
    <Tooltip label={content.message}>
      <Group gap={4} wrap="nowrap" style={{ display: 'inline-flex' }}>
        <Button {...props} disabled />
        {content.icon(16)}
      </Group>
    </Tooltip>
  );
}
