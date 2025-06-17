import { useMemo, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

export const createLoginSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .min(1, t('login.validation.emailRequired'))
      .email(t('login.validation.emailInvalid')),
    password: z
      .string()
      .min(1, t('login.validation.passwordRequired'))
      .min(8, t('login.validation.passwordMinLength')),
  });

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;

export function useLogin(t: (key: string) => string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const loginSchema = useMemo(() => createLoginSchema(t), [t]);

  const login = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError(t('login.errors.invalidCredentials'));
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch (error) {
      setError(t('login.errors.loginError'));
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error, loginSchema };
}
