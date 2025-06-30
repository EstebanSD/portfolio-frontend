import Link from 'next/link';
import Image from 'next/image';
import { serverTranslation } from '@/lib/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ModeToggle } from './ModeToggle';
import { DownloadCv } from './DownloadCv';
import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui';
import { MenuIcon } from 'lucide-react';

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
          {/* Logo */}
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

          {/* Desktop Navigation */}
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

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-4">
            <DownloadCv lng={lng} label={t('downloadCv')} />
            <LanguageSwitcher />
            <ModeToggle />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <ModeToggle />

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  aria-label="Open navigation menu"
                >
                  <MenuIcon className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle className="text-left">{t('navigation')}</SheetTitle>
                  <SheetDescription className="text-left text-sm text-muted-foreground">
                    {t('navDescription')}
                  </SheetDescription>
                </SheetHeader>

                <nav className="flex flex-col space-y-4 mt-8">
                  {sections.map((section) => (
                    <SheetClose asChild key={section.key}>
                      <Link
                        href={`/${lng}#${section.key}`}
                        className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2 px-4 rounded-md hover:bg-muted block"
                      >
                        {section.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                <DownloadCv className="mt-12 mx-4" lng={lng} label={t('downloadCv')} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
