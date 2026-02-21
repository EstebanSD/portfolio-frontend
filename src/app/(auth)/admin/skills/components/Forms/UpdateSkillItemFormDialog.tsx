'use client';

import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, DialogClose, Form } from '@/components/ui';
import { FormImageUpload, FormInput, Spinner } from '@/components/common';
import { skillItemFormSchema, type SkillItemFormValues } from '../../validations';

interface UpdateSkillItemFormDialogProps {
  name: string;
  onSubmit: (values: SkillItemFormValues) => Promise<void>;
  isLoading: boolean;
}

export function UpdateSkillItemFormDialog({
  name,
  onSubmit,
  isLoading,
}: UpdateSkillItemFormDialogProps) {
  const submitRef = useRef<HTMLButtonElement | null>(null);

  const form = useForm<SkillItemFormValues>({
    resolver: zodResolver(skillItemFormSchema),
    defaultValues: {
      name,
      file: undefined,
    },
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-2">
          <FormInput required name="name" label="Name" />

          <FormImageUpload
            maxFiles={1}
            name="file"
            label="Icon"
            accept="image/jpeg,image/png,image/webp,image/svg+xml"
            showImagePreview={true}
            previewSize="sm"
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
          <Spinner loading={isLoading} text="Save" loadingText="Saving..." />
        </Button>
      </div>
    </>
  );
}
