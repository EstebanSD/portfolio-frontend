import Image from 'next/image';
import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  ClockIcon,
  ExternalLinkIcon,
  GlobeIcon,
} from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
} from '@/components/ui';
import { Project } from '@/types';
import { formatDate, getStatusColor, getTypeIcon } from '@/utils';
import { serverTranslation } from '@/lib/i18n';
import { ButtonLink, CustomCarousel, EmptyState } from '@/components/common';

interface Props {
  params: Promise<{ lng: string; id: string }>;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL!;
export default async function page({ params }: Props) {
  const { lng, id } = await params;
  const { t } = await serverTranslation(lng, 'projects');

  try {
    const response = await fetch(`${apiUrl}/portfolio/projects/${id}/locale/${lng}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const project: Project = await response.json();
    const { general } = project;

    return (
      <div className="min-h-screen py-6">
        <ButtonLink
          variant={'ghost'}
          className="ml-2 md:ml-4 lg:ml-8 mb-10 group"
          href={`/${lng}/projects`}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-3 transition-transform duration-200 group-hover:-translate-x-1" />
          {t('project.goBack')}
        </ButtonLink>

        {/* Header */}
        <div className="max-w-6xl bg-gray-50 dark:bg-gray-900 rounded-2xl mx-auto p-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              {getTypeIcon(general.type)}
              <span className="text-sm text-muted-foreground">
                {t(`card.type.${general.type}`)}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-foreground mb-4">{general.title}</h1>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge className={getStatusColor(general.status)}>
                <ClockIcon className="w-3 h-3 mr-1" />
                {t(`card.status.${general.status}`)}
              </Badge>

              {general.startDate && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarDaysIcon className="w-4 h-4 mr-1" />
                  {formatDate(general.startDate)}
                  {general.endDate && (
                    <>
                      <span className="mx-2">-</span>
                      {formatDate(general.endDate)}
                    </>
                  )}
                </div>
              )}
            </div>

            <p className="text-xl text-foreground leading-relaxed">{project.summary}</p>
          </div>

          {/* Images */}
          {general.images && general.images.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-primary">{t('project.images')}</CardTitle>
              </CardHeader>
              <CardContent className="mx-8">
                <CustomCarousel
                  navigationStyle="minimal"
                  items={general.images.map((image, index) => (
                    <div
                      key={image.publicId}
                      className="relative aspect-video rounded-lg overflow-hidden bg-gray-100"
                    >
                      <Image
                        src={image.url}
                        fill
                        alt={`${general.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                />
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">{t('project.description')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                      {project.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar with additional info */}
            <div className="space-y-6">
              {/* Tech */}
              {general.technologies && general.technologies.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-primary">{t('project.technologies')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {general.technologies.map((tech, idx) => (
                        <Badge
                          key={tech + idx}
                          variant="secondary"
                          className="bg-blue-50 text-blue-700 border-blue-200"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Links */}
              {general.links && (general.links.github || general.links.website) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-primary">{t('project.links.title')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {general.links.github && (
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <a href={general.links.github} target="_blank" rel="noopener noreferrer">
                          <SiGithub className="w-4 h-4 mr-2" />
                          {t('project.links.github')}
                          <ExternalLinkIcon className="w-3 h-3 ml-auto" />
                        </a>
                      </Button>
                    )}
                    {general.links.website && (
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <a href={general.links.website} target="_blank" rel="noopener noreferrer">
                          <GlobeIcon className="w-4 h-4 mr-2" />
                          {t('project.links.website')}
                          <ExternalLinkIcon className="w-3 h-3 ml-auto" />
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Metadata */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">{t('project.info.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      {t('project.info.type')}
                    </label>
                    <p className="text-foreground">{t(`card.type.${general.type}`)}</p>
                  </div>

                  <Separator />

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      {t('project.info.status')}
                    </label>
                    <p className="text-foreground">{t(`card.status.${general.status}`)}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading project:', error);
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <EmptyState
            asCard
            title={t('project.error.title')}
            description={t('project.error.description')}
            iconName="ban"
          />
          <ButtonLink className="mt-10" href={`/${lng}/projects`}>
            {t('project.goBack')}
          </ButtonLink>
        </div>
      </div>
    );
  }
}
