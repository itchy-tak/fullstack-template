import { ReactNode } from 'react';

import { HealthGuard } from '@/components/health/health-guard';

export default function ApiProtectedLayout({ children }: { children: ReactNode }): ReactNode {
  return <HealthGuard>{children}</HealthGuard>;
}
