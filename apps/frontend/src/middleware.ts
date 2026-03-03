import { NextResponse } from 'next/server';

import { auth } from '@/auth';

// 認証が必須なルートのプレフィックス
const PROTECTED_ROUTES = ['/protected'];

/**
 * 指定したパスが認証必須ルートに該当するか判定する
 */
function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
}

export default auth((req) => {
  const { nextUrl } = req;
  const session = req.auth;

  if (isProtectedRoute(nextUrl.pathname) && !session) {
    const signInUrl = new URL('/api/auth/signin', nextUrl.origin);
    signInUrl.searchParams.set('callbackUrl', nextUrl.href);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Next.js 内部ルートと静的ファイルを除外
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
