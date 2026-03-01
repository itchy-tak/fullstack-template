import './globals.css';

import { ReactNode } from 'react';
import { Toaster } from 'sonner';

import { ModeToggle } from '@/components/ui/mode-toggle';
import { Provider } from '@/components/ui/provider';

export default function RootLayout(props: { children: ReactNode }): ReactNode {
  const { children } = props;
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Provider>
          <div className="fixed top-4 right-4 z-50">
            <ModeToggle />
          </div>
          {children}
          <Toaster richColors position="bottom-right" />
        </Provider>
      </body>
    </html>
  );
}
