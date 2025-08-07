'use client';

import { useEffect, useState } from 'react';
import { FolderXIcon, PlusIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Button, Card, CardContent } from '../ui';
import { AddTranslationForm } from './AddTranslationForm';
import { AboutTranslation } from '@/types';
import { TranslationCard } from './TranslationCard';
import { getAvailableLocales } from '@/utils';

interface Props {
  initialData?: AboutTranslation[];
}
export function AboutTranslations({ initialData }: Props) {
  const { data: session } = useSession();
  const [translations, setTranslations] = useState<AboutTranslation[]>([]);
  const [isAddNew, setIsAddNew] = useState<boolean>(false);

  const locales = getAvailableLocales(translations);

  useEffect(() => {
    if (initialData) setTranslations(initialData);
  }, [initialData]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Translations</h2>
          <p className="text-muted-foreground">Manage translations for different languages</p>
        </div>
        {locales.length > 0 && (
          <Button variant={'secondary'} onClick={() => setIsAddNew(true)} disabled={isAddNew}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Translation
          </Button>
        )}
      </div>

      {/* Add New Translation */}
      {isAddNew && (
        <AddTranslationForm
          cancelNew={() => setIsAddNew(false)}
          locales={locales}
          session={session}
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
            <TranslationCard key={translation._id} translation={translation} session={session} />
          ))
        )}
      </div>
    </div>
  );
}
