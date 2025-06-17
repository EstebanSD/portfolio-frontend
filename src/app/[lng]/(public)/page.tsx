import LanguageSwitcher from '@/components/LanguageSwitcher';
import { serverTranslation } from '@/lib/i18n';

type Props = {
  params: Promise<{ lng: string }>;
};
export default async function HomePage({ params }: Props) {
  const { lng } = await params;
  const { t } = await serverTranslation(lng, 'common');

  return (
    <main>
      <LanguageSwitcher lng={lng} />
      <h1>{t('welcome')}</h1>
    </main>
  );
}
