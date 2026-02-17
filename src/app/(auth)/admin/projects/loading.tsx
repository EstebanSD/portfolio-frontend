import { ProjectsManagementSkeleton } from './components/ProjectsManagementSkeleton';

export default function Loading() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Project Management</h1>
          <p className="text-muted-foreground">
            Take charge of your projects and keep them well organized.
          </p>
        </div>
      </div>

      <ProjectsManagementSkeleton />
    </div>
  );
}
