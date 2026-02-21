'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { GeneralExperienceFormValues } from '../../validations';
import { updateGeneralInfoAction } from '../../actions';

export function useUpdateGeneral() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const submit = useCallback(
    async (id: string, values: GeneralExperienceFormValues) => {
      setIsSubmitting(true);

      try {
        await updateGeneralInfoAction(id, values);
        toast.success('Professional Experience successfully updated');
        router.refresh();
      } catch (error) {
        toast.error('Failed to update experience');
        console.error('Update general experience error:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [router],
  );

  return {
    submit,
    isSubmitting,
  };
}
