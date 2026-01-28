'use client';

import { useRef, useTransition } from 'react';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardContent, CardFooter, Form } from '@/components/ui';
import {
  FormDatePicker,
  FormImageUpload,
  FormInput,
  FormRadioGroup,
  FormTagsInput,
  Spinner,
} from '@/components/common';
import { projectFormSchema, ProjectFormValues } from '@/lib/validations';
import { addNewProjectAction } from '@/actions/projects';

export function ProjectForm() {
  const { data: session } = useSession();
  const submitRef = useRef<HTMLButtonElement | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: '',
      type: 'personal',
      status: 'completed',
      startDate: '',
      endDate: '',
      technologies: [],
      links: {
        github: '',
        website: '',
      },
      files: [],
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

        await addNewProjectAction(cleanData, session.accessToken);

        toast.success('Project added successfully');
        form.reset();
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'An unexpected error occurred';
        if (errorMessage.includes('409')) {
          toast.error('Project with this title already exists');
        } else {
          toast.error(errorMessage);
        }
        console.error('Submit error:', error);
      }
    });
  }

  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 lg:gap-6">
            <FormInput required name={'title'} label={'Title'} placeholder={'Project Title'} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              <FormRadioGroup
                required
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
                name={'status'}
                label={'Status'}
                options={[
                  { label: 'Completed', value: 'completed' },
                  { label: 'In Progress', value: 'in_progress' },
                  { label: 'Paused', value: 'paused' },
                ]}
              />

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
        <Button
          type={'submit'}
          variant={'success'}
          onClick={() => submitRef.current?.click()}
          disabled={isPending}
        >
          <Spinner loading={isPending} text={'Save changes'} loadingText={'Saving...'} />
        </Button>
      </CardFooter>
    </Card>
  );
}
