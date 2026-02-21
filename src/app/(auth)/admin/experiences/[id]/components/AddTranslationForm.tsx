'use client';

import { useForm } from 'react-hook-form';
import { Locale } from '@/lib/i18n';
import { zodResolver } from '@hookform/resolvers/zod';
import { translationFormSchema, type TranslationFormValues } from '../validations';
import { Button, Card, CardContent, CardHeader, CardTitle, Form } from '@/components/ui';
import { FormInput, FormSelect, FormTextArea, Spinner } from '@/components/common';
import { BriefcaseIcon, FileTextIcon, GlobeIcon, SaveIcon, XIcon } from 'lucide-react';

interface Props {
  experienceId: string;
  cancelNew: () => void;
  onSubmit: (id: string, values: TranslationFormValues) => Promise<void>;
  locales: Locale[];
  loading: boolean;
}
export function AddTranslationForm({ experienceId, cancelNew, onSubmit, locales, loading }: Props) {
  const form = useForm<TranslationFormValues>({
    resolver: zodResolver(translationFormSchema),
    defaultValues: {
      locale: '',
      position: '',
      description: '',
    },
  });

  const localesOptions = locales.map((loc) => ({ value: loc.code, label: loc.name }));

  const handleSubmit = async (values: TranslationFormValues) => {
    await onSubmit(experienceId, values);
  };

  return (
    <Card className="border-blue-200 bg-blue-50 dark:border-gray-50 dark:bg-gray-900">
      <CardHeader>
        <CardTitle>Add New Translation</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormSelect
              required
              name="locale"
              label={'Language'}
              labelIcon={<GlobeIcon className="w-4 h-4" />}
              options={localesOptions}
            />

            <FormInput
              required
              name="position"
              label={'Position'}
              labelIcon={<BriefcaseIcon className="w-4 h-4" />}
              placeholder="Teach lead developer"
            />

            <FormTextArea
              name="description"
              label={'Description'}
              labelIcon={<FileTextIcon className="w-4 h-4" />}
              placeholder="Write a description"
              rows={4}
              maxLength={2000}
            />

            <div className="flex gap-2">
              <Button type="submit" variant={'success'} disabled={loading}>
                <Spinner
                  loading={loading}
                  text={'Save Translation'}
                  loadingText={'Saving...'}
                  icon={<SaveIcon className="h-4 w-4" aria-hidden="true" />}
                />
              </Button>
              <Button variant="outline" onClick={cancelNew}>
                <XIcon className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
