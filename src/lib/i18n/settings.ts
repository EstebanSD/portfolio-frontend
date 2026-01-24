import { AVAILABLE_LANGUAGES, DEFAULT_LOCALE, Language } from './locales';

export const fallbackLng: Language = DEFAULT_LOCALE;
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
