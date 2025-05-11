import { PrismaAdapter } from '@auth/prisma-adapter';
import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { JWT } from 'next-auth/jwt';
import { prisma } from '@/lib/prisma';

interface ExtendedJWT extends JWT {
  exp?: number;
  id?: string;
  absoluteExpiry?: number;
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) return null;

        if (!user.emailVerified) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );
        return isValid ? user : null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60,
  },
  callbacks: {
    async signIn({ user }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: user.email! },
      });

      if (dbUser && !dbUser.emailVerified) {
        // 👇 Redirect to sign-in page with a custom error
        const url = new URL('/sign-in', process.env.NEXTAUTH_URL);
        url.searchParams.set('error', 'EmailNotVerified');
        throw new Error(`NEXT_REDIRECT:${url.toString()}`);
      }

      return true;
    },
    async session({ session, token }) {
      const t = token as ExtendedJWT;

      if (t && session.user) {
        session.user.id = t.sub as string;

        session.expires = new Date(
          (t.absoluteExpiry ?? t.exp ?? Date.now() / 1000) * 1000,
        ).toISOString();
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        const now = Math.floor(Date.now() / 1000);
        token.absoluteExpiry = now + 60;
        if (process.env.NODE_ENV === 'development') {
          if (typeof token.absoluteExpiry === 'number') {
            console.log(
              'Token absolute expiry set to:',
              new Date(token.absoluteExpiry * 1000),
            );
          } else {
            console.log(
              'absoluteExpiry is not set or not a number:',
              token.absoluteExpiry,
            );
          }
        }
      }
      return token;
    },
  },
  events: {
    async signIn({ user }) {
      if (process.env.NODE_ENV === 'development') {
        console.log('User signed in:', user.email);
      }
    },
    async signOut() {
      if (process.env.NODE_ENV === 'development') {
        console.log('User signed out');
      }
    },
    async session() {
      if (process.env.NODE_ENV === 'development') {
        console.log('Session accessed');
      }
    },
  },
  pages: {
    signIn: '/sign-in',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};
