'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput, Spinner } from '@/components/common';
import { Button, Form } from '@/components/ui';
import { loginFormSchema, type LoginFormValues } from '@/lib/validations';
import { loginAction } from '@/actions/auth';

export function LoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    setError(null);
    startTransition(async () => {
      try {
        await loginAction(values);

        router.replace('/en/admin');
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'An unexpected error occurred';

        setError(errorMessage);
        console.error('Submit error:', error);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          name="email"
          label={'Email'}
          placeholder="example@example.com"
          type="email"
          autoComplete="email"
        />

        <FormInput
          name="password"
          label={'Password'}
          type="password"
          placeholder="Enter your password"
        />

        {error && <p className="mt-1 text-sm text-destructive">{error}</p>}

        <Button type="submit" className="w-full" disabled={isPending}>
          <Spinner loading={isPending} text="Log in" loadingText="Logging in" />
        </Button>
      </form>
    </Form>
  );
}
