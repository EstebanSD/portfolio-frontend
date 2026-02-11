import { Suspense } from 'react';
import Link from 'next/link';
import { ChevronsDownIcon } from 'lucide-react';
import { serverTranslation } from '@/lib/i18n/server';
import { AboutSection, AboutSkeletonSection } from './components/about';
import { ProjectsSection, ProjectsSkeletonSection } from './components/projects';
import { SkillsSection, SkillsSkeletonSection } from './components/skills';
import { ExperiencesSkeletonSection, ExperiencesSection } from './components/experiences';

export default async function HomePage({ params }: PageProps<'/[lng]'>) {
  const { lng } = await params;
  const { t } = await serverTranslation(lng, 'hero');

  return (
    <div>
      <section className="min-h-screen flex items-center justify-center bg-background dark:bg-gray-900">
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

      <Suspense fallback={<AboutSkeletonSection lng={lng} />}>
        <AboutSection lng={lng} />
      </Suspense>

      <Suspense fallback={<ProjectsSkeletonSection lng={lng} />}>
        <ProjectsSection lng={lng} />
      </Suspense>

      <Suspense fallback={<SkillsSkeletonSection lng={lng} />}>
        <SkillsSection lng={lng} />
      </Suspense>

      <Suspense fallback={<ExperiencesSkeletonSection lng={lng} />}>
        <ExperiencesSection lng={lng} />
      </Suspense>
    </div>
  );
}
