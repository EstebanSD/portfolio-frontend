import { AVAILABLE_LANGUAGES } from '@/lib/common';

export interface Option {
  value: string;
  label: string;
}

export type Language = (typeof AVAILABLE_LANGUAGES)[number];
