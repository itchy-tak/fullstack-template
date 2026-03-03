import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { ColorSchemeScript } from '@mantine/core';
import { ReactNode } from 'react';

import { MantineClientProvider } from '@/components/MantineClientProvider';

export default function RootLayout(props: { children: ReactNode }): ReactNode {
  const { children } = props;
  return (
    <html lang="ja">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineClientProvider>{children}</MantineClientProvider>
      </body>
    </html>
  );
}
