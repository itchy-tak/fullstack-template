'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { apiClient } from '@/lib/api-client.server';
import { withTimeout } from '@/lib/with-timeout';

export type HealthStatus = 'checking' | 'healthy' | 'unhealthy';

const POLL_INTERVAL_MS = 30_000;
// 5分経ってもhealthyにならなければポーリングを諦める
const POLL_TIMEOUT_MS = 5 * 60_000;
// レスポンスが返ってこないまま滞留するのを防ぐための1回あたりの上限
const CHECK_TIMEOUT_MS = 5_000;

const HealthStatusContext = createContext<HealthStatus | undefined>(undefined);

export function HealthCheckProvider({ children }: { children: ReactNode }): ReactNode {
  const [status, setStatus] = useState<HealthStatus>('checking');

  useEffect(() => {
    const poll = async (): Promise<void> => {
      try {
        await withTimeout(apiClient('AppController_getHealth'), CHECK_TIMEOUT_MS);
        setStatus('healthy');
        clearInterval(interval);
      } catch {
        setStatus('checking');
      }
    };

    let total = 0;

    const interval = setInterval(() => {
      total += POLL_INTERVAL_MS;
      if (total >= POLL_TIMEOUT_MS) {
        clearInterval(interval);
        setStatus('unhealthy');
        return;
      }
      void poll();
    }, POLL_INTERVAL_MS);

    void poll();

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <HealthStatusContext.Provider value={status}>{children}</HealthStatusContext.Provider>;
}

export function useHealthStatus(): HealthStatus {
  const status = useContext(HealthStatusContext);
  if (status === undefined) {
    throw new Error('useHealthStatus は HealthCheckProvider の内側でのみ使用できます');
  }
  return status;
}
