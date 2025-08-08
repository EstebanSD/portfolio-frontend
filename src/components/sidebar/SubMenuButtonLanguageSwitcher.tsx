'use client';

import { useTransition } from 'react';
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
  useSidebar,
} from '../ui';

export function SubMenuButtonLanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const lng = pathname.split('/')[1] || 'en';
  const { t } = useTranslation(lng, 'header');
  const { setOpenMobile, isMobile } = useSidebar();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (newLng: string) => {
    if (newLng === lng) return;

    startTransition(() => {
      const segments = pathname.split('/');
      segments[1] = newLng;
      const newPath = segments.join('/');
      const hash = typeof window !== 'undefined' ? window.location.hash : '';

      // On mobile, close sidebar before browsing
      if (isMobile) {
        setOpenMobile(false);
        // Short delay for the animation to complete
        setTimeout(() => {
          router.push(newPath + hash);
        }, 200);
      } else {
        router.push(newPath + hash);
      }
    });
  };

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
            onClick={() => handleLanguageChange(language)}
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
