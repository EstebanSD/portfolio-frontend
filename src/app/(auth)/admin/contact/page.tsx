import { fetchContactAction } from './actions';
import { ContactForm } from './components/ContactForm';

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
          <ContactForm initialValues={result.data || undefined} />
        </div>
      </div>
    </div>
  );
}
