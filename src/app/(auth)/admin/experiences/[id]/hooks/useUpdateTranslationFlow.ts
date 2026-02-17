'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { ExperienceTranslation } from '@/types-portfolio/experience';
import type { TranslationFormValues } from '../validations';
import { updateTranslationAction } from '../actions';

function useUpdateTranslation() {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const updateTranslation = useCallback(
    async (id: string, values: TranslationFormValues) => {
      setIsUpdating(true);

      try {
        await updateTranslationAction(id, values);
        toast.success('Translation Experience successfully updated');
        router.refresh();
      } catch (error) {
        toast.error('Failed to update translation experience');
        console.error('Update translation experience error:', error);
      } finally {
        setIsUpdating(false);
      }
    },
    [router],
  );

  return {
    updateTranslation,
    isUpdating,
  };
}

export function useUpdateTranslationFlow(experienceId: string, translation: ExperienceTranslation) {
  const [open, setOpen] = useState(false);
  const { updateTranslation, isUpdating } = useUpdateTranslation();

  const confirm = async (values: TranslationFormValues) => {
    await updateTranslation(experienceId, values);
    setOpen(false);
  };

  return {
    open,
    setOpen,
    confirm,
    isUpdating,
    defaultValues: {
      locale: translation.locale,
      position: translation.position,
      description: translation.description ?? '',
    },
  };
}
