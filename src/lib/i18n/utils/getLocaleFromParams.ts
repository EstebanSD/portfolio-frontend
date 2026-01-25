import { AVAILABLE_LANGUAGES, DEFAULT_LOCALE, Language } from '../locales';

export function getLocaleFromParams(params?: { lng?: string }): Language {
  const locale = params?.lng;
  return AVAILABLE_LANGUAGES.includes(locale as Language) ? (locale as Language) : DEFAULT_LOCALE;
}
