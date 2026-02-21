'use client';

import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardContent, CardFooter, Form } from '@/components/ui';
import {
  FormDatePicker,
  FormImageUpload,
  FormInput,
  FormRadioGroup,
  FormSwitch,
  FormTagsInput,
  Spinner,
} from '@/components/common';
import { generalExperienceFormSchema, type GeneralExperienceFormValues } from '../../validations';
import { useCreateExperience } from '../hooks/useCreateExperience';

export function ExperienceForm() {
  const submitRef = useRef<HTMLButtonElement | null>(null);
  const { submit, isSubmitting } = useCreateExperience();

  const form = useForm<GeneralExperienceFormValues>({
    resolver: zodResolver(generalExperienceFormSchema),
    defaultValues: {
      companyName: '',
      type: 'contract',
      location: '',
      startDate: '',
      endDate: '',
      technologies: [],
      ongoing: false,
      logo: undefined,
    },
  });

  const watchedStatus = form.watch('ongoing');

  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="grid grid-cols-1 gap-6">
            <FormInput
              required
              name={'companyName'}
              label={'Company Name'}
              placeholder={'Company'}
            />

            <div className="grid grid-cols-2 gap-6">
              <FormRadioGroup
                required
                name={'type'}
                label={'Type'}
                options={[
                  { label: 'Freelance', value: 'freelance' },
                  { label: 'Employment', value: 'employment' },
                  { label: 'Internship', value: 'internship' },
                  { label: 'Volunteering', value: 'volunteering' },
                  { label: 'Contract', value: 'contract' },
                ]}
              />

              <div className="grid gap-4">
                <FormInput name={'location'} label={'Location'} placeholder={'Some where'} />

                <div className="h-fit">
                  <FormSwitch required name={'ongoing'} label={'Ongoing'} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormDatePicker
                required
                name="startDate"
                label="Start Date"
                placeholder="Select a Start Date"
                fromYear={2000}
              />

              <FormDatePicker
                required={!watchedStatus}
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

            <FormImageUpload
              maxFiles={1}
              name="logo"
              label="Company Logo"
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
          variant={'success'}
          onClick={() => submitRef.current?.click()}
          disabled={isSubmitting}
        >
          <Spinner loading={isSubmitting} text={'Save changes'} loadingText={'Saving...'} />
        </Button>
      </CardFooter>
    </Card>
  );
}
