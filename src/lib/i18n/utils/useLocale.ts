'use client';

import { usePathname } from 'next/navigation';
import { AVAILABLE_LANGUAGES, DEFAULT_LOCALE, Language } from '../locales';

export function useLocale(): Language {
  const pathname = usePathname();

  const segment = pathname?.split('/')[1];

  if (AVAILABLE_LANGUAGES.includes(segment as Language)) {
    return segment as Language;
  }

  return DEFAULT_LOCALE;
}
