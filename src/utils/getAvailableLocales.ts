import { AVAILABLE_LOCALES } from '@/constants/locales';

export const getAvailableLocales = <T extends { locale: string }>(translations: T[]) => {
  const usedLocales = translations?.map((t) => t.locale) || [];
  return AVAILABLE_LOCALES.filter((locale) => !usedLocales.includes(locale.code));
};
