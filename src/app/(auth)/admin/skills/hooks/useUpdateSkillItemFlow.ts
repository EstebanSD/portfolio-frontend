'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import type { SkillItemFormValues } from '../validations';
import { updateSkillItemAction } from '../actions';

function useUpdateSkillItem() {
  const [isLoading, setIsLoading] = useState(false);

  const updateSkillItem = async (id: string, values: SkillItemFormValues) => {
    setIsLoading(true);

    try {
      await updateSkillItemAction(id, values);
      toast.success('Skill item successfully added');
      return true;
    } catch (error) {
      toast.error('Failed to add skill item');
      console.error('Add skill item error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateSkillItem,
    isLoading,
  };
}

export function useUpdateSkillItemFlow(onSuccess?: () => void) {
  const [open, setOpen] = useState(false);
  const { updateSkillItem, isLoading } = useUpdateSkillItem();

  const confirm = async (id: string, values: SkillItemFormValues) => {
    const success = await updateSkillItem(id, values);

    if (success) {
      onSuccess?.();
      setOpen(false);
    }
  };

  return {
    open,
    setOpen,
    confirm,
    isLoading,
  };
}
