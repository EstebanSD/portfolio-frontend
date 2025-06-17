'use client';

import { usePathname, useRouter } from 'next/navigation';
import { languages } from '@/lib/i18n/settings';

export default function LanguageSwitcher({ lng }: { lng: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (newLng: string) => {
    // Replace the current language in the URL
    const segments = pathname.split('/');
    segments[1] = newLng;
    const newPath = segments.join('/');

    // Set cookie to remember preference
    document.cookie = `i18next=${newLng}; path=/; max-age=31536000; SameSite=Lax`;

    router.push(newPath);
  };

  return (
    <div className="flex gap-2">
      {languages.map((language) => (
        <button
          key={language}
          onClick={() => handleLanguageChange(language)}
          className={`px-3 py-1 rounded ${
            lng === language
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {language.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
