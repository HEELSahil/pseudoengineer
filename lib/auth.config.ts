import { PrismaAdapter } from '@auth/prisma-adapter';
import type { User as PrismaUser } from '@prisma/client';
import { AuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { JWT } from 'next-auth/jwt';
import { prisma } from '@/lib/prisma';
import { normalizeEmail } from '@/lib/validators';

interface ExtendedJWT extends JWT {
  exp?: number;
  id?: string;
  absoluteExpiry?: number;
}

/**
 * Wraps PrismaAdapter so the email is normalized (trimmed + lowercased) on the
 * adapter's own write/read paths too — i.e. the user row that OAuth sign-in
 * creates on first login, and the email-based account lookup. This is the one
 * email path that lives in next-auth's code rather than ours, so without this
 * an OAuth provider returning mixed-case email (e.g. GitHub) would still store
 * an un-normalized row.
 */
function normalizedPrismaAdapter(): Adapter {
  const adapter = PrismaAdapter(prisma);
  return {
    ...adapter,
    createUser: (data) =>
      adapter.createUser!({ ...data, email: normalizeEmail(data.email) }),
    updateUser: (data) =>
      adapter.updateUser!({
        ...data,
        email: data.email ? normalizeEmail(data.email) : data.email,
      }),
    getUserByEmail: (email) => adapter.getUserByEmail!(normalizeEmail(email)),
  };
}

export const authOptions: AuthOptions = {
  adapter: normalizedPrismaAdapter(),
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
          where: { email: normalizeEmail(credentials.email) },
        });

        if (!user || !user.password) return null;

        if (!user.emailVerified) {
          // Surfaced to the client as res.error === 'EmailNotVerified'
          // (next-auth maps a thrown error's message to the error code).
          throw new Error('EmailNotVerified');
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
    maxAge: 259200,
  },
  callbacks: {
    // No signIn callback by design: credentials email-verification is enforced
    // in authorize() (throws 'EmailNotVerified'), and OAuth email verification
    // is handled in events.signIn. Re-adding one here would just re-introduce a
    // redundant per-login DB query.
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
        token.absoluteExpiry = now + 259200;
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
    async signIn({ user, account }) {
      const typedUser = user as PrismaUser;
      if (
        account?.provider !== 'credentials' &&
        typedUser.email &&
        !typedUser.emailVerified
      ) {
        await prisma.user.update({
          where: { email: normalizeEmail(typedUser.email) },
          data: { emailVerified: new Date() },
        });
      }

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
