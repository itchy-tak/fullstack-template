import { Box, Container, Heading, List, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

export default function AboutPage(): ReactNode {
  return (
    <Container maxW="800px" py={10}>
      <Heading as="h1" size="2xl" mb={6}>
        About this Template
      </Heading>

      <Text mb={4}>
        このプロジェクトは、モダンなフルスタック開発のためのモノレポテンプレートです。
        以下の技術スタックで構成されています。
      </Text>

      <Box mb={6}>
        <Heading as="h2" size="lg" mb={3}>
          技術スタック
        </Heading>
        <List.Root gap={2} pl={4}>
          <List.Item>
            <Text as="span" fontWeight="bold">
              Frontend:
            </Text>{' '}
            Next.js 16 / React 19 / Chakra UI
          </List.Item>
          <List.Item>
            <Text as="span" fontWeight="bold">
              Backend:
            </Text>{' '}
            NestJS 11 / Prisma 6
          </List.Item>
          <List.Item>
            <Text as="span" fontWeight="bold">
              Monorepo:
            </Text>{' '}
            Turborepo / pnpm workspaces
          </List.Item>
          <List.Item>
            <Text as="span" fontWeight="bold">
              Linting:
            </Text>{' '}
            ESLint 9 (flat config) / Prettier
          </List.Item>
          <List.Item>
            <Text as="span" fontWeight="bold">
              Language:
            </Text>{' '}
            TypeScript 5.9
          </List.Item>
        </List.Root>
      </Box>

      <Box mb={6}>
        <Heading as="h2" size="lg" mb={3}>
          プロジェクト構成
        </Heading>
        <List.Root gap={2} pl={4}>
          <List.Item>
            <Text as="span" fontWeight="bold">
              apps/frontend
            </Text>{' '}
            — Next.js アプリケーション
          </List.Item>
          <List.Item>
            <Text as="span" fontWeight="bold">
              apps/backend
            </Text>{' '}
            — NestJS API サーバー
          </List.Item>
          <List.Item>
            <Text as="span" fontWeight="bold">
              packages/api-types
            </Text>{' '}
            — 共有型定義
          </List.Item>
        </List.Root>
      </Box>
    </Container>
  );
}
