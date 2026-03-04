import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

const PROTECTED_PATHS = ['/protected'];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      // 最小限のスコープ: 一意識別情報（sub）とメールアドレスのみ
      authorization: {
        params: {
          scope: 'openid email',
        },
      },
    }),
    GitHub({
      // 最小限のスコープ: メールアドレスのみ
      authorization: {
        params: {
          scope: 'user:email',
        },
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    authorized({ auth: session, request: { nextUrl } }) {
      // /protected 配下は認証必須
      const needSignIn = PROTECTED_PATHS.some((path) => nextUrl.pathname.startsWith(path));
      if (needSignIn && !session) {
        return false;
      }
      return true;
    },
    jwt({ token }) {
      return token;
    },
    session({ session }) {
      return session;
    },
  },
});
