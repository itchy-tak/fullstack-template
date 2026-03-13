import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

import { AppShellLayout } from '@/components/AppShell';

export const metadata: Metadata = {
  title: {
    template: '%s | Fullstack Template',
    default: 'Fullstack Template',
  },
};

export default function RootLayout(props: { children: ReactNode }): ReactNode {
  const { children } = props;
  return (
    <html lang="ja" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <SessionProvider>
          <MantineProvider>
            <Notifications position="bottom-right" />
            <AppShellLayout>{children}</AppShellLayout>
          </MantineProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
