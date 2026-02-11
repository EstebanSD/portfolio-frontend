'use client';

import { useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import { CalendarIcon, CheckCircleIcon, ClockIcon, FolderOpenIcon } from 'lucide-react';
import { ProjectWithTranslations, RequiredProjectFilters } from '@/types-portfolio/project';
import { ProjectsToolbar } from './ProjectsToolbar';
import { ProjectMobileCard } from './ProjectMobileCard';
import { StatsCard } from './StatsCard';
import { ProjectsTable } from './ProjectsTable';

interface Props {
  projectsCounts: {
    total: number;
    completed: number;
    inProgress: number;
    paused: number;
  };
  projects: ProjectWithTranslations[];
}
export function ProjectsManagement({ projectsCounts, projects }: Props) {
  const { data: session } = useSession();
  const [filters, setFilters] = useState<RequiredProjectFilters>({
    title: '',
    status: 'all',
    type: 'all',
  });

  const titleFilter = filters.title.toLowerCase();
  const filteredProjects = useMemo(() => {
    if (!filters.title && filters.type === 'all' && filters.status === 'all') {
      return projects;
    }

    return projects.filter((project) => {
      if (titleFilter && !project.title.toLowerCase().includes(titleFilter)) {
        return false;
      }
      if (filters.type !== 'all' && project.type !== filters.type) {
        return false;
      }
      if (filters.status !== 'all' && project.status !== filters.status) {
        return false;
      }
      return true;
    });
  }, [projects, filters, titleFilter]);

  return (
    <div className="space-y-6">
      <ProjectsToolbar filters={filters} setFilters={setFilters} />

      <div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-4">
        <StatsCard
          title="Total Projects"
          value={projectsCounts.total}
          icon={<FolderOpenIcon className="h-4 w-4" />}
        />
        <StatsCard
          title="Completed"
          value={projectsCounts.completed}
          icon={<CheckCircleIcon className="h-4 w-4 text-green-600" />}
        />
        <StatsCard
          title="In Progress"
          value={projectsCounts.inProgress}
          icon={<ClockIcon className="h-4 w-4 text-blue-600" />}
        />
        <StatsCard
          title="Paused"
          value={projectsCounts.paused}
          icon={<CalendarIcon className="h-4 w-4 text-yellow-600" />}
        />
      </div>

      <div className="hidden md:block rounded-lg border bg-card">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Projects</h2>

          <ProjectsTable projects={filteredProjects} session={session} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:hidden gap-4">
        {filteredProjects.map((project) => (
          <ProjectMobileCard key={project._id} project={project} session={session} />
        ))}
      </div>
    </div>
  );
}
