import { Badge, Card, Container, Divider, List, ListItem, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function Home(): ReactNode {
  return (
    <Container size="sm">
      <Title order={1} ta="center" mb="md">
        Fullstack Template
      </Title>
      <Text c="dimmed" ta="center" size="lg" mb="xl">
        Next.js + NestJS + Prisma モノレポテンプレート
      </Text>

      <Card withBorder mb="lg">
        <Title order={2} size="h4" mb={4}>
          ページ
        </Title>
        <Text size="sm" c="dimmed" mb="sm">
          各ページへのリンク
        </Text>
        <List>
          <ListItem>
            <Link href="/authors">/authors</Link> — 著者 CRUD（一覧・作成・更新・削除・ID 検索）
          </ListItem>
          <ListItem>
            <Link href="/posts">/posts</Link> — 投稿 CRUD（一覧・作成・更新・削除・ID 検索）
          </ListItem>
          <ListItem>
            <Link href="/about">/about</Link> — テンプレート情報（SSG：静的生成ページ）
          </ListItem>
          <ListItem>
            <Link href="/protected">/protected</Link> — 認証必須ページ（テンプレート）
          </ListItem>
        </List>
      </Card>

      <Divider my="md" />

      <Card withBorder>
        <Title order={2} size="h4" mb="sm">
          API Routes
        </Title>
        <List>
          <ListItem>
            <Badge variant="outline">/api/template</Badge> — Route Handler テンプレート
          </ListItem>
        </List>
      </Card>
    </Container>
  );
}
