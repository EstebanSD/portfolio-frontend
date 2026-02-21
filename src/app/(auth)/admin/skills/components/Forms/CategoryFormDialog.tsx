'use client';

import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categoryFormSchema, type CategoryFormValues } from '../../validations';
import { Button, DialogClose, Form } from '@/components/ui';
import { FormInput, Spinner } from '@/components/common';

interface CategoryFormDialogProps {
  onSubmit: (values: CategoryFormValues) => Promise<void>;
  isLoading: boolean;
}

export function CategoryFormDialog({ onSubmit, isLoading }: CategoryFormDialogProps) {
  const submitRef = useRef<HTMLButtonElement | null>(null);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      key: '',
      order: 0,
    },
  });

  const handleSubmit = async (values: CategoryFormValues) => {
    await onSubmit(values);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 p-2">
          <FormInput required name="key" label="Key" />

          <FormInput name="order" label="Order" />

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
          <Spinner loading={isLoading} text="Create Category" loadingText="Creating..." />
        </Button>
      </div>
    </>
  );
}
