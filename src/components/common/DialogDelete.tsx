'use client';

import { useState } from 'react';
import { Trash2Icon } from 'lucide-react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import { Spinner } from '@/components/common';

interface Props {
  title: string;
  name?: string;
  label?: string;
  handleDelete: () => Promise<void>;
  isLoading: boolean;
  children?: React.ReactNode;
}
export function DialogDelete({ title, name, label, handleDelete, isLoading, children }: Props) {
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    await handleDelete();
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={
            'w-full flex items-center p-2 text-foreground hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer'
          }
          aria-label={label ?? 'Delete'}
        >
          <Trash2Icon className={`h-4 w-4 ${label ? 'mr-2' : ''}`} />
          {label}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {children ?? (
              <>
                Are you sure you want to delete {name ? <strong>{name}</strong> : 'this item'}?
                <br />
                <span className="text-destructive">This action cannot be undone.</span>
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={onDelete} disabled={isLoading}>
            <Spinner loading={isLoading} text={'Delete'} loadingText={'Deleting...'} />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
