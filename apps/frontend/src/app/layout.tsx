import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

import { GlobalHeader } from '@/components/GlobalHeader';

export default function RootLayout(props: { children: ReactNode }): ReactNode {
  const { children } = props;
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <SessionProvider>
          <MantineProvider>
            <Notifications position="bottom-right" />
            <GlobalHeader />
            <main>{children}</main>
          </MantineProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
