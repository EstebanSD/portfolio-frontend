import { Suspense } from 'react';
import { ProjectsSkeleton, PublicProjects } from '@/components/projects';
import { serverTranslation } from '@/lib/i18n';

type Props = {
  params: Promise<{ lng: string }>;
};

export default async function HomePage({ params }: Props) {
  const { lng } = await params;
  const { t } = await serverTranslation(lng, 'common');

  return (
    <div className="px-4 py-8 md:px-10 md:py-12 lg:px-20 lg:py-16">
      <h1 className="text-center">{t('welcome')}</h1>

      <Suspense fallback={<ProjectsSkeleton />}>
        <PublicProjects lng={lng} />
      </Suspense>
    </div>
  );
}
