import { use } from 'react';
import { serverTranslation } from '@/lib/i18n/server';
import { Project, ProjectQueryFilters } from '@/types-portfolio/project';
import { EmptyStatePage } from '@/components/common';
import { ProjectCard } from '@/components/projects';

type Filters = Required<ProjectQueryFilters>;

const apiUrl = process.env.NEXT_PUBLIC_API_URL!;

async function getProjects(lng: string, filters: ProjectQueryFilters) {
  const params = new URLSearchParams();
  params.append('locale', lng);

  if (filters.title) params.append('title', filters.title);
  if (filters.status && filters.status !== 'all') params.append('status', filters.status);
  if (filters.type && filters.type !== 'all') params.append('type', filters.type);

  const response = await fetch(`${apiUrl}/portfolio/projects?${params}`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Error fetching projects');
  }

  return response.json();
}

interface Props {
  lng: string;
  filters: Filters;
}

export function ProjectList({ lng, filters }: Props) {
  const { t } = use(serverTranslation(lng, 'projects'));
  const projects: Project[] = use(getProjects(lng, filters));

  if (projects.length === 0) {
    return (
      <EmptyStatePage
        title={t('page.projects.emptyTitle')}
        description={t('page.projects.emptyDescription')}
        iconName="search"
      />
    );
  }
  return (
    <div className="grid gap-4 md:gap-6 mb-8 grid-cols-[repeat(auto-fill,minmax(280px,1fr))] dark:px-4 dark:py-6 dark:rounded-md dark:bg-gray-900">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
}
