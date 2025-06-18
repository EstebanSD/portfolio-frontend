'use client';

import { usePathname, useRouter } from 'next/navigation';
import { languages } from '@/lib/i18n/settings';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const lng = pathname.split('/')[1] || 'en';

  const handleLanguageChange = (newLng: string) => {
    const segments = pathname.split('/');
    segments[1] = newLng;
    const newPath = segments.join('/');

    router.push(newPath);
  };

  return (
    <Select onValueChange={handleLanguageChange} defaultValue={lng}>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder={lng} />
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-gray-800">
        <SelectGroup>
          {languages.map((language) => (
            <SelectItem key={language} value={language}>
              {language.toUpperCase()}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
