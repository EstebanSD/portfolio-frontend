'use client';

import { useEffect, useRef, useTransition } from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, ImageIcon, MapPinIcon, TagIcon, UserIcon } from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
} from '../ui';
import { FormImageUpload, FormInput, FormTagsInput, Spinner } from '../common';
import { aboutGeneralFormSchema, type AboutGeneralFormValues } from '@/lib/validations';
import { updateGeneralInfoAction } from '@/actions/about';

interface Props {
  initialData?: Partial<AboutGeneralFormValues>;
}

export function AboutGeneralForm({ initialData = {} }: Props) {
  const { data: session } = useSession();
  const submitRef = useRef<HTMLButtonElement | null>(null);
  const [isPending, startTransition] = useTransition();

  const isUpdate = Boolean(initialData?.fullName);

  const form = useForm<AboutGeneralFormValues>({
    resolver: zodResolver(aboutGeneralFormSchema),
    defaultValues: {
      fullName: initialData?.fullName || '',
      birthYear: initialData?.birthYear || '',
      location: initialData?.location || '',
      positioningTags: initialData?.positioningTags || [],
      image: undefined,
    },
  });

  async function onSubmit(values: AboutGeneralFormValues) {
    if (!session?.accessToken) {
      // TODO toast.error('Authentication required');
      return;
    }

    startTransition(async () => {
      try {
        const formData = new FormData();

        formData.append('_isUpdate', isUpdate.toString());

        for (const [key, value] of Object.entries(values)) {
          if (value === undefined) continue;

          if (value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, Array.isArray(value) ? JSON.stringify(value) : String(value));
          }
        }

        await updateGeneralInfoAction(formData, session.accessToken);

        // TODO toast.success('say something');
        form.reset(values);
      } catch (error) {
        // const errorMessage =
        //   error instanceof Error ? error.message : 'An unexpected error occurred';
        // TODO toast.error(errorMessage);
        console.error('Submit error:', error);
      }
    });
  }

  useEffect(() => {
    if (initialData) {
      form.reset({
        fullName: initialData.fullName || '',
        birthYear: initialData.birthYear || '',
        location: initialData.location || '',
        positioningTags: initialData.positioningTags || [],
        image: undefined,
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
            <FormInput
              control={form.control}
              name="fullName"
              label={'Full Name'}
              labelIcon={<UserIcon className="w-4 h-4" />}
              placeholder="Sergio García Maroto"
              autoComplete="name"
            />

            <FormInput
              control={form.control}
              name="birthYear"
              label={'Birth Year'}
              labelIcon={<CalendarIcon className="w-4 h-4" />}
              placeholder="1967"
              autoComplete="bday-year"
            />

            <FormInput
              control={form.control}
              name="location"
              label={'Location'}
              labelIcon={<MapPinIcon className="w-4 h-4" />}
              placeholder="Madrid, Spain"
              autoComplete="street-address"
            />

            <FormTagsInput
              control={form.control}
              name="positioningTags"
              label="Tags"
              labelIcon={<TagIcon className="h-4 w-4" />}
              placeholder="Type and press Enter or comma"
            />

            <FormImageUpload
              control={form.control}
              name="image"
              label="Profile Image"
              labelIcon={<ImageIcon className="h-4 w-4" />}
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
