import { Suspense } from 'react';
import { ProjectFilters, ProjectList, ProjectsSkeleton } from '@/components/projects';
import { ProductQueryFilters } from '@/types';

interface Props {
  params: Promise<{ lng: string }>;
  searchParams: Promise<ProductQueryFilters>;
}

export default async function page({ params, searchParams }: Props) {
  const { lng } = await params;
  const sp = await searchParams;

  const filters = {
    title: sp.title || '',
    status: sp.status || 'all',
    type: sp.type || 'all',
  };

  return (
    <div className="min-h-screen px-2 md:px-6 lg:px-10">
      <ProjectFilters lng={lng} currentFilters={filters} />

      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectList lng={lng} filters={filters} />
      </Suspense>
    </div>
  );
}
