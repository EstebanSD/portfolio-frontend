'use client';

import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, DialogClose, Form } from '@/components/ui';
import { FormInput, FormSelect, Spinner } from '@/components/common';
import type { Locale } from '@/lib/i18n';
import { translationFormSchema, type TranslationFormValues } from '../../validations';
import { FileTextIcon, GlobeIcon } from 'lucide-react';

interface AddTranslationFormDialogProps {
  onSubmit: (values: TranslationFormValues) => Promise<void>;
  locales: Locale[];
  isLoading: boolean;
}

export function AddTranslationFormDialog({
  onSubmit,
  locales,
  isLoading,
}: AddTranslationFormDialogProps) {
  const submitRef = useRef<HTMLButtonElement | null>(null);

  const localesOptions = locales.map((loc) => ({ value: loc.code, label: loc.name }));

  const form = useForm<TranslationFormValues>({
    resolver: zodResolver(translationFormSchema),
    defaultValues: {
      locale: '',
      name: '',
    },
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-2">
          <FormSelect
            required
            name="locale"
            label={'Language'}
            labelIcon={<GlobeIcon className="w-4 h-4" />}
            options={localesOptions}
          />

          <FormInput name="name" label="Name" labelIcon={<FileTextIcon className="w-4 h-4" />} />

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
          <Spinner loading={isLoading} text="Add Translation" loadingText="Adding..." />
        </Button>
      </div>
    </>
  );
}
