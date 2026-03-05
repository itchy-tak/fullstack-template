import { Card, Container, Divider, List, ListItem, Text, Title } from '@mantine/core';
import { Metadata } from 'next';
import { ReactNode } from 'react';

import { BackButton } from '@/components/BackButton';

export const metadata: Metadata = { title: 'テンプレートについて' };

export default function AboutPage(): ReactNode {
  return (
    <Container size="sm" py="xl">
      <BackButton />
      <Title order={1} mb="lg">
        このプロジェクトについて
      </Title>

      <Text mb="lg">
        このプロジェクトは、モダンなフルスタック開発のためのモノレポテンプレートです。
        以下の技術スタックで構成されています。
      </Text>

      <Card withBorder mb="lg">
        <Title order={2} size="h4" mb="sm">
          技術スタック
        </Title>
        <List>
          <ListItem>
            <strong>フロントエンド:</strong> Next.js 16 / React 19 / Mantine v7
          </ListItem>
          <ListItem>
            <strong>バックエンド:</strong> NestJS 11 / Prisma 6
          </ListItem>
          <ListItem>
            <strong>モノレポ:</strong> Turborepo / pnpm workspaces
          </ListItem>
          <ListItem>
            <strong>リンティング:</strong> ESLint 9 (flat config) / Prettier
          </ListItem>
          <ListItem>
            <strong>言語:</strong> TypeScript 5.9
          </ListItem>
        </List>
      </Card>

      <Divider my="lg" />

      <Card withBorder>
        <Title order={2} size="h4" mb="sm">
          プロジェクト構成
        </Title>
        <List>
          <ListItem>
            <strong>apps/frontend</strong> — Next.js アプリケーション
          </ListItem>
          <ListItem>
            <strong>apps/backend</strong> — NestJS API サーバー
          </ListItem>
          <ListItem>
            <strong>packages/api-types</strong> — 共有型定義
          </ListItem>
        </List>
      </Card>
    </Container>
  );
}
