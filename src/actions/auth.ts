'use server';

import { ZodError } from 'zod';
import { AuthError } from 'next-auth';
import { auth, signIn, signOut } from '@/auth';
import { LoginFormValues } from '@/lib/validations/auth';
import { publicEnv } from '@/config/env.public';

const API_URL = publicEnv.NEXT_PUBLIC_API_URL;

export async function loginAction(data: LoginFormValues) {
  try {
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        throw new Error('Invalid credentials');
      }

      throw new Error('Authentication failed');
    }

    if (error instanceof ZodError) {
      const message = error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
      throw new Error(`Validation errors: ${message}`);
    }

    console.error('Unexpected login error:', error);
    throw new Error('Unexpected error during login.');
  }
}

export async function logoutAction() {
  const session = await auth();

  try {
    if (session?.accessToken) {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
    }
  } catch (error) {
    console.error('Error invalidating backend session:', error);
  }

  // Close Session in NextAuth
  await signOut({ redirectTo: '/' });
}
