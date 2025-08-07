'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/lib/i18n/client';
import { MoonIcon, SunIcon } from 'lucide-react';
import { cn } from '@/lib/shadcn/utils';
import { SidebarMenuSubButton, Switch } from '../ui';

export function SubMenuButtonSwitchToggle() {
  const lng = usePathname().split('/')[1];
  const { t } = useTranslation(lng, 'header');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <SidebarMenuSubButton className="opacity-50">
        <div className="flex items-center space-x-2">
          <SunIcon className="h-4 w-4" />
          <Switch disabled checked={false} />
          <MoonIcon className="h-4 w-4" />
          <span className="text-sm">Loading...</span>
        </div>
      </SidebarMenuSubButton>
    );
  }

  const isDark = theme === 'dark';

  const handleThemeToggle = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <SidebarMenuSubButton asChild>
      <div className="flex items-center space-x-3 cursor-pointer">
        <SunIcon
          className={cn(
            'h-4 w-4 transition-all duration-300 shrink-0',
            isDark
              ? 'text-muted-foreground/60 scale-90 opacity-50'
              : 'text-amber-500 scale-100 opacity-100',
          )}
          style={{
            color: isDark ? '#bcbcbc' : '#f59e0b',
          }}
        />
        <Switch
          checked={isDark}
          onCheckedChange={handleThemeToggle}
          aria-label={t('mode.toggle')}
          className="cursor-pointer data-[state=checked]:bg-slate-800 data-[state=unchecked]:bg-yellow-100"
        />
        <MoonIcon
          className={cn(
            'h-4 w-4 transition-all duration-300 shrink-0',
            isDark
              ? 'text-blue-400 scale-100 opacity-100'
              : 'text-muted-foreground/60 scale-90 opacity-50',
          )}
          style={{
            color: isDark ? '#60a5fa' : '#bcbcbc',
          }}
        />
        <span>{isDark ? t('mode.dark') : t('mode.light')}</span>
      </div>
    </SidebarMenuSubButton>
  );
}
