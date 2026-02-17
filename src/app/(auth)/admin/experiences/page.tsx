import { Metadata } from 'next';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui';
import { fetchExperiencesAction } from './actions';
import { ExperiencesManagement } from './components/ExperiencesManagement';

export const metadata: Metadata = {
  title: 'Professional Experiences',
};

export default async function page() {
  const result = await fetchExperiencesAction();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Experience Management</h1>
          <p className="text-muted-foreground">
            Take charge of your professional experience and and translations.
          </p>
        </div>

        <Button asChild>
          <Link href={'/admin/experiences/new'}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Experience
          </Link>
        </Button>
      </div>

      {!result.success ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
          <p className="text-red-500">{result.message}</p>
        </div>
      ) : (
        <ExperiencesManagement experiences={result.data} />
      )}
    </div>
  );
}
