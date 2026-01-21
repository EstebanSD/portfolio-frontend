'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';
import { Session } from 'next-auth';
import { ProjectTranslation } from '@/types-portfolio/project';
import { AVAILABLE_LOCALES } from '@/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { type ProjectTranslationFormValues } from '@/lib/validations';
import { DialogDelete } from '@/components/common';
import { deleteTranslationAction, editTranslationAction } from '@/actions/projects';
import { DialogProjectTranslationEdit } from './DialogProjectTranslationEdit';

const getLocaleInfo = (code: string) => AVAILABLE_LOCALES.find((l) => l.code === code);

interface Props {
  projectId: string;
  session: Session | null;
  translation: ProjectTranslation;
}
export function TranslationProjectCard({ projectId, session, translation }: Props) {
  const [isPending, startTransition] = useTransition();
  const localeInfo = getLocaleInfo(translation.locale);

  const handleDelete = async () => {
    if (!session?.accessToken) {
      toast.error('Authentication required');
      return;
    }

    startTransition(async () => {
      try {
        await deleteTranslationAction(projectId, translation.locale, session.accessToken);
        toast.success(`${localeInfo?.name} translation deleted successfully`);
      } catch (error) {
        toast.error(`Failed to delete ${localeInfo?.name} translation`);
        console.error('Delete error:', error);
      }
    });
  };

  const handleEdit = async (values: ProjectTranslationFormValues) => {
    if (!session?.accessToken) {
      toast.error('Authentication required');
      return;
    }

    startTransition(async () => {
      try {
        await editTranslationAction(projectId, values, session.accessToken);
        toast.success(`${localeInfo?.name} translation edited successfully`);
      } catch (error) {
        toast.error(`Failed to edit ${localeInfo?.name} translation`);
        console.error('Edit error:', error);
      }
    });
  };
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
          <DialogProjectTranslationEdit
            translation={translation}
            localeInfo={localeInfo}
            handleEdit={handleEdit}
            isLoading={isPending}
          />

          <DialogDelete
            title="Delete Translation"
            handleDelete={handleDelete}
            isLoading={isPending}
          >
            <>
              Are you sure you want to delete the{' '}
              {localeInfo?.name && <strong>{localeInfo.name} </strong>}translation?
              <br />
              <span className="text-destructive">This action cannot be undone.</span>
            </>
          </DialogDelete>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <span className="font-medium text-foreground">Summary:</span>
          <p className="mt-1 text-muted-foreground">{translation.summary || '-'}</p>
        </div>

        <div className="md:col-span-2 text-foreground">
          <span className="font-medium text-foreground">Description:</span>
          <p className="mt-1 text-muted-foreground line-clamp-3">{translation.description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
