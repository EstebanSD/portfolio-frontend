'use server';

import { ZodError } from 'zod';
import { CredentialsSignin } from 'next-auth';
import { auth, signIn, signOut } from '@/auth';
import { LoginFormValues } from '@/lib/validations/auth';

export async function loginAction(data: LoginFormValues) {
  try {
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map((e) => `${e.path.join('.')}: ${e.message}`);
      throw new Error(`Validation errors: ${errorMessages.join(', ')}`);
    }
    if (error instanceof CredentialsSignin) {
      throw new Error('Invalid Credentials');
    }
    console.error('Error in login action:', error);
    throw new Error('An unexpected error occurred trying to login.');
  }
}

export async function logoutAction() {
  const session = await auth();

  try {
    if (session?.accessToken) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
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
