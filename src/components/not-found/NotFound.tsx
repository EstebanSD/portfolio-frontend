'use client';

import { SearchIcon, HomeIcon, ArrowLeftIcon, FileQuestionIcon } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ButtonBack } from '@/components/common';
import { useTranslation } from '@/lib/i18n/client';
import { Button } from '../ui';
import Link from 'next/link';

export default function NotFound({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, 'not-found');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header with icon and 404 */}
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-orange-900/20 rounded-full mb-6">
            <FileQuestionIcon className="w-10 h-10 text-accent" />
          </div>
          <div className="text-6xl font-bold text-accent mb-2">404</div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{t('title')}</h1>
          <p className="text-muted-foreground text-lg">{t('subtitle')}</p>
        </div>

        {/* Alert info */}
        <Alert className="border-orange-200 dark:border-orange-800">
          <SearchIcon className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          <AlertDescription className="text-orange-700 dark:text-orange-300">
            {t('description')}
          </AlertDescription>
        </Alert>

        {/* Additional Info */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-foreground mb-3">
            {t('additionalInfo.title')}
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
              {t('additionalInfo.item1')}
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
              {t('additionalInfo.item2')}
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
              {t('additionalInfo.item3')}
            </li>
          </ul>
        </div>

        {/* TODO Páginas populares (GitLens) */}

        <div className="space-y-3">
          <ButtonBack fallbackHref="/" className="w-full" size={'lg'}>
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            {t('buttonBack')}
          </ButtonBack>

          <Button asChild className="w-full bg-gray-600 hover:bg-gray-700" size={'lg'}>
            <Link href="/">
              <HomeIcon className="w-5 h-5 mr-2" />
              {t('buttonHome')}
            </Link>
          </Button>
        </div>

        {/* TODO El enlace debería funcionar? (GitLens) */}
      </div>
    </div>
  );
}
