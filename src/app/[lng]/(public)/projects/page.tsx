import { Suspense } from 'react';
import { Metadata } from 'next';
import { ProjectFilters, ProjectList, ProjectsSkeleton } from './components';

export const metadata: Metadata = {
  title: 'List of Projects',
  description: 'Explore all projects in the portfolio',
};

export default async function page({ params, searchParams }: PageProps<'/[lng]/projects'>) {
  const { lng } = await params;
  const filters = await searchParams;

  return (
    <div className="min-h-screen px-2 md:px-6 lg:px-10">
      <ProjectFilters lng={lng} />

      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectList lng={lng} filters={filters} />
      </Suspense>
    </div>
  );
}
