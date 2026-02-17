import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import { Button, Card, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { EntityEditorTabs } from '@/components/tabs';
import { fetchExperienceIdAction } from '../actions';
import { GeneralForm } from './components/GeneralForm';
import { Translations } from './components/Translations';

export const metadata: Metadata = {
  title: 'Experience Management',
};

export default async function page({ params }: PageProps<'/admin/experiences/[id]'>) {
  const { id } = await params;
  const result = await fetchExperienceIdAction(id);
  const tCount = result.data?.translations.length || 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="py-4">
        <Button
          asChild
          variant={'ghost'}
          className="group hover:bg-accent/80 hover:text-white transition-colors"
        >
          <Link href={'/admin/experiences'} className="inline-flex items-center">
            <ArrowLeftIcon className="w-4 h-4 mr-3 transition-transform duration-200 group-hover:-translate-x-1" />
            Go Back
          </Link>
        </Button>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl">Manage Experience</CardTitle>
                <CardDescription>
                  Administer your professional experience information and translations
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {!result.success ? (
          <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
            <p className="text-red-500">{result.message}</p>
          </div>
        ) : (
          <EntityEditorTabs
            translationsCount={tCount}
            general={<GeneralForm experienceId={id} initialValues={result.data?.general} />}
            translations={
              <Translations experienceId={id} translations={result.data?.translations || []} />
            }
          />
        )}
      </div>
    </div>
  );
}
