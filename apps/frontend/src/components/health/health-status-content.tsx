import { Loader } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import { ReactNode } from 'react';

import { HealthStatus } from './health-check-provider';

export type NonHealthyStatus = Exclude<HealthStatus, 'healthy'>;

type HealthStatusContent = {
  title: string;
  message: string;
  color: string;
  icon: (size: number) => ReactNode;
};

export const HEALTH_STATUS_CONTENT: Record<NonHealthyStatus, HealthStatusContent> = {
  checking: {
    title: 'サーバー起動中',
    message: 'サーバーを起動中です。起動には数分かかることがあります。',
    color: 'blue',
    icon: (size) => <Loader size={size} />,
  },
  unhealthy: {
    title: '接続エラー',
    message: 'サーバーへの接続に失敗しました。しばらくしてから再度お試しください。',
    color: 'red',
    icon: (size) => <IconAlertTriangle size={size} />,
  },
};
