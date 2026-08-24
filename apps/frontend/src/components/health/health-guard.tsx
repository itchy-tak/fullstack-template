'use client';

import { Alert, Center, Container, Stack } from '@mantine/core';
import { ReactNode } from 'react';

import { BackButton } from '@/components/BackButton';

import { useHealthStatus } from './health-check-provider';
import { HEALTH_STATUS_CONTENT } from './health-status-content';

export function HealthGuard({ children }: { children: ReactNode }): ReactNode {
  const status = useHealthStatus();

  if (status === 'healthy') {
    return <>{children}</>;
  }

  const content = HEALTH_STATUS_CONTENT[status];

  return (
    <Container size="sm">
      <Center>
        <Stack align="center" gap="md" py="xl">
          <Alert icon={content.icon(24)} color={content.color} title={content.title}>
            {content.message}
          </Alert>
          <BackButton />
        </Stack>
      </Center>
    </Container>
  );
}
