import { z } from 'zod';
import { EXPERIENCE_TYPE_ENUM } from '@/types-portfolio/experience';
import { isAfter, isValid, parse } from 'date-fns';

const parseDate = (value?: string) => {
  if (!value) return null;
  const parsed = parse(value, 'yyyy-MM-dd', new Date());
  return isValid(parsed) ? parsed : null;
};

const dateString = z.string().refine((val) => !!parseDate(val), {
  message: 'Invalid date format (yyyy-MM-dd)',
});

export const generalExperienceFormSchema = z
  .object({
    companyName: z.string().min(1, 'Company name is required'),
    type: z.enum(EXPERIENCE_TYPE_ENUM, {
      required_error: 'Experience type is required',
      invalid_type_error: 'Invalid experience type',
    }),
    location: z.string().optional(),
    startDate: dateString,
    endDate: z.string().optional(),
    technologies: z.array(z.string()).optional(),
    ongoing: z.boolean(),
    logo: z.instanceof(File).optional(),
  })
  .superRefine((data, ctx) => {
    const { startDate, endDate, ongoing } = data;

    const start = parseDate(startDate);
    const end = parseDate(endDate);

    if (!start) return;

    if (ongoing && endDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['endDate'],
        message: 'End date must be empty if ongoing is checked',
      });
      return;
    }

    if (!ongoing && !endDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['endDate'],
        message: 'End date is required unless ongoing',
      });
      return;
    }

    if (!ongoing && end && !isAfter(end, start)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['endDate'],
        message: 'End date must be after start date',
      });
    }
  });

export type GeneralExperienceFormValues = z.infer<typeof generalExperienceFormSchema>;
