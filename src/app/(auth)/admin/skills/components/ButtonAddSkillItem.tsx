'use client';

import { PlusIcon } from 'lucide-react';
import { CrudDialog } from '@/components/common';
import { Button } from '@/components/ui';
import { useAddSkillItemFlow } from '../hooks/useAddSkillItemFlow';
import { AddSkillItemFormDialog } from './Forms/AddSkillItemFormDialog';

interface ButtonAddSkillItemProps {
  categoryId: string;
  onSuccess: () => Promise<void>;
}
export function ButtonAddSkillItem({ categoryId, onSuccess }: ButtonAddSkillItemProps) {
  const flow = useAddSkillItemFlow(onSuccess);

  return (
    <CrudDialog
      open={flow.open}
      onOpenChange={flow.setOpen}
      trigger={
        <Button variant={'secondary'} className="cursor-pointer">
          <PlusIcon className="h-4 w-4 text-blue-600" />
          <span className="text-blue-600">Add Skill</span>
        </Button>
      }
      title="Add Skill Item"
      description={'Add a new item to the category'}
    >
      <AddSkillItemFormDialog
        onSubmit={(values) => flow.confirm(categoryId, values)}
        isLoading={flow.isLoading}
      />
    </CrudDialog>
  );
}
