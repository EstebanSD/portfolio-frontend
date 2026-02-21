'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { cn } from '@/lib/shadcn/utils';
import { CategoriesWithTranslations } from '@/types-portfolio/skill';
import { formatKey } from '../../utils/formatKey';
import { ButtonAddCategory } from '../ButtonAddCategory';

interface DesktopControlProps {
  categories: CategoriesWithTranslations[];
  selected?: string;
  onSelect: (value: string) => void;
}
export function DesktopControl({ categories, selected = '', onSelect }: DesktopControlProps) {
  const categoryOptions = categories.map((c) => ({
    value: c._id,
    label: formatKey(c.key),
  }));

  return (
    <Card className="min-w-60">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Categories</span>

          <ButtonAddCategory withText={false} />
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col">
          {categoryOptions.map((option, idx) => {
            return (
              <button
                key={option.value + idx}
                className={cn(
                  selected === option.value
                    ? 'bg-blue-100 border-l-blue-600 rounded-l-xs rounded-r-md'
                    : 'hover:bg-blue-50 rounded-md border-l-transparent',
                  'w-full mb-0.5 p-2 text-left border-l-4',
                )}
                onClick={() => onSelect(option.value)}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
