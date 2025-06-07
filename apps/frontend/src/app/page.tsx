import { Box, Container, Heading, Link, List, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

export default function Home(): ReactNode {
  return (
    <Container maxW="800px" py={10}>
      <Box textAlign="center" mb={10}>
        <Heading as="h1" size="3xl" mb={4}>
          Fullstack Template
        </Heading>
        <Text color="gray.500" fontSize="lg">
          Next.js + NestJS + Prisma モノレポテンプレート
        </Text>
      </Box>

      <Box mb={8}>
        <Heading as="h2" size="lg" mb={3}>
          ページ
        </Heading>
        <List.Root gap={2} pl={4}>
          <List.Item>
            <Link href="/users" color="blue.500" fontWeight="medium">
              /users
            </Link>{' '}
            — ユーザー CRUD（一覧・作成・更新・削除・ID 検索）
          </List.Item>
          <List.Item>
            <Link href="/posts" color="blue.500" fontWeight="medium">
              /posts
            </Link>{' '}
            — 投稿 CRUD（一覧・作成・更新・削除・ID 検索）
          </List.Item>
          <List.Item>
            <Link href="/about" color="blue.500" fontWeight="medium">
              /about
            </Link>{' '}
            — テンプレート情報（SSG：静的生成ページ）
          </List.Item>
        </List.Root>
      </Box>

      <Box mb={8}>
        <Heading as="h2" size="lg" mb={3}>
          API Routes
        </Heading>
        <Text color="gray.500" mb={2}>
          /api/:path* は rewrites でバックエンドへプロキシされます。 Route Handler
          があるパスはそちらが優先されます。
        </Text>
        <List.Root gap={2} pl={4}>
          <List.Item>
            <Text as="span" fontWeight="bold">
              /api/health
            </Text>{' '}
            — Route Handler テンプレート
          </List.Item>
        </List.Root>
      </Box>

      <Box>
        <Heading as="h2" size="lg" mb={3}>
          はじめに
        </Heading>
        <List.Root as="ol" gap={2} pl={4}>
          <List.Item>Backend の環境変数を設定し、DB をセットアップ</List.Item>
          <List.Item>
            <Text as="span" fontFamily="mono">
              pnpm dev
            </Text>{' '}
            で Frontend / Backend を同時起動
          </List.Item>
          <List.Item>
            Backend API（デフォルト{' '}
            <Text as="span" fontFamily="mono">
              http://localhost:5000
            </Text>
            ）で CRUD 操作
          </List.Item>
        </List.Root>
      </Box>
    </Container>
  );
}
