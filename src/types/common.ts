import { AVAILABLE_LANGUAGES } from '@/constants/locales';

export interface Option {
  value: string;
  label: string;
}

export type Language = (typeof AVAILABLE_LANGUAGES)[number];
