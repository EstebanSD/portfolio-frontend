'use client';

import Image from 'next/image';
import { ImageIcon, Trash2Icon } from 'lucide-react';
import { SkillItem } from '@/types-portfolio/skill';
import { Button, Card } from '@/components/ui';
import { ConfirmDialog } from '@/components/common';
import { useDeleteSkillItem } from '../hooks/useDeleteSkillItem';
import { ButtonUpdateSkillItem } from './ButtonUpdateSkillItem';

interface ItemCardProps {
  item: SkillItem;
  onSuccess: () => Promise<void>;
}
export function ItemCard({ item, onSuccess }: ItemCardProps) {
  const { deleteSkillItem, isEliminating } = useDeleteSkillItem(onSuccess);

  return (
    <Card className="justify-between p-4 gap-2 min-h-[128px]">
      <div className="flex justify-end gap-2">
        <ButtonUpdateSkillItem item={item} onSuccess={onSuccess} />

        <ConfirmDialog
          title="Delete Skill Item"
          confirmLabel="Delete"
          loading={isEliminating}
          onConfirm={() => deleteSkillItem(item._id)}
          trigger={
            <Button
              size={'icon-sm'}
              variant={'outline'}
              className="border-destructive cursor-pointer"
            >
              <Trash2Icon className="w-4 h-4 text-destructive" />
            </Button>
          }
          description={
            <>
              Are you sure you want to delete <strong>{item.name}</strong>?
              <br />
              <span className="text-destructive">This action cannot be undone.</span>
            </>
          }
        />
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100">
          {item.icon ? (
            <Image
              src={item.icon.url}
              width={48}
              height={48}
              alt={item.name}
              className="object-contain"
            />
          ) : (
            <ImageIcon className="w-8 h-8 text-slate-400" />
          )}
        </div>

        <div className="text-sm font-medium text-center break-words line-clamp-2">{item.name}</div>
      </div>
    </Card>
  );
}
