'use client';

import NotFound from '@/components/not-found/NotFound';
import { useLocale } from '@/lib/i18n/utils';

export default function Page() {
  const lng = useLocale();

  return <NotFound lng={lng} />;
}
