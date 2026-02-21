'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { TranslationFormValues } from '../validations';
import { addTranslationAction } from '../actions';

function useAddTranslation() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const createTranslation = async (id: string, values: TranslationFormValues) => {
    setIsLoading(true);

    try {
      await addTranslationAction(id, values);
      toast.success('Translation successfully created');
      router.refresh();
    } catch (error) {
      toast.error('Failed to create translation');
      console.error('Create translation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createTranslation,
    isLoading,
  };
}

export function useAddTranslationFlow() {
  const [open, setOpen] = useState(false);
  const { createTranslation, isLoading } = useAddTranslation();

  const confirm = async (id: string, values: TranslationFormValues) => {
    await createTranslation(id, values);
    setOpen(false);
  };

  return {
    open,
    setOpen,
    confirm,
    isLoading,
  };
}
