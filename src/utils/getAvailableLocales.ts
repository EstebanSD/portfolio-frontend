import { AboutTranslation } from '@/types';
import { AVAILABLE_LOCALES } from '@/lib/common';

export const getAvailableLocales = (translations: AboutTranslation[]) => {
  const usedLocales = translations?.map((t) => t.locale) || [];
  return AVAILABLE_LOCALES.filter((locale) => !usedLocales.includes(locale.code));
};
