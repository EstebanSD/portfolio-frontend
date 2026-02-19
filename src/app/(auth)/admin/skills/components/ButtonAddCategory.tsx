'use client';

import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui';
import { CrudDialog } from '@/components/common';
import { useAddCategoryFlow } from '../hooks/useAddCategoryFlow';
import { CategoryForm } from './Forms/CategoryForm';

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
        <Button variant={'secondary'}>
          {withText ? (
            <>
              <PlusIcon className="mr-2 h-4 w-4 text-blue-600" />
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
      <CategoryForm onSubmit={flow.confirm} isLoading={flow.isLoading} />
    </CrudDialog>
  );
}
