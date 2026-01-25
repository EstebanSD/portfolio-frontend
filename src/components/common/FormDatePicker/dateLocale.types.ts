import { Locale } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import { Language } from '@/lib/i18n';

export const dateFnsLocales: Record<Language, Locale> = {
  en: enUS,
  es: es,
};
