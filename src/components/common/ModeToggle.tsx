'use client';

import { usePathname } from 'next/navigation';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui';
import { useTranslation } from '@/lib/i18n/client';

export function ModeToggle() {
  const lng = usePathname().split('/')[1];
  const { t } = useTranslation(lng, 'header');

  const { setTheme } = useTheme();

  const THEME_VALUES = [
    { value: 'light', label: t('mode.light') },
    { value: 'dark', label: t('mode.dark') },
    { value: 'system', label: t('mode.system') },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background dark:bg-gray-800">
        {THEME_VALUES.map(({ value, label }, idx) => {
          return (
            <DropdownMenuItem key={idx} onClick={() => setTheme(value)}>
              {label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
