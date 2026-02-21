import { SelectFilter } from '@/components/common';
import { CategoriesWithTranslations } from '@/types-portfolio/skill';
import { formatKey } from '../../utils/formatKey';
import { ButtonAddCategory } from '../ButtonAddCategory';

interface MobileControlProps {
  categories: CategoriesWithTranslations[];
  selected?: string;
  onSelect: (value: string) => void;
}
export function MobileControl({ categories, selected = '', onSelect }: MobileControlProps) {
  const categoryOptions = categories.map((c) => ({
    value: c._id,
    label: formatKey(c.key),
  }));

  return (
    <div className="px-0.5 flex items-center justify-between">
      <SelectFilter
        label={'Category'}
        placeholder={'Select a category'}
        options={categoryOptions}
        value={selected}
        onValueChange={(value) => onSelect(value)}
        className="flex space-x-2"
      />

      <ButtonAddCategory />
    </div>
  );
}
