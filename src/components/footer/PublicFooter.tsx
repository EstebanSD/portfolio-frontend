import Link from 'next/link';
import { GlobeIcon, LinkedinIcon } from 'lucide-react';
import { SiGithub, SiX, SiInstagram } from 'react-icons/si';
import { Contact, SocialPlatformType } from '@/types-portfolio/contact';
import { serverTranslation } from '@/lib/i18n';
import { ButtonCopy } from '../common';
import { ButtonScrollToTop } from './ButtonScrollToTop';

const SOCIAL_ICONS: Record<SocialPlatformType, React.ComponentType<{ className?: string }>> = {
  github: SiGithub,
  linkedin: LinkedinIcon, // TODO update icon
  twitter: SiX,
  instagram: SiInstagram,
  website: GlobeIcon,
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL!;

export async function PublicFooter({ lng }: { lng: string }) {
  const { t } = await serverTranslation(lng, 'footer');

  try {
    const response = await fetch(`${apiUrl}/portfolio/contact`, {
      cache: 'force-cache',
      next: {
        revalidate: 3600,
        tags: ['contact'],
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const contact: Contact = await response.json();

    const createdYear = new Date(contact.createdAt).getFullYear();

    return (
      <>
        <footer className="bg-background dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Principal Grid - responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Contact Section */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-foreground">
                  {t('contact.title')}
                </h3>
                <div className="space-y-2">
                  <ButtonCopy toCopy={contact.email} iconName="mail" />
                  {contact.phone && <ButtonCopy toCopy={contact.phone} iconName="phone" />}
                </div>
              </div>

              {/* Social Section */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-foreground">
                  {t('social.title')}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {contact.socialLinks &&
                    Object.entries(contact.socialLinks).map(([platform, url]) => {
                      if (!url) return null;

                      const Icon = SOCIAL_ICONS[platform as SocialPlatformType];

                      return (
                        <Link
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center p-2 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-primary transition-colors"
                          aria-label={`${platform} profile`}
                        >
                          <Icon className="h-5 w-5" />
                        </Link>
                      );
                    })}
                </div>
              </div>

              {/* More Section */}
              <div className="space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-1">
                <h3 className="text-base sm:text-lg font-semibold text-foreground">
                  {t('more.title')}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                  {t('more.description')}
                </p>
              </div>
            </div>

            {/* Footer bottom */}
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-center items-center">
                <p className="text-xs text-muted-foreground">
                  {t('builtWith')} Next.js & TypeScript • {createdYear}
                </p>
              </div>
            </div>
          </div>
        </footer>
        <ButtonScrollToTop />
      </>
    );
  } catch (error) {
    console.error('Error loading contact:', error);

    return (
      <>
        <footer className="bg-background dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="text-center space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-foreground">
                {t('contact.title')}
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{t('fallback')}</p>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
              <p className="text-xs text-muted-foreground">
                {t('builtWith')} Next.js & TypeScript • {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </footer>
        <ButtonScrollToTop />
      </>
    );
  }
}
