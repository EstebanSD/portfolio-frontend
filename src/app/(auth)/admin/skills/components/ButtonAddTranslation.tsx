'use client';

import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui';
import { CrudDialog } from '@/components/common';
import type { Locale } from '@/lib/i18n';
import { useAddTranslationFlow } from '../hooks/useAddTranslationFlow';
import { AddTranslationFormDialog } from './Forms/AddTranslationFormDialog';

interface ButtonAddTranslationProps {
  categoryId: string;
  locales: Locale[];
}
export function ButtonAddTranslation({ categoryId, locales }: ButtonAddTranslationProps) {
  const flow = useAddTranslationFlow();
  return (
    <CrudDialog
      open={flow.open}
      onOpenChange={flow.setOpen}
      trigger={
        <Button variant={'link'} size={'sm'} className="cursor-pointer">
          <PlusIcon className="h-4 w-4 text-blue-600" />
          <span className="text-blue-600">Language</span>
        </Button>
      }
      title="Create Translation"
      description={'Add a new language to the category'}
    >
      <AddTranslationFormDialog
        onSubmit={(values) => flow.confirm(categoryId, values)}
        locales={locales}
        isLoading={flow.isLoading}
      />
    </CrudDialog>
  );
}
