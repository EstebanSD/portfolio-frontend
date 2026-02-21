import { Metadata } from 'next';
import { Suspense } from 'react';
import { fetchContactAction } from './actions';
import { ContactForm } from './components/ContactForm';
import { ContactFormSkeleton } from './components/ContactFormSkeleton';

export const metadata: Metadata = {
  title: 'Contact Management',
};

export default async function page() {
  const result = await fetchContactAction();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Contact Management</h1>
        <p className="text-muted-foreground">Take charge of your contact information.</p>
      </div>

      <div className="flex items-center justify-center">
        <div className="max-w-md w-full p-4 border rounded-2xl">
          <Suspense fallback={<ContactFormSkeleton />}>
            <ContactForm initialValues={result.data || undefined} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
