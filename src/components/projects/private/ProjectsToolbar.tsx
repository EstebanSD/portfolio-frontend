'use client';

import { useCallback } from 'react';
import { XIcon } from 'lucide-react';
import { Button } from '@/components/ui';
import { SearchFilterInputControlled, SelectFilterControlled } from '@/components/common';
import { ProjectStatus, ProjectType, RequiredProjectFilters } from '@/types-portfolio/project';

const TYPE_OPTIONS: { label: string; value: ProjectType | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Personal', value: 'personal' },
  { label: 'Company', value: 'company' },
  { label: 'Freelance', value: 'freelance' },
];

const STATUS_OPTIONS: { label: string; value: ProjectStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Completed', value: 'completed' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Paused', value: 'paused' },
];

interface Props {
  filters: RequiredProjectFilters;
  setFilters: React.Dispatch<React.SetStateAction<RequiredProjectFilters>>;
}
export function ProjectsToolbar({ filters, setFilters }: Props) {
  const clearFilters = useCallback(() => {
    setFilters({ status: 'all', type: 'all', title: '' });
  }, [setFilters]);

  const hasActiveFilters =
    filters.title !== '' || filters.status !== 'all' || filters.type !== 'all';

  return (
    <div className="p-2 md:p-4 w-full overflow-hidden space-y-4 border rounded-md">
      <div className="flex flex-wrap gap-2">
        <SearchFilterInputControlled
          paramKey="title"
          label="Title"
          placeholder="Search by title..."
          value={filters.title}
          onChange={(value) => setFilters((prev) => ({ ...prev, title: value }))}
          className="flex-1 min-w-full md:min-w-[100px]"
        />

        <SelectFilterControlled
          paramKey={'type'}
          label={'Type'}
          placeholder={'Select a type...'}
          options={TYPE_OPTIONS}
          value={filters.type}
          onValueChange={(value) => setFilters((prev) => ({ ...prev, type: value }))}
          className="min-w-[100px]"
        />

        <SelectFilterControlled
          paramKey={'status'}
          label={'Status'}
          placeholder={'Select a status...'}
          options={STATUS_OPTIONS}
          value={filters.status}
          onValueChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
          className="min-w-[100px]"
        />

        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={clearFilters} className="mt-4 self-center">
            <XIcon className="h-4 w-4" />
            <span>Clear</span>
          </Button>
        )}
      </div>
    </div>
  );
}
