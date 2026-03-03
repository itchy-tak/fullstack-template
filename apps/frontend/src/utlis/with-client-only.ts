import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

/**
 * クライアント側だけでレンダリングするコンポーネントでハイドレーション問題を回避
 */
export function withClientOnly<P extends object>(Component: ComponentType<P>) {
  return dynamic(() => Promise.resolve(Component), { ssr: false });
}
