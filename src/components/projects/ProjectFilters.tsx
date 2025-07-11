'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { XIcon } from 'lucide-react';
import { Button, Card, CardContent } from '../ui';
import { SearchFilterInput, SelectFilter } from '../common';
import { ProductQueryFilters, ProjectStatus, ProjectType } from '@/types';
import { useTranslation } from '@/lib/i18n/client';

type Filters = Required<ProductQueryFilters>;

interface ProjectFiltersProps {
  lng: string;
  currentFilters: Filters;
}

export function ProjectFilters({ lng, currentFilters }: ProjectFiltersProps) {
  const router = useRouter();
  const { t } = useTranslation(lng, 'projects');

  const clearFilters = useCallback(() => {
    router.push(`/${lng}/projects`);
  }, [router, lng]);

  const hasActiveFilters =
    currentFilters.title !== '' || currentFilters.status !== 'all' || currentFilters.type !== 'all';

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
    <div className="mt-2 mb-8 mx-2">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4 items-end">
            <SelectFilter
              paramKey="type"
              label={t('page.filter.type')}
              placeholder={t('page.filter.typePlaceholder')}
              basePath={`/${lng}/projects`}
              initialValue="all"
              className="min-w-[150px]"
              options={TYPE_OPTIONS}
            />

            <SelectFilter
              paramKey="status"
              label={t('page.filter.status')}
              placeholder={t('page.filter.statusPlaceholder')}
              basePath={`/${lng}/projects`}
              initialValue="all"
              className="min-w-[150px]"
              options={STATUS_OPTIONS}
            />

            <SearchFilterInput
              paramKey="title"
              label={t('page.filter.search')}
              placeholder={t('page.filter.searchPlaceholder')}
              className="flex-1 min-w-[200px]"
              basePath={`/${lng}/projects`}
            />

            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearFilters} className="mb-0">
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
