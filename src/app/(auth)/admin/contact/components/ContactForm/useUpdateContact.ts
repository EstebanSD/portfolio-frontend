import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import type { ContactFormValues } from '../../validations';
import { updateContactAction } from '../../actions';

function normalizeContact(values: ContactFormValues): ContactFormValues {
  const hasSocialLinks = Object.values(values.socialLinks ?? {}).some(Boolean);

  return {
    ...values,
    socialLinks: hasSocialLinks ? values.socialLinks : undefined,
  };
}

export function useUpdateContact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = useCallback(async (values: ContactFormValues) => {
    setIsSubmitting(true);

    try {
      const cleanedData = normalizeContact(values);

      const { message } = await updateContactAction(cleanedData);

      toast.success(message);
    } catch (error) {
      toast.error('Failed to update contact information');
      console.error('Update contact error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return {
    submit,
    isSubmitting,
  };
}
