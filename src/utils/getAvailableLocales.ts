import { AboutTranslation, AVAILABLE_LOCALES } from '@/types';

export const getAvailableLocales = (translations: AboutTranslation[]) => {
  const usedLocales = translations?.map((t) => t.locale) || [];
  return AVAILABLE_LOCALES.filter((locale) => !usedLocales.includes(locale.code));
};
