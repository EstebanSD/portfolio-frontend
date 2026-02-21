'use client';

import { PlusIcon } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import type { CategoriesWithTranslations } from '@/types-portfolio/skill';
import { useSkillItemsByCategory } from '../hooks/useSkillItemsByCategory';
import { ItemCard } from './ItemCard';

interface SkillsPanelProps {
  category: CategoriesWithTranslations;
}
export function SkillsPanel({ category }: SkillsPanelProps) {
  const { items, isLoading } = useSkillItemsByCategory(category._id);
  console.log(items);

  return (
    <Card className="w-full gap-0 p-0">
      <CardHeader className="p-6 gap-0">
        <CardTitle className="flex items-center justify-between">
          <span>Skills</span>

          <Button variant={'secondary'} className="cursor-pointer">
            <PlusIcon className="h-4 w-4 text-blue-600" />
            <span className="text-blue-600">Add Skill</span>
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="h-full border-t p-6">
        {isLoading ? (
          <>loading</>
        ) : items.length === 0 ? (
          <div className="h-full rounded-lg border border-dashed border-gray-300">
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500">There are no skills available yet.</p>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            {items.map((i) => (
              <ItemCard key={i._id} item={i} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
