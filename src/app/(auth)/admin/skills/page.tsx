import { Metadata } from 'next';
import { fetchSkillCategoriesAction } from './actions';
import { SkillsManagement } from './components/SkillsManagement';

export const metadata: Metadata = {
  title: 'Skills Management',
};

export default async function page() {
  const result = await fetchSkillCategoriesAction();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Skills Management</h1>
        <p className="text-muted-foreground">Manage your skill categories and their items.</p>
      </div>

      {!result.success ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
          <p className="text-red-500">{result.message}</p>
        </div>
      ) : (
        <SkillsManagement categories={result.data} />
      )}
    </div>
  );
}
