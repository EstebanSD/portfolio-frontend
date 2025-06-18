'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormData, useLogin } from '@/hooks/use-login';
import { useTranslation } from '@/lib/i18n/client';
import { Loader2 } from 'lucide-react';
import { Form, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui';
import { FormInput } from '../common';

interface LoginFormProps {
  lng: string;
}

export function LoginForm({ lng }: LoginFormProps) {
  const { t } = useTranslation(lng, 'auth');
  const { login, isLoading, error, loginSchema } = useLogin(t);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">{t('login.page.title')}</CardTitle>
        <CardDescription className="text-center">{t('login.page.description')}</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              control={form.control}
              name="email"
              label={t('login.page.emailLabel')}
              placeholder="example@example.com"
              type="email"
              autoComplete="email"
            />

            <FormInput
              control={form.control}
              name="password"
              label={t('login.page.passwordLabel')}
              placeholder="••••••••"
              type="password"
            />

            {error && <p className="mt-1 text-sm text-destructive">{error}</p>}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

              {isLoading ? t('login.page.loggingButton') : t('login.page.loginButton')}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
