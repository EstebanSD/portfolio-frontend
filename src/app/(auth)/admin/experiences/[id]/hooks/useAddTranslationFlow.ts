'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { TranslationFormValues } from '../validations';
import { addNewTranslationAction } from '../actions';

function useAddTranslation() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const update = useCallback(
    async (id: string, values: TranslationFormValues) => {
      setIsLoading(true);

      try {
        await addNewTranslationAction(id, values);
        router.refresh();
        return { success: true };
      } catch (error) {
        return { success: false, error };
      } finally {
        setIsLoading(false);
      }
    },
    [router],
  );

  return {
    update,
    isLoading,
  };
}

export function useAddTranslationFlow() {
  const [open, setOpen] = useState(false);
  const { update, isLoading } = useAddTranslation();

  const confirmUpdate = async (id: string, values: TranslationFormValues) => {
    const result = await update(id, values);

    if (result.success) {
      toast.success('Translation successfully updated');
      setOpen(false);
    } else {
      toast.error('Failed to update translation');
    }
  };

  return {
    open,
    setOpen,
    confirmUpdate,
    isLoading,
  };
}
