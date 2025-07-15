'use client';

import NotFound from '@/components/not-found/NotFound';
import { usePathname } from 'next/navigation';

export default function Page() {
  const pathname = usePathname();

  const locale = pathname.startsWith('/es') ? 'es' : 'en';

  return <NotFound lng={locale} />;
}
