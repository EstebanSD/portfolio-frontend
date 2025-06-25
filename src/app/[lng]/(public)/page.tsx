import { Suspense } from 'react';
import Link from 'next/link';
import { ChevronsDownIcon } from 'lucide-react';

import { serverTranslation } from '@/lib/i18n';
import { ButtonLink } from '@/components/common';
import { ProjectsSkeleton, PublicProjects } from '@/components/projects';
import { AboutSkeleton, PublicAbout } from '@/components/about';
import { PublicSkills, PublicSkillsSkeleton } from '@/components/skills';

type Props = {
  params: Promise<{ lng: string }>;
};

export default async function HomePage({ params }: Props) {
  const { lng } = await params;
  const { t } = await serverTranslation(lng, 'hero');

  return (
    <div className="px-4 py-8 md:px-10 md:py-12 lg:px-20 lg:py-16">
      <section className="min-h-screen rounded-sm flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-background">
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-7xl font-light text-foreground mb-6 text-shadow">
            {t('title1')} <span className="text-accent font-medium">Esteban</span>,<br />
            {t('title2')}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>

          <ButtonLink
            href="#projects"
            variant={'ghost'}
            className="mt-6 text-accent border-accent"
            scroll
          >
            {t('button')}
          </ButtonLink>

          <div className="flex justify-center mt-10 animate-bounce">
            <Link href="#about" scroll>
              <ChevronsDownIcon
                size={32}
                className="text-accent hover:scale-110 transition-transform cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </section>

      <Suspense fallback={<AboutSkeleton />}>
        <PublicAbout lng={lng} />
      </Suspense>

      <Suspense fallback={<ProjectsSkeleton />}>
        <PublicProjects lng={lng} />
      </Suspense>

      <Suspense fallback={<PublicSkillsSkeleton lng={lng} />}>
        <PublicSkills lng={lng} />
      </Suspense>
    </div>
  );
}
