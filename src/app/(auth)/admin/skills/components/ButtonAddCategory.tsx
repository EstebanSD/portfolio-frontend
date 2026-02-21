'use client';

import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui';
import { CrudDialog } from '@/components/common';
import { useAddCategoryFlow } from '../hooks/useAddCategoryFlow';
import { CategoryFormDialog } from './Forms/CategoryFormDialog';

interface ButtonAddCategoryProps {
  withText?: boolean;
}
export function ButtonAddCategory({ withText = true }: ButtonAddCategoryProps) {
  const flow = useAddCategoryFlow();
  return (
    <CrudDialog
      open={flow.open}
      onOpenChange={flow.setOpen}
      trigger={
        <Button variant={'secondary'} className="cursor-pointer">
          {withText ? (
            <>
              <PlusIcon className="h-4 w-4 text-blue-600" />
              <span className="text-blue-600">Add Category</span>
            </>
          ) : (
            <PlusIcon className="text-blue-600" />
          )}
        </Button>
      }
      title="Create Category"
      description={'Add a new category of skills'}
    >
      <CategoryFormDialog onSubmit={flow.confirm} isLoading={flow.isLoading} />
    </CrudDialog>
  );
}
