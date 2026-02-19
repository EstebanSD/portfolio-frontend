'use client';

import { useState } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import type { CategoriesWithTranslations } from '@/types-portfolio/skill';
import { MobileControl } from './Controls/MobileControl';
import { DesktopControl } from './Controls/DesktopControl';
import { CategoryConfigCard } from './CategoryConfigCard';
import { SkillsPanel } from './SkillsPanel';
import { EmptyState } from './EmptyState';

interface SkillsManagementProps {
  categories: CategoriesWithTranslations[];
}
export function SkillsManagement({ categories }: SkillsManagementProps) {
  const isMobile = useIsMobile();
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);

  const selectedCategory = categories.find((c) => c._id === categoryId) ?? categories[0];

  const Control = isMobile ? MobileControl : DesktopControl;

  if (!selectedCategory) {
    return <EmptyState />;
  }

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 h-full">
        <Control categories={categories} selected={selectedCategory._id} onSelect={setCategoryId} />

        <SkillsPanel category={selectedCategory} isMobile={isMobile} />
      </div>

      <CategoryConfigCard category={selectedCategory} />
    </div>
  );
}
