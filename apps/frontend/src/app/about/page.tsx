import { Card, Container, Divider, List, ListItem, Text, Title } from '@mantine/core';
import { ReactNode } from 'react';

export default function AboutPage(): ReactNode {
  return (
    <Container size="sm" py="xl">
      <Title order={1} mb="lg">
        About this Template
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
            <strong>Frontend:</strong> Next.js 16 / React 19 / Mantine v7
          </ListItem>
          <ListItem>
            <strong>Backend:</strong> NestJS 11 / Prisma 6
          </ListItem>
          <ListItem>
            <strong>Monorepo:</strong> Turborepo / pnpm workspaces
          </ListItem>
          <ListItem>
            <strong>Linting:</strong> ESLint 9 (flat config) / Prettier
          </ListItem>
          <ListItem>
            <strong>Language:</strong> TypeScript 5.9
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
