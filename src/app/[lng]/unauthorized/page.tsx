import { ShieldIcon, HomeIcon, ArrowLeftIcon } from 'lucide-react';
import { Alert, AlertDescription, Button } from '@/components/ui';
import { serverTranslation } from '@/lib/i18n/server';
import { ButtonBack } from '@/components/common';
import Link from 'next/link';

export default async function Page({ params }: PageProps<'/[lng]/unauthorized'>) {
  const { lng } = await params;
  const { t } = await serverTranslation(lng, 'unauthorized');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header with icon */}
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full mb-6">
            <ShieldIcon className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('title')}</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">{t('subtitle')}</p>
        </div>

        {/* Alert with info */}
        <Alert className="border-red-200 dark:border-red-800">
          <ShieldIcon className="h-4 w-4 text-red-600 dark:text-red-400" />
          <AlertDescription className="text-red-700 dark:text-red-300">
            {t('description')}
          </AlertDescription>
        </Alert>

        {/* Additional Info */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            {t('additionalInfo.title')}
          </h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              {t('additionalInfo.item1')}
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              {t('additionalInfo.item2')}
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <ButtonBack fallbackHref="/" size={'lg'} className="w-full bg-blue-600 hover:bg-blue-700">
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            {t('buttonBack')}
          </ButtonBack>

          <Button size={'lg'} className="w-full bg-gray-600 hover:bg-gray-700">
            <Link href="/">
              <HomeIcon className="w-5 h-5 mr-2" />
              {t('buttonHome')}
            </Link>
          </Button>
        </div>

        {/* TODO Contactar Soporte? (GitLens) */}
      </div>
    </div>
  );
}
