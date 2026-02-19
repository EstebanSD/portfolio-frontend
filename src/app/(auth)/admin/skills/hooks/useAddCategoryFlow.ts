'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { CategoryFormValues } from '../validations';
import { createCategoryAction } from '../actions';

function useAddCategory() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const createCategory = async (values: CategoryFormValues) => {
    setIsLoading(true);

    try {
      await createCategoryAction(values);
      toast.success('Skill Category successfully created');
      router.refresh();
    } catch (error) {
      toast.error('Failed to create skill category');
      console.error('Create skill category error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createCategory,
    isLoading,
  };
}

export function useAddCategoryFlow() {
  const [open, setOpen] = useState(false);
  const { createCategory, isLoading } = useAddCategory();

  const confirm = async (values: CategoryFormValues) => {
    await createCategory(values);
    setOpen(false);
  };

  return {
    open,
    setOpen,
    confirm,
    isLoading,
  };
}
