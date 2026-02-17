import { AVAILABLE_LOCALES, type Language } from '@/lib/i18n';

export const getLocaleInfo = (code: Language) => AVAILABLE_LOCALES.find((l) => l.code === code);
