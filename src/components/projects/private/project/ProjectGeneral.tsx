'use client';

import { useEffect, useRef, useTransition } from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
} from '@/components/ui';
import {
  FormDatePicker,
  FormImageUpload,
  FormInput,
  FormRadioGroup,
  FormTagsInput,
  Spinner,
} from '@/components/common';
import { projectFormSchema, ProjectFormValues } from '@/lib/validations';
import { updateGeneralInfoAction } from '@/actions/projects';

interface Props {
  projectId: string;
  initialData?: Partial<ProjectFormValues>;
}

export function ProjectGeneral({ projectId, initialData = {} }: Props) {
  const { data: session } = useSession();
  const submitRef = useRef<HTMLButtonElement | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: initialData?.title || '',
      status: initialData?.status || 'completed',
      type: initialData?.type || 'personal',
      startDate: initialData?.startDate || '',
      endDate: initialData?.endDate || '',
      technologies: initialData?.technologies || [],
      links: {
        github: initialData?.links?.github || '',
        website: initialData?.links?.website || '',
      },
      files: undefined,
    },
  });

  const watchedStatus = form.watch('status');

  async function onSubmit(values: ProjectFormValues) {
    if (!session?.accessToken) {
      toast.error('Authentication required');
      return;
    }

    startTransition(async () => {
      try {
        const cleanData: ProjectFormValues = {
          title: values.title,
          type: values.type,
          status: values.status,
          startDate: values.startDate || undefined,
          endDate: values.endDate || undefined,
          technologies: values.technologies || [],
          links: {
            github: values.links?.github || undefined,
            website: values.links?.website || undefined,
          },
          files: values.files || [],
        };

        if (!cleanData.links?.github && !cleanData.links?.website) {
          cleanData.links = undefined;
        }

        await updateGeneralInfoAction(projectId, cleanData, session.accessToken);

        toast.success('General Information updated successfully');
        form.reset(values);
      } catch (error) {
        toast.error('Failed to update General Information');
        console.error('Submit error:', error);
      }
    });
  }

  useEffect(() => {
    if (initialData) {
      form.reset({
        title: initialData.title || '',
        status: initialData.status || 'completed',
        type: initialData.type || 'personal',
        startDate: initialData.startDate || '',
        endDate: initialData.endDate || '',
        technologies: initialData.technologies || [],
        links: {
          github: initialData.links?.github || '',
          website: initialData.links?.website || '',
        },
        files: undefined,
      });
    }
  }, [initialData, form]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Information</CardTitle>
        <CardDescription>
          Make changes to the general information here. Click Save when you&apos;re done.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <FormInput required name="title" label={'Title'} placeholder="Project Title" />

            <div className="grid grid-cols-2 gap-6">
              <FormRadioGroup
                required
                control={form.control}
                name={'type'}
                label={'Type'}
                options={[
                  { label: 'Personal', value: 'personal' },
                  { label: 'Company', value: 'company' },
                  { label: 'Freelance', value: 'freelance' },
                ]}
              />

              <FormRadioGroup
                required
                control={form.control}
                name={'status'}
                label={'Status'}
                options={[
                  { label: 'Completed', value: 'completed' },
                  { label: 'In Progress', value: 'in_progress' },
                  { label: 'Paused', value: 'paused' },
                ]}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormDatePicker
                required={watchedStatus === 'completed'}
                name="startDate"
                label="Start Date"
                placeholder="Select a Start Date"
                fromYear={2000}
              />

              <FormDatePicker
                required={watchedStatus === 'completed'}
                name="endDate"
                label="End Date"
                placeholder="Select a End Date"
                fromYear={2000}
              />
            </div>
            <FormTagsInput
              control={form.control}
              name="technologies"
              label="Technologies"
              placeholder="Type and press Enter or comma"
            />

            <FormInput
              name={'links.github'}
              label={'GitHub'}
              placeholder="https://github.com/user/repo"
            />

            <FormInput
              name={'links.website'}
              label={'Web Site'}
              placeholder="https://myproject.com"
            />

            <FormImageUpload
              multiple
              maxFiles={5}
              control={form.control}
              name="files"
              label="Project Images"
              accept="image/jpeg,image/png,image/webp"
              showImagePreview={true}
              previewSize="lg"
            />

            <button type="submit" ref={submitRef} className="hidden" />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button variant={'success'} onClick={() => submitRef.current?.click()} disabled={isPending}>
          <Spinner loading={isPending} text={'Save changes'} loadingText={'Saving...'} />
        </Button>
      </CardFooter>
    </Card>
  );
}
