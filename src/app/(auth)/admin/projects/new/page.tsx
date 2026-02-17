import { Metadata } from 'next';
import { ProjectForm } from './components/ProjectForm';

export const metadata: Metadata = {
  title: 'Add Project',
};

export default function page() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Create a new project.</h1>
      <ProjectForm />
    </div>
  );
}
