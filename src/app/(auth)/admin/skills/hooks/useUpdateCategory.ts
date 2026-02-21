'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import type { UpdateCategoryCleanRequest } from '../validations';
import { updateCategoryAction } from '../actions';

export function useUpdateCategory() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const updateCategory = async (id: string, values: UpdateCategoryCleanRequest) => {
    setIsSubmitting(true);

    try {
      await updateCategoryAction(id, values);
      toast.success('Category successfully updated');
      router.refresh();
    } catch (error) {
      toast.error('Failed to update category');
      console.error('Update category error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    updateCategory,
    isSubmitting,
  };
}
