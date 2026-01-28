import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui';
import { CalendarIcon, MapPinIcon } from 'lucide-react';
import { Experience } from '@/types-portfolio/experience';
import { getMonthYearDate } from '@/utils';

const formatDateRange = (
  present: string,
  start: string,
  end?: string,
  ongoing?: boolean,
): string => {
  const formattedStartDate = getMonthYearDate(start);
  if (ongoing) return `${formattedStartDate} - ${present}`;
  let formattedEndDate: string = present;
  if (end) {
    formattedEndDate = getMonthYearDate(end);
  }
  return `${formattedStartDate} - ${formattedEndDate}`;
};

interface ExperienceCardProps {
  experience: Experience;
  t: (key: string) => string;
}

export function ExperienceCard({ experience, t }: ExperienceCardProps) {
  const { position, description, general } = experience;
  const { companyName, companyLogo, type, location, technologies, startDate, endDate, ongoing } =
    general;

  return (
    <Card className="w-full max-w-4xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-border/50 bg-background dark:bg-gray-950">
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          {/* Company Info */}
          <div className="flex items-start gap-3 flex-1">
            <Avatar className="h-12 w-12 border">
              {companyLogo ? (
                <AvatarImage
                  src={companyLogo.url}
                  alt={`${companyName} logo`}
                  className="object-cover w-full h-full"
                />
              ) : null}
              <AvatarFallback className="text-sm font-semibold">
                {companyName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <CardTitle className="text-xl leading-tight mb-1">{position}</CardTitle>
              <CardDescription className="text-base font-medium text-primary mb-2">
                {companyName}
              </CardDescription>

              {location && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPinIcon className="h-3 w-3" />
                  <span>{location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Date and Type */}
          <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <CalendarIcon className="h-3 w-3" />
              <span>{formatDateRange(t('card.present'), startDate, endDate, ongoing)}</span>
            </div>
            <Badge variant={'secondary'} className="text-xs">
              {t(`card.type.${type}`)}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Description */}
        <p className="text-muted-foreground leading-relaxed mb-4">{description}</p>

        {/* Technologies */}
        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs font-medium hover:bg-accent/20 transition-colors"
              >
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
