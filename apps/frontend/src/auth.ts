import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

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
  ],
  callbacks: {
    jwt({ token }) {
      return token;
    },
    session({ session }) {
      return session;
    },
  },
});
