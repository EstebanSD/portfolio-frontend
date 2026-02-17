import { ExperiencesManagementSkeleton } from './components/ExperiencesManagementSkeleton';

export default function Loading() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Experience Management</h1>
          <p className="text-muted-foreground">
            Take charge of your professional experience and and translations.
          </p>
        </div>
      </div>
      <ExperiencesManagementSkeleton />
    </div>
  );
}
