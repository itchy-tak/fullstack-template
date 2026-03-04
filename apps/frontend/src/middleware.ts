// 保護ルートの判定は auth.ts の authorized callback に集約
export { auth as middleware } from '@/auth';

export const config = {
  matcher: [
    // Next.js 内部ルートと静的ファイルを除外
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
