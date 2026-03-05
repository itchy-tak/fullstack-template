'use client';

import { Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { ReactNode } from 'react';

type Props = {
  href?: string;
};

// TODO: 画面遷移履歴を考慮して、常に前のページに戻れるようにする
// 例: useRouter().back()
// ただし、認証後のリダイレクトも考慮する
export function BackButton({ href = '/' }: Props): ReactNode {
  return (
    <Button
      component={Link}
      href={href}
      variant="subtle"
      leftSection={<IconArrowLeft size={16} />}
      size="sm"
      mb="md"
    >
      戻る
    </Button>
  );
}
