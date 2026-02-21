'use client';

import { Card, CardContent, CardHeader, CardTitle, Skeleton } from '@/components/ui';
import type { CategoriesWithTranslations } from '@/types-portfolio/skill';
import { useSkillItemsByCategory } from '../hooks/useSkillItemsByCategory';
import { ItemCard } from './ItemCard';
import { ButtonAddSkillItem } from './ButtonAddSkillItem';

interface SkillsPanelProps {
  category: CategoriesWithTranslations;
}
export function SkillsPanel({ category }: SkillsPanelProps) {
  const { items, isLoading, refetch } = useSkillItemsByCategory(category._id);

  return (
    <Card className="w-full gap-0 p-0">
      <CardHeader className="p-6 gap-0">
        <CardTitle className="flex items-center justify-between">
          <span>Skills</span>

          <ButtonAddSkillItem categoryId={category._id} onSuccess={refetch} />
        </CardTitle>
      </CardHeader>

      <CardContent className="h-full border-t p-6">
        {isLoading ? (
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-32 rounded-lg" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="h-full rounded-lg border border-dashed border-gray-300">
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500">There are no skills available yet.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(128px,1fr))] gap-2">
            {items.map((i) => (
              <ItemCard key={i._id} item={i} onSuccess={refetch} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
