'use client';

import { EditIcon, Trash2Icon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { ConfirmDialog, CrudDialog } from '@/components/common';
import { ExperienceTranslation } from '@/types-portfolio/experience';
import { getLocaleInfo } from '@/utils';
import { useDeleteTranslation } from '../hooks/useDeleteTranslation';
import { useUpdateTranslationFlow } from '../hooks/useUpdateTranslationFlow';
import { TranslationForm } from './TranslationForm';

interface Props {
  experienceId: string;
  translation: ExperienceTranslation;
}
export function TranslationCard({ experienceId, translation }: Props) {
  const localeInfo = getLocaleInfo(translation.locale);

  const { deleteTranslation, isEliminating } = useDeleteTranslation();
  const flow = useUpdateTranslationFlow(experienceId, translation);

  return (
    <Card key={translation._id}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{localeInfo?.flag}</span>
          <div>
            <CardTitle>
              <h4 className="font-medium text-foreground">{localeInfo?.name}</h4>
            </CardTitle>

            <p className="text-sm text-muted-foreground">{translation.locale}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <CrudDialog
            open={flow.open}
            onOpenChange={flow.setOpen}
            trigger={
              <button className="p-2 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                <EditIcon className="w-4 h-4" />
              </button>
            }
            title="Edit Translation"
            description={`Update the translation for ${localeInfo?.name ?? ''}`}
          >
            <TranslationForm
              defaultValues={flow.defaultValues}
              onSubmit={flow.confirm}
              isLoading={flow.isUpdating}
            />
          </CrudDialog>

          <ConfirmDialog
            title="Delete Translation"
            confirmLabel="Delete"
            loading={isEliminating}
            onConfirm={() => deleteTranslation(experienceId, translation.locale)}
            trigger={
              <button className="p-2 hover:text-red-600 hover:bg-blue-50 rounded-lg">
                <Trash2Icon className="w-4 h-4" />
              </button>
            }
            description={
              <>
                Are you sure you want to delete the{' '}
                {localeInfo?.name && <strong>{localeInfo.name} </strong>}translation?
                <br />
                <span className="text-destructive">This action cannot be undone.</span>
              </>
            }
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <span className="font-medium text-foreground">Position:</span>
          <p className="mt-1 text-muted-foreground">{translation.position}</p>
        </div>

        <div className="md:col-span-2 text-foreground">
          <span className="font-medium text-foreground">Description:</span>
          <p className="mt-1 text-muted-foreground line-clamp-3">
            {translation.description || '-'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
