import { EmptyStateCard } from '@/components/common';
import { publicEnv } from '@/config/env.public';
import { serverTranslation } from '@/lib/i18n/server';
import { Skill, SkillCategory } from '@/types-portfolio/skill';
import { SkillCard } from './SkillCard';

const API_URL = publicEnv.NEXT_PUBLIC_API_URL;

export async function SkillsSection({ lng }: { lng: string }) {
  const { t } = await serverTranslation(lng, 'skills');

  try {
    const catResp = await fetch(`${API_URL}/portfolio/skills/categories/${lng}`, {
      cache: 'force-cache',
      next: {
        revalidate: 3600,
        tags: ['categories'],
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!catResp.ok) {
      throw new Error(`Error HTTP: ${catResp.status}`);
    }

    const categories: SkillCategory[] = await catResp.json();

    const categoryWithSkills = await Promise.all(
      categories.map(async (category) => {
        const skillResp = await fetch(
          `${API_URL}/portfolio/skills/categories/${category.general._id}/items`,
          {
            cache: 'force-cache',
            next: {
              revalidate: 3600,
              tags: ['skills', `category-${category._id}`],
            },
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (!skillResp.ok) {
          console.warn(`Failed to load items for category ${category.general.key}`);
          return { category, skills: [] };
        }

        const skills: Skill[] = await skillResp.json();
        return { category, skills };
      }),
    );

    return (
      <section id="skills" className="scroll-mt-24 min-h-screen py-20 px-4 bg-background">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-foreground mb-4">
            {t('page.title1')} <span className="text-primary">{t('page.title2')}</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
          <p className="mt-4 md:mt-6 text-gray-600 text-center">{t('page.subtitle')}</p>
        </div>

        {categoryWithSkills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryWithSkills.map(({ category, skills }) => {
              return <SkillCard key={category._id} category={category} skills={skills} />;
            })}
          </div>
        ) : (
          <EmptyStateCard
            title={t('empty.title')}
            description={t('empty.description')}
            iconName="ban"
          />
        )}
      </section>
    );
  } catch (error) {
    console.error('Error loading projects:', error);

    return (
      <section id="skills" className="scroll-mt-24 min-h-48 py-20 px-4 bg-background">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-foreground mb-4">
            {t('page.title1')} <span className="text-primary">{t('page.title2')}</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
          <p className="mt-4 md:mt-6 text-gray-600 text-center">{t('page.subtitle')}</p>
        </div>

        <div className="max-w-3xl mx-auto text-center text-muted-foreground">
          <p className="text-lg mb-4">{t('errors.errorMessage')}</p>
        </div>
      </section>
    );
  }
}
