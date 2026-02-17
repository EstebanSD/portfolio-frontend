import { Metadata } from 'next';
import { Button } from '@/components/ui';
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import { ExperienceForm } from './components/ExperienceForm';

export const metadata: Metadata = {
  title: 'Add Professional Experience',
};

export default function page() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="py-4">
        <Button
          variant={'ghost'}
          className="group hover:bg-accent/80 hover:text-white transition-colors"
        >
          <Link href={'/admin/experiences'} className="inline-flex items-center">
            <ArrowLeftIcon className="w-4 h-4 mr-3 transition-transform duration-200 group-hover:-translate-x-1" />
            Go Back
          </Link>
        </Button>
      </div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">
        Create a New Professional Experience.
      </h1>

      <ExperienceForm />
    </div>
  );
}
