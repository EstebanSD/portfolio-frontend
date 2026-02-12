'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { contactFormSchema, ContactFormValues } from '../../validations';
import { Button, Form } from '@/components/ui';
import { FormInput, Spinner } from '@/components/common';
import { useUpdateContact } from './useUpdateContact';

const EMPTY_VALUES: ContactFormValues = {
  email: '',
  phone: '',
  socialLinks: {
    github: '',
    linkedin: '',
    twitter: '',
    instagram: '',
    website: '',
  },
};

const SOCIAL_FIELDS = [
  { key: 'github', label: 'GitHub', placeholder: 'https://github.com/username' },
  { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/username' },
  { key: 'twitter', label: 'Twitter', placeholder: 'https://twitter.com/username' },
  { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/username' },
  { key: 'website', label: 'Website', placeholder: 'https://yourdomain.com' },
];

interface ContactFormProps {
  initialValues?: ContactFormValues;
}
export function ContactForm({ initialValues }: ContactFormProps) {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: initialValues ?? EMPTY_VALUES,
  });

  const { submit, isSubmitting } = useUpdateContact();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
        <FormInput
          required
          name="email"
          label="Email"
          placeholder="example@example.com"
          type="email"
          autoComplete="email"
        />

        <FormInput
          name="phone"
          label="Phone"
          placeholder="+54358XXXXXXX"
          type="tel"
          autoComplete="tel"
        />

        <SocialLinksFields />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          <Spinner loading={isSubmitting} text="Save" loadingText="Saving" />
        </Button>
      </form>
    </Form>
  );
}

function SocialLinksFields() {
  return (
    <fieldset>
      <legend className="text-sm font-medium">Social Links</legend>

      <div className="mt-4 space-y-4">
        {SOCIAL_FIELDS.map(({ key, label, placeholder }) => (
          <FormInput
            key={key}
            name={`socialLinks.${key}`}
            label={label}
            placeholder={placeholder}
          />
        ))}
      </div>
    </fieldset>
  );
}
