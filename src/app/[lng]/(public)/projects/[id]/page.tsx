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
      <div className="min-h-screen">
        {/* Main Container */}
        <div>
          <div className="py-6 md:px-2 lg:px-4">
            <ButtonLink
              variant={'ghost'}
              className="group hover:bg-accent/80 hover:text-white transition-colors"
              href={`/${lng}/projects`}
            >
              <ArrowLeftIcon className="w-4 h-4 mr-3 transition-transform duration-200 group-hover:-translate-x-1" />
              {t('project.goBack')}
            </ButtonLink>
          </div>

          <div className="px-4 md:px-6 lg:px-8 pb-8">
            {/* Hero Section */}
            <div className="mb-8 space-y-6">
              <div className="flex items-center gap-2">
                {getTypeIcon(general.type)}
                <span className="text-sm text-muted-foreground font-medium">
                  {t(`card.type.${general.type}`)}
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  {general.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4">
                  <Badge className={`${getStatusColor(general.status)} px-3 py-1`}>
                    <ClockIcon className="w-3 h-3 mr-1.5" />
                    {t(`card.status.${general.status}`)}
                  </Badge>

                  {general.startDate && (
                    <div className="flex items-center text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-md">
                      <CalendarDaysIcon className="w-4 h-4 mr-1.5" />
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

                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-4xl">
                  {project.summary}
                </p>
              </div>
            </div>

            {/* Images Gallery */}
            {general.images && general.images.length > 0 && (
              <Card className="mb-8 px-4 dark:bg-gray-900/50 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-primary flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    {t('project.images')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <CustomCarousel
                    navigationStyle="minimal"
                    items={general.images.map((image, index) => (
                      <div
                        key={image.publicId}
                        className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 shadow-inner"
                      >
                        <Image
                          src={image.url}
                          fill
                          alt={`${general.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      </div>
                    ))}
                  />
                </CardContent>
              </Card>
            )}

            {/* Adaptable Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <Card className="dark:bg-gray-900/50 shadow-lg h-full">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-primary flex items-center gap-2 text-xl">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      {t('project.description')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <div className="prose max-w-none dark:prose-invert">
                      <div className="text-foreground leading-relaxed whitespace-pre-wrap text-base">
                        {project.description}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar with Additional info */}
              <div className="h-full grid gap-4 mb-8 grid-cols-[repeat(auto-fill,minmax(240px,1fr))] lg:grid-cols-1 xl:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
                {/* Tech */}
                {general.technologies && general.technologies.length > 0 && (
                  <Card className="dark:bg-gray-900/50 shadow-lg p-3 gap-2">
                    <CardHeader>
                      <CardTitle className="text-primary flex items-center gap-2 text-lg min-w-0">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="truncate">{t('project.technologies')}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 flex flex-wrap gap-1">
                      {general.technologies.map((tech, idx) => (
                        <Badge key={tech + idx} variant={'secondary'}>
                          {tech}
                        </Badge>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Links */}
                {general.links && (general.links.github || general.links.website) && (
                  <Card className="dark:bg-gray-900/50 shadow-lg p-3 gap-2">
                    <CardHeader>
                      <CardTitle className="text-primary flex items-center gap-2 text-lg min-w-0">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="truncate">{t('project.links.title')}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 flex flex-wrap gap-2">
                      {general.links.github && (
                        <Button variant="secondary" asChild className="w-full">
                          <a href={general.links.github} target="_blank" rel="noopener noreferrer">
                            <SiGithub className="w-4 h-4 mr-1" />
                            <span className="truncate">{t('project.links.github')}</span>
                            <ExternalLinkIcon className="w-3 h-3 ml-auto" />
                          </a>
                        </Button>
                      )}
                      {general.links.website && (
                        <Button variant="secondary" asChild className="w-full">
                          <a href={general.links.website} target="_blank" rel="noopener noreferrer">
                            <GlobeIcon className="w-4 h-4 mr-1" />
                            <span className="truncate">{t('project.links.website')}</span>
                            <ExternalLinkIcon className="w-3 h-3 ml-auto" />
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Metadata */}
                <Card className="dark:bg-gray-900/50 shadow-lg p-3 gap-2">
                  <CardHeader>
                    <CardTitle className="text-primary flex items-center gap-2 text-lg min-w-0">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="truncate">{t('project.info.title')}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {t('project.info.type')}
                      </label>
                      <p className="text-foreground font-medium">
                        {t(`card.type.${general.type}`)}
                      </p>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {t('project.info.status')}
                      </label>
                      <p className="text-foreground font-medium">
                        {t(`card.status.${general.status}`)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading project:', error);
    return (
      <div className="min-h-screen pt-8">
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
