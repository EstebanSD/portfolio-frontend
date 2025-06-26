import Link from 'next/link';
import Image from 'next/image';
import { serverTranslation } from '@/lib/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ModeToggle } from './ModeToggle';

export async function PublicHeader({ lng }: { lng: string }) {
  const { t } = await serverTranslation(lng, 'header');
  const sections: { key: string; label: string }[] = [
    { key: 'about', label: t('sections.about') },
    { key: 'projects', label: t('sections.projects') },
    { key: 'skills', label: t('sections.skills') },
    { key: 'experiences', label: t('sections.experiences') },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-background border-b border-gray-200 dark:border-gray-700">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href={`/${lng}`}
            aria-label="Go to homepage"
            className="inline-block transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            <Image
              src={'/images/esd_logo.webp'}
              priority
              width={64}
              height={64}
              alt="logo"
              className="dark:invert"
            />
          </Link>

          <nav className="hidden md:flex space-x-8">
            {sections.map((section) => (
              <Link
                key={section.key}
                href={`/${lng}#${section.key}`}
                className="text-foreground hover:text-primary transition-colors"
              >
                {section.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />

            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
