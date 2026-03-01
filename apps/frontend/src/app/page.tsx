import { ReactNode } from 'react';

import { AppLink } from '@/components/ui/app-link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { List, ListItem } from '@/components/ui/list';
import { Paragraph } from '@/components/ui/paragraph';
import { Separator } from '@/components/ui/separator';

export default function Home(): ReactNode {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-10">
      <div className="mb-10 text-center">
        <Heading as="h1" className="mb-4">
          Frontend Template
        </Heading>
        <Paragraph variant="muted" className="text-lg">
          Next.js
        </Paragraph>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>ページ</CardTitle>
          <CardDescription>各ページへのリンク</CardDescription>
        </CardHeader>
        <CardContent>
          <List>
            <ListItem>
              <AppLink href="/about">/about</AppLink> — テンプレート情報（SSG：静的生成ページ）
            </ListItem>
          </List>
        </CardContent>
      </Card>

      <Separator className="my-6" />

      <Card>
        <CardHeader>
          <CardTitle>API Routes</CardTitle>
        </CardHeader>
        <CardContent>
          <List>
            <ListItem>
              <Badge variant="outline">/api/template</Badge> — Route Handler テンプレート
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </div>
  );
}
