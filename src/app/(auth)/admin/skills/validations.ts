import { z } from 'zod';

export const categoryFormSchema = z.object({
  key: z.string().min(1, 'This field is required.'),
  order: z.coerce.number({
    required_error: 'Order is required',
    invalid_type_error: 'Order must be a number',
  }),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
