import { z } from 'zod';
import {
  PROJECT_STATUSES,
  PROJECT_TYPES,
  ProjectStatus,
  ProjectType,
} from '@/types-portfolio/project';

//// GENERAL
const isValidDate = (dateString: string): boolean => {
  if (!dateString) return false;
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && /^\d{4}-\d{2}-\d{2}$/.test(dateString);
};

const isAfter = (laterDate: string, earlierDate: string): boolean => {
  return new Date(laterDate) > new Date(earlierDate);
};

const projectFormBaseSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters')
    .trim(),
  type: z.enum(PROJECT_TYPES, {
    required_error: 'Project type is required',
    invalid_type_error: 'Invalid project type',
  }),
  status: z.enum(PROJECT_STATUSES, {
    required_error: 'Project status is required',
    invalid_type_error: 'Invalid project status',
  }),
  startDate: z
    .string()
    .optional()
    .transform((val) => (val === '' ? undefined : val))
    .pipe(z.string().refine(isValidDate, 'Invalid date format (YYYY-MM-DD)').optional()),
  endDate: z
    .string()
    .optional()
    .transform((val) => (val === '' ? undefined : val))
    .pipe(z.string().refine(isValidDate, 'Invalid date format (YYYY-MM-DD)').optional()),
  technologies: z
    .array(z.string().min(1, 'Technology name cannot be empty').trim())
    .optional()
    .default([])
    .transform((val) => val?.filter(Boolean) || []),
  links: z
    .object({
      github: z
        .string()
        .optional()
        .transform((val) => (val === '' ? undefined : val))
        .pipe(
          z
            .string()
            .url('Invalid GitHub URL')
            .refine((url) => url.includes('github.com'), 'Must be a GitHub URL')
            .optional(),
        ),

      website: z
        .string()
        .optional()
        .transform((val) => (val === '' ? undefined : val))
        .pipe(z.string().url('Invalid website URL').optional()),
    })
    .optional()
    .transform((val) => {
      if (!val?.github && !val?.website) return undefined;
      return val;
    }),

  files: z
    .array(z.custom<File>((val) => val instanceof File, { message: 'Invalid file' }))
    .default([])
    .refine((files) => files.length <= 10, 'Maximum 10 files allowed')
    .refine(
      (files) => files.every((file) => file.size <= 10 * 1024 * 1024), // 10MB
      'Files must be smaller than 10MB',
    )
    .refine(
      (files) =>
        files.every((file) =>
          ['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'text/plain'].includes(
            file.type,
          ),
        ),
      'Only JPEG, PNG, WebP, PDF, and TXT files are allowed',
    ),
});

export const projectFormSchema = projectFormBaseSchema.superRefine((data, ctx) => {
  if (data.startDate && data.endDate) {
    if (!isAfter(data.endDate, data.startDate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['endDate'],
        message: 'End date must be after start date',
      });
    }
  }

  if (data.status === 'completed') {
    if (!data.endDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['endDate'],
        message: 'End date is required for completed projects',
      });
    }

    if (!data.startDate && data.endDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['startDate'],
        message: 'Start date is required for completed projects',
      });
    }
  }
});

export type ProjectFormValues = {
  title: string;
  type: ProjectType;
  status: ProjectStatus;
  startDate?: string;
  endDate?: string;
  technologies?: string[];
  files?: File[];
  links?: {
    github?: string;
    website?: string;
  };
};

//// TRANSLATION
export const projectTranslationFormSchema = z.object({
  locale: z.string().nonempty('This field is required.'),
  summary: z.string().nonempty('This field is required.'),
  description: z.string().nonempty('This field is required.'),
});

export type ProjectTranslationFormValues = z.infer<typeof projectTranslationFormSchema>;
