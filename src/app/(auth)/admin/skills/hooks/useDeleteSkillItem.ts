'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { deleteSkillItemAction } from '../actions';

export function useDeleteSkillItem(onSuccess?: () => void) {
  const [isEliminating, setIsEliminating] = useState(false);

  const deleteSkillItem = async (id: string) => {
    setIsEliminating(true);

    try {
      await deleteSkillItemAction(id);
      toast.success('Skill item successfully deleted');
      onSuccess?.();
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to delete skill item';
      toast.error(errorMsg);
      console.error('Delete skill item error:', error);
    } finally {
      setIsEliminating(false);
    }
  };

  return {
    deleteSkillItem,
    isEliminating,
  };
}
