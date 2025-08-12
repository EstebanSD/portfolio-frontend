'use client';

import { useState } from 'react';
import { Loader2Icon, Trash2Icon } from 'lucide-react';
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

interface Props {
  name: string | undefined;
  handleDelete: () => Promise<void>;
  isLoading?: boolean;
}
export function DialogTranslationDelete({ name, handleDelete, isLoading }: Props) {
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    await handleDelete();
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          <Trash2Icon className="w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Translation</DialogTitle>
          <DialogDescription>
            {name ? (
              <>
                Are you sure you want to delete the <strong>{name}</strong> translation?
                <br />
                <span className="text-destructive">This action cannot be undone.</span>
              </>
            ) : (
              <>
                Are you sure you want to delete the translation?
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
            {isLoading ? (
              <>
                <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
