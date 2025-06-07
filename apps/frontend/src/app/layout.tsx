import { ReactNode } from 'react';

import { Provider } from '@/components/ui/provider';
import { Toaster } from '@/components/ui/toaster';

export default function RootLayout(props: { children: ReactNode }): ReactNode {
  const { children } = props;
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <Provider>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
