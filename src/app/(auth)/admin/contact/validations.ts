import { z } from 'zod';

const phoneRegex = /^\+[1-9]\d{1,14}$/; // E.164

const optionalUrl = z
  .string()
  .trim()
  .transform((val) => (val === '' ? undefined : val))
  .refine((val) => !val || z.string().url().safeParse(val).success, 'Invalid URL')
  .optional();

export const socialLinksSchema = z.object({
  github: optionalUrl,
  linkedin: optionalUrl,
  twitter: optionalUrl,
  instagram: optionalUrl,
  website: optionalUrl,
});

export const contactFormSchema = z.object({
  email: z.string().min(1, 'Email is required.').email('Invalid email'),
  phone: z
    .string()
    .trim()
    .transform((val) => (val === '' ? undefined : val))
    .refine((val) => !val || phoneRegex.test(val), 'Invalid phone number')
    .optional(),
  socialLinks: socialLinksSchema.optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
