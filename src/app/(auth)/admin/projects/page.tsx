import { Metadata } from 'next';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui';
import { fetchProjectsAction } from './actions';
import { ProjectsManagement } from './components/ProjectsManagement';

export const metadata: Metadata = {
  title: 'Projects',
};

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
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Project Management</h1>
          <p className="text-muted-foreground">
            Take charge of your projects and keep them well organized.
          </p>
        </div>

        <Button asChild>
          <Link href={'/admin/projects/new'}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Project
          </Link>
        </Button>
      </div>

      <ProjectsManagement projectsCounts={projectsCounts} projects={projects} />
    </div>
  );
}
