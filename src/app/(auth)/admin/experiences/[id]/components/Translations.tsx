'use client';

import { FolderXIcon, PlusIcon } from 'lucide-react';
import { Button, Card, CardContent } from '@/components/ui';
import { ExperienceTranslation } from '@/types-portfolio/experience';
import { getAvailableLocales } from '@/utils';
import { AddTranslationForm } from './AddTranslationForm';
import { useAddTranslationFlow } from '../hooks/useAddTranslationFlow';
import { TranslationCard } from './TranslationCard';

interface Props {
  experienceId: string;
  translations: ExperienceTranslation[];
}
export function Translations({ experienceId, translations }: Props) {
  const locales = getAvailableLocales(translations);

  const { open, setOpen, confirmUpdate, isLoading } = useAddTranslationFlow();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Translations</h2>
          <p className="text-muted-foreground">Manage translations for different languages</p>
        </div>
        {locales.length > 0 && (
          <Button variant={'secondary'} onClick={() => setOpen(true)} disabled={open}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Translation
          </Button>
        )}
      </div>

      {/* Add New Translation */}
      {open && (
        <AddTranslationForm
          experienceId={experienceId}
          cancelNew={() => setOpen(false)}
          onSubmit={confirmUpdate}
          locales={locales}
          loading={isLoading}
        />
      )}

      <div className="grid gap-6">
        {translations.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent className="flex flex-col items-center">
              <p className="text-gray-500 mb-4">No translations yet</p>

              <FolderXIcon className="text-gray-500" />
            </CardContent>
          </Card>
        ) : (
          translations.map((translation) => (
            <TranslationCard
              key={translation._id}
              experienceId={experienceId}
              translation={translation}
            />
          ))
        )}
      </div>
    </div>
  );
}
