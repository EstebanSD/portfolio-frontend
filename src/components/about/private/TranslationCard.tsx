'use client';

import { useTransition } from 'react';
import { Session } from 'next-auth';
import { DownloadIcon } from 'lucide-react';
import { deleteTranslationAction, editTranslationAction } from '@/actions/about';
import { AboutTranslation } from '@/types';
import { AVAILABLE_LOCALES } from '@/lib/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { DialogTranslationDelete } from './DialogTranslationDelete';
import { DialogTranslationEdit } from './DialogTranslationEdit';
import { type AboutTranslationFormValues } from '@/lib/validations';

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
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
export function TranslationCard({ session, translation }: Props) {
  const [isPending, startTransition] = useTransition();
  const localeInfo = getLocaleInfo(translation.locale);

  const handleDelete = async () => {
    if (!session?.accessToken) {
      // TODO toast.error('Authentication required');
      return;
    }

    startTransition(async () => {
      try {
        await deleteTranslationAction(translation.locale, session.accessToken);
        // TODO toast.success(`${localeInfo?.name} translation deleted successfully`);
      } catch (error) {
        // TODO toast.error(`Failed to delete ${localeInfo?.name} translation`);
        console.error('Delete error:', error);
      }
    });
  };

  const handleEdit = async (values: AboutTranslationFormValues) => {
    if (!session?.accessToken) {
      // TODO toast.error('Authentication required');
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
        // TODO toast.success(`${localeInfo?.name} translation edited successfully`);
      } catch (error) {
        // const errorMessage =
        //   error instanceof Error ? error.message : 'An unexpected error occurred';
        // TODO toast.error(`Failed to edit ${localeInfo?.name} translation`);
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
          <DialogTranslationEdit
            translation={translation}
            localeInfo={localeInfo}
            handleEdit={handleEdit}
            isLoading={isPending}
          />

          <DialogTranslationDelete
            name={localeInfo?.name}
            handleDelete={handleDelete}
            isLoading={isPending}
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
