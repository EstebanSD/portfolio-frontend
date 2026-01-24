import Image from 'next/image';

import { serverTranslation } from '@/lib/i18n/server';
import { About } from '@/types-portfolio/about';
import { Badge } from '../ui';

const apiUrl = process.env.NEXT_PUBLIC_API_URL!;

export async function PublicAbout({ lng }: { lng: string }) {
  const { t } = await serverTranslation(lng, 'about');

  try {
    const response = await fetch(`${apiUrl}/portfolio/about/${lng}`, {
      cache: 'force-cache',
      next: {
        revalidate: 3600,
        tags: ['about'],
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const about: About = await response.json();
    const aboutGeneral = about.general;

    return (
      <section id="about" className="scroll-mt-24 min-h-screen py-20 px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-foreground mb-4">
            {t('page.title1')} <span className="text-primary">{t('page.title2')}</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </div>

        <div className="max-w-4xl mx-auto text-justify text-muted-foreground leading-relaxed">
          {aboutGeneral.image && (
            <div className="p-4 float-right md:ml-6 hidden md:flex flex-col items-center bg-gray-100 dark:bg-gray-900 rounded-2xl">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mb-4">
                <Image
                  src={aboutGeneral.image.url}
                  alt="profileImage"
                  fill
                  sizes="(max-width: 768px) 160px, 192px"
                  className="object-cover rounded-lg shadow"
                  priority
                />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-foreground mb-2">{about.title}</h3>
                <p className="text-foreground">{aboutGeneral.location || 'Argentina 🇦🇷'}</p>
              </div>
            </div>
          )}
          <p className="text-base sm:text-lg whitespace-pre-line">{about.bio}</p>
          {about?.tagline && (
            <p className="mt-6 text-lg italic text-primary leading-relaxed">
              &ldquo;{about.tagline}&rdquo;
            </p>
          )}
          <div className="clear-both" />
        </div>

        {aboutGeneral.positioningTags && aboutGeneral.positioningTags?.length > 0 && (
          <div className="mt-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              {t('page.principalStack')}
            </h3>
            <div className="flex flex-wrap gap-3">
              {aboutGeneral.positioningTags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </div>
        )}
      </section>
    );
  } catch (error) {
    console.error('Error loading about data:', error);

    return (
      <section id="about" className="scroll-mt-24 min-h-48 py-20 px-4 md:px-8">
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
