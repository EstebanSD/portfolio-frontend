'use client';

import { useTransition } from 'react';
import { AVAILABLE_LANGUAGES, DEFAULT_LOCALE, Language } from '@/lib/i18n';
import { usePathname, useRouter } from 'next/navigation';
import { useSidebar } from '../../ui';

export function useLanguageSwitcher() {
  const router = useRouter();
  const { locale, replaceLocale } = useLocalePath();
  const { setOpenMobile, isMobile } = useSidebar();
  const [isPending, startTransition] = useTransition();

  const lng = locale();
  const changeLanguage = (newLng: Language) => {
    if (newLng === lng) return;

    startTransition(() => {
      const newPath = replaceLocale(newLng);
      const hash = window.location.hash ?? '';

      if (isMobile) {
        setOpenMobile(false);
        setTimeout(() => router.push(newPath + hash), 200);
      } else {
        router.push(newPath + hash);
      }
    });
  };

  return {
    lng,
    changeLanguage,
    isPending,
  };
}

function useLocalePath() {
  const pathname = usePathname();
  const segments = pathname.split('/');

  const locale = () => {
    const segmentLng = segments[1];

    if (AVAILABLE_LANGUAGES.includes(segmentLng as Language)) {
      return segmentLng as Language;
    }

    return DEFAULT_LOCALE;
  };

  const replaceLocale = (newLng: Language) => {
    const segments = pathname.split('/');
    segments[1] = newLng;
    return segments.join('/');
  };

  return { locale, replaceLocale };
}
