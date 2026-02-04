'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';
import { Session } from 'next-auth';
import { DownloadIcon, Trash2Icon } from 'lucide-react';
import { deleteTranslationAction, editTranslationAction } from '@/actions/about';
import { ConfirmDialog } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { publicEnv } from '@/config/env.public';
import { AVAILABLE_LOCALES } from '@/lib/i18n';
import { type AboutTranslationFormValues } from '@/lib/validations';
import { AboutTranslation } from '@/types-portfolio/about';
import { DialogAboutTranslationEdit } from './DialogAboutTranslationEdit';

const API_URL = publicEnv.NEXT_PUBLIC_API_URL;

const getLocaleInfo = (code: string) => AVAILABLE_LOCALES.find((l) => l.code === code);
const handleDownload = (lng: string) => {
  try {
    window.open(`${API_URL}/portfolio/about/resume/download?locale=${lng}`, '_blank');
  } catch (error) {
    console.error('Error downloading CV:', error);
  }
};

interface Props {
  session: Session | null;
  translation: AboutTranslation;
}
export function TranslationAboutCard({ session, translation }: Props) {
  const [isPending, startTransition] = useTransition();
  const localeInfo = getLocaleInfo(translation.locale);

  const handleDelete = async () => {
    if (!session?.accessToken) {
      toast.error('Authentication required');
      return;
    }

    try {
      await deleteTranslationAction(translation.locale, session.accessToken);
      toast.success(`${localeInfo?.name} translation deleted successfully`);
    } catch (error) {
      toast.error(`Failed to delete ${localeInfo?.name} translation`);
      throw error; // important
    }
  };

  const handleEdit = async (values: AboutTranslationFormValues) => {
    if (!session?.accessToken) {
      toast.error('Authentication required');
      return;
    }

    startTransition(async () => {
      try {
        const formData = new FormData();
        for (const [key, value] of Object.entries(values)) {
          if (value === undefined) continue;

          if (value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, String(value));
          }
        }
        await editTranslationAction(formData, session.accessToken);
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
          <DialogAboutTranslationEdit
            translation={translation}
            localeInfo={localeInfo}
            handleEdit={handleEdit}
            isLoading={isPending}
          />

          <ConfirmDialog
            title="Delete Translation"
            confirmLabel="Delete"
            loading={isPending}
            onConfirm={() =>
              startTransition(async () => {
                await handleDelete();
              })
            }
            trigger={
              <button className="p-2 hover:text-red-600">
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
          <span className="font-medium text-foreground">Title:</span>
          <p className="mt-1 text-muted-foreground">{translation.title}</p>
        </div>

        <div>
          <span className="font-medium text-foreground">Tagline:</span>
          <p className="mt-1 text-muted-foreground">{translation.tagline || '-'}</p>
        </div>

        <div className="md:col-span-2 text-foreground">
          <span className="font-medium text-foreground">Biography:</span>
          <p className="mt-1 text-muted-foreground line-clamp-3">{translation.bio}</p>
        </div>

        {translation.cv && (
          <div>
            <span className="font-medium text-foreground">Resume:</span>
            <button
              className="flex items-center gap-2 mt-1"
              onClick={() => handleDownload(translation.locale)}
            >
              <DownloadIcon className="w-4 h-4 text-gray-500" />
              <span className="text-blue-600 hover:text-blue-700 text-sm hover:underline">
                Download
              </span>
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
