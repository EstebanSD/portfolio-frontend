import { z } from 'zod';

export const translationFormSchema = z.object({
  locale: z.string().min(1, 'This field is required.'),
  position: z.string().min(1, 'This field is required.'),
  description: z.string().optional(),
});

export type TranslationFormValues = z.infer<typeof translationFormSchema>;
