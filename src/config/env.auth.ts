import { z } from 'zod';

const AuthEnvSchema = z.object({
  AUTH_SECRET: z.string().min(1),
  TOKEN_EXPIRES_IN: z.coerce.number().int().positive(),
});

export function getAuthEnv() {
  return AuthEnvSchema.parse({
    AUTH_SECRET: process.env.AUTH_SECRET,
    TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN,
  });
}
