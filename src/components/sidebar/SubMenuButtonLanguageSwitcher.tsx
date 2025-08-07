'use client';

import { usePathname, useRouter } from 'next/navigation';
import { CheckIcon, GlobeIcon } from 'lucide-react';
import { cn } from '@/lib/shadcn/utils';
import { languages } from '@/lib/i18n/settings';
import { useTranslation } from '@/lib/i18n/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarMenuSubButton,
} from '../ui';

export function SubMenuButtonLanguageSwitcher() {
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
          <GlobeIcon
            className="h-4 w-4 mr-2 text-gray-500"
            style={{
              color: '#bcbcbc',
            }}
          />
          <span>{t('selectLanguage')}</span>
          <span className="ml-auto text-xs text-muted-foreground uppercase">{lng}</span>
        </SidebarMenuSubButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" className="w-[--radix-popper-anchor-width]" align="start">
        <DropdownMenuLabel>{t('selectLanguage')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {languages.map((language) => (
          <DropdownMenuItem
            key={language}
            onClick={() => handleLanguageChange(language)}
            className={cn(lng === language && 'bg-accent/50', 'cursor-pointer mt-0.5')}
          >
            <span className="uppercase font-medium">{language}</span>
            {lng === language && <CheckIcon className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
