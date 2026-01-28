'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';
import { Session } from 'next-auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  BriefcaseIcon,
  FileIcon,
  FileTextIcon,
  GlobeIcon,
  MessageSquareDashedIcon,
  SaveIcon,
  XIcon,
} from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle, Form } from '@/components/ui';
import { FormFileUpload, FormInput, FormSelect, FormTextArea, Spinner } from '@/components/common';
import { addNewTranslationAction } from '@/actions/about';
import { aboutTranslationFormSchema, type AboutTranslationFormValues } from '@/lib/validations';

interface Props {
  session: Session | null;
  cancelNew: () => void;
  locales: Array<{ code: string; name: string; flag: string }>;
}
export function AddTranslationAboutForm({ cancelNew, locales, session }: Props) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<AboutTranslationFormValues>({
    resolver: zodResolver(aboutTranslationFormSchema),
    defaultValues: {
      locale: '',
      title: '',
      bio: '',
      tagline: '',
      cv: undefined,
    },
  });

  async function onSubmit(values: AboutTranslationFormValues) {
    if (!session?.accessToken) {
      toast.error('Authentication required');
      return;
    }

    startTransition(async () => {
      try {
        const formData = new FormData();
        for (const [key, value] of Object.entries(values)) {
          if (value === undefined) continue;

          if (value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, String(value));
          }
        }

        await addNewTranslationAction(formData, session.accessToken);

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
              name="title"
              label={'Title'}
              labelIcon={<BriefcaseIcon className="w-4 h-4" />}
              placeholder="Full Stack"
            />

            <FormInput
              name="tagline"
              label={'Tagline (Optional)'}
              labelIcon={<MessageSquareDashedIcon className="w-4 h-4" />}
              placeholder="A catchy tagline"
            />

            <FormTextArea
              required
              name={'bio'}
              label={'Biography'}
              labelIcon={<FileTextIcon className="w-4 h-4" />}
              placeholder="Write your biography"
              rows={4}
              maxLength={500}
            />

            <FormFileUpload
              name="cv"
              label={'Curriculum Vitae'}
              labelIcon={<FileIcon className="h-4 w-4" />}
              accept="application/*"
              maxSize={5}
              showPreview={true}
            />

            <div className="flex gap-2">
              <Button type="submit" variant={'success'} disabled={isPending}>
                <Spinner
                  loading={isPending}
                  text={'Save Translation'}
                  loadingText={'Saving...'}
                  icon={<SaveIcon className="h-4 w-4" />}
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
