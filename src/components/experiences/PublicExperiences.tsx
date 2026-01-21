import { serverTranslation } from '@/lib/i18n';
import { Experience } from '@/types-portfolio/experience';
import { EmptyState } from '../common';
import { ExperienceCard } from './ExperienceCard';

const apiUrl = process.env.NEXT_PUBLIC_API_URL!;

export async function PublicExperiences({ lng }: { lng: string }) {
  const { t } = await serverTranslation(lng, 'experiences');

  try {
    const response = await fetch(`${apiUrl}/portfolio/experiences?locale=${lng}`, {
      cache: 'force-cache',
      next: {
        revalidate: 3600,
        tags: ['experiences'],
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const experiences: Experience[] = await response.json();

    return (
      <section
        id="experiences"
        className="scroll-mt-24 min-h-screen py-20 px-2 md:px-8 bg-background dark:bg-gray-900"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-foreground mb-4">
            {t('page.title1')} <span className="text-primary">{t('page.title2')}</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </div>

        {experiences.length > 0 ? (
          <div className="pb-4 flex flex-col items-center justify-center space-y-3">
            {experiences.map((experience) => (
              <ExperienceCard key={experience._id} experience={experience} t={t} />
            ))}
          </div>
        ) : (
          <EmptyState
            asCard
            title={t('empty.title')}
            description={t('empty.description')}
            iconName="ban"
          />
        )}
      </section>
    );
  } catch (error) {
    console.error('Error loading experiences:', error);

    return (
      <section
        id="experiences"
        className="scroll-mt-24 min-h-screen py-20 px-2 md:px-8 bg-background dark:bg-gray-900"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-foreground mb-4">
            {t('page.title1')} <span className="text-primary">{t('page.title2')}</span>
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
