'use client';

import { useState } from 'react';
import type { ExperienceWithTranslations } from '@/types-portfolio/experience';
import { useDeleteExperience } from './useDeleteExperience';

export function useDeleteExperienceFlow() {
  const [selected, setSelected] = useState<ExperienceWithTranslations | null>(null);
  const [open, setOpen] = useState(false);
  const { deleteExperience, isLoading } = useDeleteExperience();

  const requestDelete = (experience: ExperienceWithTranslations) => {
    setSelected(experience);
    setOpen(true);
  };

  const confirmDelete = async () => {
    if (!selected) return;
    await deleteExperience(selected._id);
    setOpen(false);
    setSelected(null);
  };

  return {
    selected,
    open,
    setOpen,
    requestDelete,
    confirmDelete,
    isLoading,
  };
}
