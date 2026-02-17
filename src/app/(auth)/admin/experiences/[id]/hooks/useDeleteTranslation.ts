'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Language } from '@/lib/i18n';
import { deleteTranslationAction } from '../actions';

export function useDeleteTranslation() {
  const [isEliminating, setIsEliminating] = useState(false);
  const router = useRouter();

  const deleteTranslation = useCallback(
    async (id: string, code: Language) => {
      setIsEliminating(true);

      try {
        await deleteTranslationAction(id, code);
        toast.success('Translation Experience successfully deleted');
        router.refresh();
      } catch (error) {
        toast.error('Failed to delete translation');
        console.error('Delete translation experience error:', error);
      } finally {
        setIsEliminating(false);
      }
    },
    [router],
  );

  return {
    deleteTranslation,
    isEliminating,
  };
}
