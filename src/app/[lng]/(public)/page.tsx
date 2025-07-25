import { Suspense } from 'react';
import Link from 'next/link';
import { ChevronsDownIcon } from 'lucide-react';

import { serverTranslation } from '@/lib/i18n';
import { PublicProjects, PublicProjectsSkeleton } from '@/components/projects';
import { PublicAbout, PublicAboutSkeleton } from '@/components/about';
import { PublicSkills, PublicSkillsSkeleton } from '@/components/skills';
import { PublicExperiences, PublicExperiencesSkeleton } from '@/components/experiences';

type Props = {
  params: Promise<{ lng: string }>;
};

export default async function HomePage({ params }: Props) {
  const { lng } = await params;
  const { t } = await serverTranslation(lng, 'hero');

  return (
    <div className="px-4 md:px-10 lg:px-20">
      <section className="min-h-screen rounded-sm flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-background">
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-7xl font-light text-foreground mb-6 text-shadow">
            {t('title1')} <span className="text-primary font-medium">Esteban</span>,<br />
            {t('title2')}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>

          <div className="flex justify-center mt-20 animate-bounce">
            <Link href="#about" scroll>
              <ChevronsDownIcon
                size={32}
                className="text-primary hover:scale-110 transition-transform cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </section>

      <Suspense fallback={<PublicAboutSkeleton lng={lng} />}>
        <PublicAbout lng={lng} />
      </Suspense>

      <Suspense fallback={<PublicProjectsSkeleton lng={lng} />}>
        <PublicProjects lng={lng} />
      </Suspense>

      <Suspense fallback={<PublicSkillsSkeleton lng={lng} />}>
        <PublicSkills lng={lng} />
      </Suspense>

      <Suspense fallback={<PublicExperiencesSkeleton lng={lng} />}>
        <PublicExperiences lng={lng} />
      </Suspense>
    </div>
  );
}
