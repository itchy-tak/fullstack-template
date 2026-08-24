import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { ColorSchemeScript, createTheme, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

import { AppShellLayout } from '@/components/AppShell';
import { HealthCheckProvider } from '@/components/health/health-check-provider';

const theme = createTheme({
  white: '#fcfcfc',
});

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
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <SessionProvider>
          <MantineProvider defaultColorScheme="dark" theme={theme}>
            <Notifications position="bottom-right" />
            <HealthCheckProvider>
              <AppShellLayout>{children}</AppShellLayout>
            </HealthCheckProvider>
          </MantineProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
