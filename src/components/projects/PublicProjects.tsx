import { serverTranslation } from '@/lib/i18n';
import { Project } from '@/types-portfolio/project';
import { ProjectCard } from './ProjectCard';
import { CustomCarousel, EmptyState } from '../common';
import { Button } from '../ui';
import Link from 'next/link';

const apiUrl = process.env.NEXT_PUBLIC_API_URL!;

export async function PublicProjects({ lng }: { lng: string }) {
  const { t } = await serverTranslation(lng, 'projects');

  try {
    const response = await fetch(`${apiUrl}/portfolio/projects?locale=${lng}`, {
      cache: 'force-cache',
      next: {
        revalidate: 3600,
        tags: ['projects'],
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const projects: Project[] = await response.json();

    return (
      <section
        id="projects"
        className="scroll-mt-24 min-h-screen py-20 px-2 md:px-8 bg-background dark:bg-gray-900"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-foreground mb-4">
            {t('section.title1')} <span className="text-primary">{t('section.title2')}</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </div>

        <div className="flex items-center justify-end">
          <Button variant={'outline'}>
            <Link href={'projects'}>{t('section.seeAll')}</Link>
          </Button>
        </div>

        {projects.length > 0 ? (
          <CustomCarousel
            showDots
            autoplay
            autoplayDelay={4200}
            navigationStyle="none"
            itemClassName="pt-4 pb-8"
            items={projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          />
        ) : (
          <EmptyState
            asCard
            title={t('section.emptyTitle')}
            description={t('section.emptyDescription')}
            iconName="ban"
          />
        )}
      </section>
    );
  } catch (error) {
    console.error('Error loading projects:', error);

    return (
      <section
        id="projects"
        className="scroll-mt-24 min-h-48 py-20 px-2 md:px-8 bg-background dark:bg-gray-900"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-foreground mb-4">
            {t('section.title1')} <span className="text-primary">{t('section.title2')}</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </div>

        <div className="max-w-3xl mx-auto text-center text-muted-foreground">
          <p className="text-lg mb-4">{t('errors.errorMessage')}</p>
        </div>
      </section>
    );
  }
}
