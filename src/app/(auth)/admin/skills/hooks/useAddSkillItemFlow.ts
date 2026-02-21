'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { type SkillItemFormValues } from '../validations';
import { addSkillItemAction } from '../actions';

function useAddSkillItem() {
  const [isLoading, setIsLoading] = useState(false);

  const addSkillItem = async (id: string, values: SkillItemFormValues) => {
    setIsLoading(true);

    try {
      await addSkillItemAction(id, values);
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
    addSkillItem,
    isLoading,
  };
}

export function useAddSkillItemFlow(onSuccess?: () => void) {
  const [open, setOpen] = useState(false);
  const { addSkillItem, isLoading } = useAddSkillItem();

  const confirm = async (id: string, values: SkillItemFormValues) => {
    const success = await addSkillItem(id, values);

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
