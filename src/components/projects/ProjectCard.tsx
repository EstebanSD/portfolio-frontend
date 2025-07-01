'use client';

import { format } from 'date-fns';
import { Project, ProjectStatus, ProjectType } from '@/types';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui';
import Image from 'next/image';
import { CalendarIcon, ClockIcon, ExternalLinkIcon, ImageIcon } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { useTranslation } from '@/lib/i18n/client';

const getStatusColor = (status: ProjectStatus) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800';
    case 'paused':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getTypeColor = (type: ProjectType) => {
  switch (type) {
    case 'company':
      return 'bg-purple-100 text-purple-800';
    case 'freelance':
      return 'bg-cyan-100 text-cyan-800';
    case 'personal':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const formatDate = (date: Date | string | undefined) => {
  if (!date) return '';
  return format(new Date(date), 'MMM yyyy');
};

interface ProductCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProductCardProps) {
  const { general, summary } = project;
  const imageUrl = general.images && general.images.length ? general.images[0].url : null;

  const { t } = useTranslation(project.locale, 'projects');

  return (
    // TODO onCLick
    <Card className="max-w-sm md:max-w-md lg:max-w-lg group pt-0 overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-background dark:bg-gray-900">
      <div className="relative h-48 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            alt={general.title}
          />
        ) : (
          <div className="h-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
            <div className="relative z-10 flex flex-col items-center space-y-2">
              <ImageIcon className="w-12 h-12 text-slate-400" />
              <span className="text-slate-500 font-medium text-sm">{t('card.preview')}</span>
            </div>
          </div>
        )}

        {/* Status Badge Overlay */}
        <div className="absolute top-3 right-3">
          <Badge
            variant="secondary"
            className={`${getStatusColor(general.status)} border-0 font-medium`}
          >
            {t(`card.status.${general.status}`)}
          </Badge>
        </div>

        {/* Type Badge Overlay */}
        <div className="absolute top-3 left-3">
          <Badge
            variant="secondary"
            className={`${getTypeColor(general.type)} border-0 font-medium`}
          >
            {t(`card.type.${general.type}`)}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {general.title}
          </CardTitle>
        </div>
        <CardDescription className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
          {summary}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Date Information */}
        {(general.startDate || general.endDate) && (
          <div className="flex items-center gap-4 text-xs text-gray-500">
            {general.startDate && (
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-3 h-3" />
                <span>
                  {t('card.start')}: {formatDate(general.startDate)}
                </span>
              </div>
            )}
            {general.endDate && (
              <div className="flex items-center gap-1">
                <ClockIcon className="w-3 h-3" />
                <span>
                  {t('card.end')}: {formatDate(general.endDate)}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Technologies */}
        {general.technologies && general.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {general.technologies.slice(0, 4).map((tech, index) => (
              <Badge key={index} variant="outline">
                {tech}
              </Badge>
            ))}
            {general.technologies.length > 4 && (
              <Badge variant="outline">+{general.technologies.length - 4}</Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0 flex justify-between items-center">
        <div className="flex gap-2">
          {general.links?.website && (
            <Button variant="secondary" size="sm" asChild>
              <a
                href={general.links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5"
              >
                <ExternalLinkIcon className="w-3 h-3" />
                <span className="text-xs font-medium">{t('card.website')}</span>
              </a>
            </Button>
          )}

          {general.links?.github && (
            <Button variant="secondary" size="sm" asChild>
              <a
                href={general.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5"
              >
                <SiGithub className="w-3 h-3" />
                <span className="text-xs font-medium">{t('card.github')}</span>
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
