import GithubProvider from 'next-auth/providers/github';
import NextAuth from 'next-auth';
import { getRole } from '../../../lib/auth';

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization:
        'https://github.com/login/oauth/authorize?scope=read:user+read:org',
      // 'https://github.com/login/oauth/authorize?scope=read:user+repo+read:org',
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/login',
    signOut: '/api/auth/signout',
    error: '/login',
  },

  callbacks: {
    async signIn({ account, profile }) {
      const login = profile.login as string;
      const accessToken = account.access_token as string;
      const role = await getRole({
        login,
        accessToken,
      });
      return !!role;
    },
    async session({ session, token }) {
      const login = token.login as string;
      const accessToken = token.accessToken as string;
      const role = await getRole({
        login,
        accessToken,
      });
      session.login = login;
      session.role = role;

      console.log('Authenticated user:', { session, token });

      return session;
    },
    async jwt({ token, account, profile }) {
      const login = profile?.login || token.login;
      const accessToken = account?.access_token || token.accessToken;
      token.accessToken = accessToken;
      token.login = login;
      return token;
    },
  },
});
