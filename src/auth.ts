import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { MINUTE } from './lib/common';
import { JWT } from 'next-auth/jwt';

export const config = {
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!response.ok) {
            return null;
          }

          const data = await response.json();

          return {
            id: data.user?.id || 'unknown',
            email: credentials.email as string,
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            role: data.user?.role || 'User',
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Initial login - newly authenticated user
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.role = user.role;
        token.accessTokenExpires = Date.now() + 15 * MINUTE;
        return token;
      }

      // Verify if we have the necessary information
      if (!token.accessToken || !token.refreshToken || !token.accessTokenExpires) {
        console.error('Incomplete token, re-authentication required');
        return { ...token, error: 'InvalidTokenError' };
      }

      // Buffer to renew prior to expiration
      const REFRESH_BUFFER = 2 * MINUTE;
      const timeUntilExpiry = token.accessTokenExpires - Date.now();

      // If the token is still valid, return it.
      if (timeUntilExpiry > REFRESH_BUFFER) {
        return token;
      }

      // Token expired, try to renew it
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.role = token.role;
      session.error = token.error;
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: token.refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const refreshedTokens = await response.json();
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      refreshToken: refreshedTokens.refresh_token,
      accessTokenExpires: Date.now() + 15 * MINUTE,
      error: undefined,
    };
  } catch (error) {
    console.error('Error renewing token:', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}
