'use client';

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
} from '../../ui';
import { useLanguageSwitcher } from './useLanguageSwitcher';

export function SubMenuButtonLanguageSwitcher() {
  const { lng, changeLanguage, isPending } = useLanguageSwitcher();
  const { t } = useTranslation(lng, 'header');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuSubButton>
          <GlobeIcon
            className={cn('h-4 w-4 mr-2 text-gray-500', isPending && 'animate-spin')}
            style={{ color: '#bcbcbc' }}
          />
          <span>{isPending ? '...' : t('selectLanguage')}</span>
          <span className="ml-auto text-xs text-muted-foreground uppercase">{lng}</span>
        </SidebarMenuSubButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" className="w-[--radix-popper-anchor-width]" align="start">
        <DropdownMenuLabel>{t('selectLanguage')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {languages.map((language) => (
          <DropdownMenuItem
            key={language}
            onClick={() => changeLanguage(language)}
            className={cn(lng === language && 'bg-accent/50', 'cursor-pointer mt-0.5')}
            disabled={isPending}
          >
            <span className="uppercase font-medium">{language}</span>
            {lng === language && <CheckIcon className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
