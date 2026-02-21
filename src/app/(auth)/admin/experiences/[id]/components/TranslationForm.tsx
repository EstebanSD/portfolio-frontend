'use client';

import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { translationFormSchema, type TranslationFormValues } from '../validations';
import { Button, DialogClose, Form } from '@/components/ui';
import { FormInput, FormTextArea, Spinner } from '@/components/common';
import { BriefcaseIcon, FileTextIcon, GlobeIcon } from 'lucide-react';

interface TranslationFormProps {
  defaultValues: TranslationFormValues;
  onSubmit: (values: TranslationFormValues) => Promise<void>;
  isLoading: boolean;
}

export function TranslationForm({ defaultValues, onSubmit, isLoading }: TranslationFormProps) {
  const submitRef = useRef<HTMLButtonElement | null>(null);

  const form = useForm<TranslationFormValues>({
    resolver: zodResolver(translationFormSchema),
    defaultValues,
  });

  const handleSubmit = async (values: TranslationFormValues) => {
    await onSubmit(values);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 p-2">
          <FormInput
            disabled
            required
            name="locale"
            label="Language"
            labelIcon={<GlobeIcon className="w-4 h-4" />}
          />

          <FormInput
            required
            name="position"
            label="Position"
            labelIcon={<BriefcaseIcon className="w-4 h-4" />}
          />

          <FormTextArea
            name="description"
            label="Description"
            labelIcon={<FileTextIcon className="w-4 h-4" />}
            rows={4}
            maxLength={2000}
          />

          <button ref={submitRef} type="submit" className="hidden" />
        </form>
      </Form>

      <div className="flex gap-2 p-2 pt-4">
        <DialogClose asChild>
          <Button variant="outline" className="flex-1">
            Cancel
          </Button>
        </DialogClose>

        <Button
          variant="success"
          disabled={isLoading}
          onClick={() => submitRef.current?.click()}
          className="flex-1"
        >
          <Spinner loading={isLoading} text="Update Translation" loadingText="Updating..." />
        </Button>
      </div>
    </>
  );
}
