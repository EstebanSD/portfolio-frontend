import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().min(1, 'Email is required.').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required.')
    .min(8, { message: 'The password must be at least 8 characters long.' })
    .regex(/[A-Z]/, { message: 'It must contain at least one capital letter.' })
    .regex(/[0-9]/, { message: 'It must contain at least one number.' })
    .regex(/[^A-Za-z0-9]/, { message: 'Must contain at least one special character.' }),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
