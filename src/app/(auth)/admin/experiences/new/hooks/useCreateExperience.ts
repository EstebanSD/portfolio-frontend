'use client';

import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import type { GeneralExperienceFormValues } from '../../validations';
import { createExperienceAction } from '../../actions';

export function useCreateExperience() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = useCallback(async (values: GeneralExperienceFormValues) => {
    setIsSubmitting(true);

    try {
      await createExperienceAction(values);
      toast.success('Professional Experience successfully created');
    } catch (error) {
      toast.error('Failed to create experience');
      console.error('Create experience error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return {
    submit,
    isSubmitting,
  };
}
