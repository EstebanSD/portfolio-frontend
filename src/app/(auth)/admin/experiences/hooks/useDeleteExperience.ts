'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deleteExperienceAction } from '../actions';

export function useDeleteExperience() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const deleteExperience = useCallback(
    async (id: string) => {
      setIsLoading(true);

      try {
        await deleteExperienceAction(id);
        toast.success('Professional Experience successfully deleted');
        router.refresh();
      } catch (error) {
        toast.error('Failed to delete experience');
        console.error('Delete experience error:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [router],
  );

  return {
    deleteExperience,
    isLoading,
  };
}
