'use client';

import { usePathname, useRouter } from 'next/navigation';
import { languages } from '@/lib/i18n/settings';
import { cn } from '@/lib/shadcn/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  SidebarMenuSubButton,
} from '../ui';
import { useTranslation } from '@/lib/i18n/client';

export function SubLanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const lng = pathname.split('/')[1] || 'en';

  const { t } = useTranslation(lng, 'header');

  const handleLanguageChange = (newLng: string) => {
    const segments = pathname.split('/');
    segments[1] = newLng;
    const newPath = segments.join('/');

    const hash = typeof window !== 'undefined' ? window.location.hash : '';

    router.push(newPath + hash);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuSubButton>
          <span>{t('selectLanguage')}</span>
        </SidebarMenuSubButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" className="w-[--radix-popper-anchor-width]">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language}
            onClick={() => handleLanguageChange(language)}
            className={cn(lng === language && 'bg-accent/50')}
          >
            <span>{language.toUpperCase()}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
