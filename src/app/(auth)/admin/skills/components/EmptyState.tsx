import { EmptyStateCard } from '@/components/common';
import { ButtonAddCategory } from './ButtonAddCategory';

export function EmptyState() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex justify-end">
        <ButtonAddCategory />
      </div>

      <EmptyStateCard
        title="No categories available"
        description="Categories have not yet been loaded."
        iconName="search"
      />
    </div>
  );
}
