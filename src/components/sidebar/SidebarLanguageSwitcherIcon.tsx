'use client';

import { usePathname } from 'next/navigation';

export function SidebarLanguageSwitcherIcon() {
  const pathname = usePathname();
  const lng = pathname.split('/')[1] || 'en';

  return (
    <div className="flex items-center justify-center">
      <span className="text-xs font-semibold uppercase">{lng}</span>
    </div>
  );
}
