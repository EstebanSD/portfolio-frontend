'use client';

import { PlusIcon } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import type { CategoriesWithTranslations } from '@/types-portfolio/skill';

interface SkillsPanelProps {
  category: CategoriesWithTranslations;
  isMobile: boolean;
}
export function SkillsPanel({ category, isMobile }: SkillsPanelProps) {
  return (
    <Card className="w-full gap-0 p-0">
      <CardHeader className="p-6 gap-0">
        <CardTitle className="flex items-center justify-between">
          <span>Skills</span>

          <Button variant={'secondary'}>
            {isMobile ? (
              <PlusIcon className="h-4 w-4 text-blue-600" />
            ) : (
              <>
                <PlusIcon className="mr-2 h-4 w-4 text-blue-600" />
                <span className="text-blue-600">Add Skill</span>
              </>
            )}
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="h-full border-t p-6">
        <div className="h-full rounded-lg border border-dashed border-gray-300">
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">There are no skills available yet.</p>
            <span>{category.key}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
