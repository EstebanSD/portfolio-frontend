import { AVAILABLE_LANGUAGES } from '@/constants';

export interface Option {
  value: string;
  label: string;
}

export type Language = (typeof AVAILABLE_LANGUAGES)[number];
