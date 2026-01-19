import { Language } from '@/types';
import { AVAILABLE_LANGUAGES } from '../common';

export const fallbackLng: Language = AVAILABLE_LANGUAGES[0];
export const languages: readonly Language[] = AVAILABLE_LANGUAGES;
export const defaultNS = 'common';
export const i18CookieName = 'i18next';

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: process.env.NODE_ENV === 'development',
    supportedLangs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
