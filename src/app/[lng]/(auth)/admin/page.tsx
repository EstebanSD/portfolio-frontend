import { serverTranslation } from '@/lib/i18n/server';

type Props = {
  params: Promise<{ lng: string }>;
};

export default async function HomePage({ params }: Props) {
  const { lng } = await params;
  const { t } = await serverTranslation(lng, 'common');

  return (
    <div className="flex h-screen items-center justify-center">
      <h1>{t('welcome')}</h1>
    </div>
  );
}
