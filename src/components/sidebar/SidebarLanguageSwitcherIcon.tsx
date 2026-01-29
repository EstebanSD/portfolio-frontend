'use client';

import { useLocale } from '@/lib/i18n/utils';

export function SidebarLanguageSwitcherIcon() {
  const lng = useLocale();

  return (
    <div className="flex items-center justify-center">
      <span className="text-xs font-semibold uppercase">{lng}</span>
    </div>
  );
}
