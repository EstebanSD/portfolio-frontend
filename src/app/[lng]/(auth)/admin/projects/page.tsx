import { PlusIcon } from 'lucide-react';
import { ProjectsManagement } from '@/components/projects/private';
import { fetchProjectsAction } from '@/actions/projects';
import { ButtonLink } from '@/components/common';

export default async function page() {
  const projects = await fetchProjectsAction();

  const initialState = { total: 0, completed: 0, inProgress: 0, paused: 0 };
  const projectsCounts = !projects.length
    ? initialState
    : projects.reduce((prev, value) => {
        prev.total += 1;

        if (value.status === 'completed') {
          prev.completed += 1;
        }
        if (value.status === 'in_progress') {
          prev.inProgress += 1;
        }
        if (value.status === 'paused') {
          prev.paused += 1;
        }

        return prev;
      }, initialState);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Project Management</h1>
          <p className="text-muted-foreground">
            Take charge of your projects and keep them well organized.
          </p>
        </div>

        <ButtonLink href={'/en/admin/projects/new'}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Project
        </ButtonLink>
      </div>

      <ProjectsManagement projectsCounts={projectsCounts} projects={projects} />
    </div>
  );
}
