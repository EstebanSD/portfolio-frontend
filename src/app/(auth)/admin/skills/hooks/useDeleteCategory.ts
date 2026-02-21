'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deleteCategoryAction } from '../actions';

export function useDeleteCategory() {
  const [isEliminating, setIsEliminating] = useState(false);
  const router = useRouter();

  const deleteCategory = async (id: string) => {
    setIsEliminating(true);

    try {
      await deleteCategoryAction(id);
      toast.success('Category successfully deleted');
      router.refresh();
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to delete category';
      toast.error(errorMsg);
      console.error('Delete category error:', error);
    } finally {
      setIsEliminating(false);
    }
  };

  return {
    deleteCategory,
    isEliminating,
  };
}
