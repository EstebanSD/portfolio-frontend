export const AVAILABLE_LANGUAGES = ['en', 'es'] as const;

export const AVAILABLE_LOCALES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  // { code: 'fr', name: 'French', flag: '🇫🇷' },
  // { code: 'de', name: 'German', flag: '🇩🇪' },
  // { code: 'it', name: 'Italian', flag: '🇮🇹' },
  // { code: 'pt', name: 'Portuguese', flag: '🇧🇷' },
] as const;

export type Language = (typeof AVAILABLE_LANGUAGES)[number];
export const DEFAULT_LOCALE: Language = 'en';

export type Locale = (typeof AVAILABLE_LOCALES)[number];
