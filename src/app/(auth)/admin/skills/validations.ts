import { z } from 'zod';

export const categoryFormSchema = z.object({
  key: z.string().min(1, 'This field is required.'),
  order: z.coerce.number({
    required_error: 'Order is required',
    invalid_type_error: 'Order must be a number',
  }),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

const translationFormSchema = z.object({
  locale: z.string().min(1, 'This field is required.'),
  name: z.string().min(1, 'This field is required.'),
});

export const updateCategoryFormSchema = z.object({
  key: z.string().min(1, 'This field is required.'),
  order: z.coerce.number({
    required_error: 'Order is required',
    invalid_type_error: 'Order must be a number',
  }),
  translations: z.array(translationFormSchema),
});

export type TranslationFormValues = z.infer<typeof translationFormSchema>;
export type UpdateCategoryFormValues = z.infer<typeof updateCategoryFormSchema>;
export type UpdateCategoryCleanRequest = {
  order?: number;
  translations: {
    locale: string;
    name: string;
  }[];
};
