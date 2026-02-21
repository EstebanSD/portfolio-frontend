'use client';

import { EditIcon } from 'lucide-react';
import { Button } from '@/components/ui';
import { CrudDialog } from '@/components/common';
import type { SkillItem } from '@/types-portfolio/skill';
import { useUpdateSkillItemFlow } from '../hooks/useUpdateSkillItemFlow';
import { UpdateSkillItemFormDialog } from './Forms/UpdateSkillItemFormDialog';

interface ButtonUpdateSkillItemProps {
  item: SkillItem;
  onSuccess: () => Promise<void>;
}
export function ButtonUpdateSkillItem({ item, onSuccess }: ButtonUpdateSkillItemProps) {
  const flow = useUpdateSkillItemFlow(onSuccess);

  return (
    <CrudDialog
      open={flow.open}
      onOpenChange={flow.setOpen}
      trigger={
        <Button size={'icon-sm'} variant={'outline'} className="border-blue-600 cursor-pointer">
          <EditIcon className="w-4 h-4 text-blue-600" />
        </Button>
      }
      title="Edit Skill Item"
      description={'Update the skill item of the category'}
    >
      <UpdateSkillItemFormDialog
        name={item.name}
        onSubmit={(values) => flow.confirm(item._id, values)}
        isLoading={flow.isLoading}
      />
    </CrudDialog>
  );
}
