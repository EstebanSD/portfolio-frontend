'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/lib/i18n/client';
import { MoonIcon, SunIcon } from 'lucide-react';
import { Switch } from '../ui';

export function SwitchToggle() {
  const lng = usePathname().split('/')[1];
  const { t } = useTranslation(lng, 'header');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center space-x-2 opacity-50">
        <SunIcon className="h-4 w-4" />
        <Switch disabled />
        <MoonIcon className="h-4 w-4" />
      </div>
    );
  }

  const isDark = theme === 'dark';

  const handleThemeToggle = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <div className="flex items-center space-x-3 p-2 rounded-lg transition-colors hover:bg-accent/50">
      <SunIcon
        className={`h-4 w-4 transition-all duration-300 ${
          isDark ? 'text-muted-foreground scale-90' : 'text-yellow-500 scale-100'
        }`}
      />
      <Switch
        checked={isDark}
        onCheckedChange={handleThemeToggle}
        aria-label={t('mode.toggle')}
        className="cursor-pointer data-[state=checked]:bg-slate-800 data-[state=unchecked]:bg-yellow-100"
      />
      <MoonIcon
        className={`h-4 w-4 transition-all duration-300 ${
          isDark ? 'text-blue-400 scale-100' : 'text-muted-foreground scale-90'
        }`}
      />
      <span className="text-sm font-medium min-w-0">
        {isDark ? t('mode.dark') : t('mode.light')}
      </span>
    </div>
  );
}
