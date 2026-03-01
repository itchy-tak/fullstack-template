import { ReactNode } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { List, ListItem } from '@/components/ui/list';
import { Paragraph } from '@/components/ui/paragraph';
import { Separator } from '@/components/ui/separator';

export default function AboutPage(): ReactNode {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-10">
      <Heading as="h1" className="mb-6 text-3xl">
        About this Template
      </Heading>

      <Paragraph className="mb-6">
        このプロジェクトは、モダンなフルスタック開発のためのモノレポテンプレートです。
        以下の技術スタックで構成されています。
      </Paragraph>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>技術スタック</CardTitle>
        </CardHeader>
        <CardContent>
          <List>
            <ListItem>
              <span className="font-bold">Frontend:</span> Next.js 16 / React 19 / shadcn/ui
            </ListItem>
            <ListItem>
              <span className="font-bold">Monorepo:</span> Turborepo / pnpm workspaces
            </ListItem>
            <ListItem>
              <span className="font-bold">Linting:</span> ESLint 9 (flat config) / Prettier
            </ListItem>
            <ListItem>
              <span className="font-bold">Language:</span> TypeScript 5.9
            </ListItem>
          </List>
        </CardContent>
      </Card>

      <Separator className="my-6" />

      <Card>
        <CardHeader>
          <CardTitle>プロジェクト構成</CardTitle>
        </CardHeader>
        <CardContent>
          <List>
            <ListItem>
              <span className="font-bold">apps/frontend</span> — Next.js アプリケーション
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </div>
  );
}
