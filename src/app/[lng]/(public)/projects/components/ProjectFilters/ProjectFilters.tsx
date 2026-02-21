'use client';

import { XIcon } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/client';
import { ProjectStatus, ProjectType } from '@/types-portfolio/project';
import { Button, Card, CardContent } from '@/components/ui';
import { SearchInput, SelectFilter } from '@/components/common';
import { useProjectsFilters } from './useProjectsFilters';

interface ProjectFiltersProps {
  lng: string;
}

export function ProjectFilters({ lng }: ProjectFiltersProps) {
  const { t } = useTranslation(lng, 'projects');
  const { filters, setType, setStatus, setTitle, resetAll, hasActiveFilters } = useProjectsFilters({
    lng,
  });

  const TYPE_OPTIONS: { label: string; value: ProjectType | 'all' }[] = [
    { label: t('page.filter.labelAll'), value: 'all' },
    { label: t('page.filter.typeLabelPersonal'), value: 'personal' },
    { label: t('page.filter.typeLabelCompany'), value: 'company' },
    { label: t('page.filter.typeLabelFreelance'), value: 'freelance' },
  ];

  const STATUS_OPTIONS: { label: string; value: ProjectStatus | 'all' }[] = [
    { label: t('page.filter.labelAll'), value: 'all' },
    { label: t('page.filter.statusLabelCompleted'), value: 'completed' },
    { label: t('page.filter.statusLabelInProgress'), value: 'in_progress' },
    { label: t('page.filter.statusLabelPaused'), value: 'paused' },
  ];

  return (
    <div className="mt-2 mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4 items-end">
            <SelectFilter
              label={t('page.filter.type')}
              placeholder={t('page.filter.typePlaceholder')}
              className="min-w-[150px]"
              value={filters.type}
              onValueChange={setType}
              options={TYPE_OPTIONS}
            />

            <SelectFilter
              label={t('page.filter.status')}
              placeholder={t('page.filter.statusPlaceholder')}
              className="min-w-[150px]"
              value={filters.status}
              onValueChange={setStatus}
              options={STATUS_OPTIONS}
            />

            <SearchInput
              id={'title'}
              label={t('page.filter.search')}
              placeholder={t('page.filter.searchPlaceholder')}
              className="flex-1 min-w-[200px]"
              value={filters.title}
              onChange={setTitle}
            />

            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={resetAll} className="mb-0">
                <XIcon className="h-4 w-4 mr-2" />
                {t('page.filter.cleanFilters')}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
