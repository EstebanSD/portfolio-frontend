import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skills Management',
};

export default function page() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Skills Management</h1>
        <p className="text-muted-foreground">
          Take charge of your skills and keep them well organized.
        </p>
      </div>
    </div>
  );
}
