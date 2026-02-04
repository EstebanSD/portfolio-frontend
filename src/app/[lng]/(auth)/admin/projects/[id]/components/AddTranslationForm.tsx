'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';
import { Session } from 'next-auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BriefcaseIcon, FileTextIcon, GlobeIcon, SaveIcon, XIcon } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle, Form } from '@/components/ui';
import { FormInput, FormSelect, FormTextArea, Spinner } from '@/components/common';
import { projectTranslationFormSchema, type ProjectTranslationFormValues } from '../../validations';
import { addNewTranslationAction } from '../../actions';

interface Props {
  projectId: string;
  session: Session | null;
  cancelNew: () => void;
  locales: Array<{ code: string; name: string; flag: string }>;
}
export function AddTranslationForm({ projectId, cancelNew, locales, session }: Props) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<ProjectTranslationFormValues>({
    resolver: zodResolver(projectTranslationFormSchema),
    defaultValues: {
      locale: '',
      summary: '',
      description: '',
    },
  });

  async function onSubmit(values: ProjectTranslationFormValues) {
    if (!session?.accessToken) {
      toast.error('Authentication required');
      return;
    }

    startTransition(async () => {
      try {
        await addNewTranslationAction(projectId, values, session.accessToken);

        toast.success(`${values.locale.toUpperCase()} translation added successfully`);
        form.reset();
        cancelNew();
      } catch (error) {
        toast.error(`Failed to add ${values.locale.toUpperCase()} translation`);
        console.error('Submit error:', error);
      }
    });
  }

  const localesOptions = locales.map((loc) => ({ value: loc.code, label: loc.name }));

  return (
    <Card className="border-blue-200 bg-blue-50 dark:border-gray-50 dark:bg-gray-900">
      <CardHeader>
        <CardTitle>Add New Translation</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormSelect
              required
              name="locale"
              label={'Language'}
              labelIcon={<GlobeIcon className="w-4 h-4" />}
              options={localesOptions}
            />

            <FormInput
              required
              name="summary"
              label={'Summary'}
              labelIcon={<BriefcaseIcon className="w-4 h-4" />}
              placeholder="Write a short description"
            />

            <FormTextArea
              required
              name="description"
              label={'Description'}
              labelIcon={<FileTextIcon className="w-4 h-4" />}
              placeholder="Write a full description"
              rows={4}
              maxLength={500}
            />

            <div className="flex gap-2">
              <Button type="submit" variant={'success'} disabled={isPending}>
                <Spinner
                  loading={isPending}
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
