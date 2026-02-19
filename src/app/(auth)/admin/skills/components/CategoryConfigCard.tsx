'use client';

import { Trash2Icon } from 'lucide-react';
import { ConfirmDialog } from '@/components/common';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
} from '@/components/ui';
import type { CategoriesWithTranslations } from '@/types-portfolio/skill';
import { useDeleteCategory } from '../hooks/useDeleteCategory';
import { formatKey } from '../utils/formatKey';

interface CategoryConfigCardProps {
  category: CategoriesWithTranslations;
}
export function CategoryConfigCard({ category }: CategoryConfigCardProps) {
  const { deleteCategory, isEliminating } = useDeleteCategory();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid grid-cols-2 gap-2">
          <Input name="key" value={category.key} disabled />

          <Input name="order" />
        </form>
      </CardContent>

      <CardFooter>
        <ConfirmDialog
          title="Delete Experience"
          confirmLabel="Delete"
          loading={isEliminating}
          onConfirm={() => deleteCategory(category._id)}
          trigger={
            <Button variant={'outline'} className="border-destructive">
              <Trash2Icon className="w-4 h-4 text-destructive" />
            </Button>
          }
          description={
            <>
              Are you sure you want to delete <strong>{formatKey(category.key)}</strong>?
              <br />
              If the category has translations, they will also be deleted.
              <br />
              But if it has elements (skills), an error will occur.
              <br />
              <span className="text-destructive">This action cannot be undone.</span>
            </>
          }
        />
      </CardFooter>
    </Card>
  );
}
