import { z } from 'zod';

//// GENERAL
export const aboutGeneralFormSchema = z.object({
  fullName: z.string().nonempty('This field is required.'),
  birthYear: z
    .string()
    .regex(/^\d{4}$/, 'Must be a valid 4-digit year')
    .refine((val) => {
      const year = parseInt(val);
      const currentYear = new Date().getFullYear();
      return year >= 1900 && year <= currentYear;
    }, 'Year must be between 1900 and current year')
    .optional()
    .or(z.literal('')),
  location: z.string().optional(),
  positioningTags: z.array(z.string()).optional(),
  image: z
    .custom<File>((val) => val instanceof File || val === undefined, {
      message: 'Invalid image file',
    })
    .optional(),
});

// Schema for server-side (without File, since FormData handles files differently)
export const aboutGeneralFormServerSchema = aboutGeneralFormSchema.omit({ image: true }).extend({
  image: z.any().optional(), // On the server, image comes as File from FormData.
});

//// TRANSLATION
export const aboutTranslationFormSchema = z.object({
  locale: z.string().nonempty('This field is required.'),
  title: z.string().nonempty('This field is required.'),
  bio: z.string().nonempty('This field is required.'),
  tagline: z.string().optional(),
  cv: z
    .custom<File>((val) => val instanceof File || val === undefined, {
      message: 'Invalid file',
    })
    .optional(),
});

export const aboutTranslationFormServerSchema = aboutTranslationFormSchema
  .omit({ cv: true })
  .extend({
    cv: z.any().optional(),
  });

export type AboutGeneralFormValues = z.infer<typeof aboutGeneralFormSchema>;
export type AboutGeneralFormServerValues = z.infer<typeof aboutGeneralFormServerSchema>;

export type AboutTranslationFormValues = z.infer<typeof aboutTranslationFormSchema>;
export type AboutTranslationFormServerValues = z.infer<typeof aboutTranslationFormServerSchema>;
