import { serverTranslation } from '@/lib/i18n/server';

export default async function HomePage({ params }: PageProps<'/[lng]/admin'>) {
  const { lng } = await params;
  const { t } = await serverTranslation(lng, 'common');

  return (
    <div className="flex h-screen items-center justify-center">
      <h1>{t('welcome')}</h1>
    </div>
  );
}
