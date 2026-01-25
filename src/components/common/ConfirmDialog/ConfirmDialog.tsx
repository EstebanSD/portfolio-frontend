'use client';

import { useState } from 'react';
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
} from '../../ui';

type TriggerModeProps = {
  trigger: React.ReactNode;
  open?: never;
  onOpenChange?: never;
};

type ControlledModeProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: never;
};

type ConfirmDialogProps = {
  title: string;
  description?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  onConfirm: () => Promise<void> | void;
} & (TriggerModeProps | ControlledModeProps);

export function ConfirmDialog({
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  loading = false,
  open,
  onOpenChange,
  onConfirm,
  trigger,
}: ConfirmDialogProps) {
  const isControlled = open !== undefined;

  const [internalOpen, setInternalOpen] = useState(false);

  const dialogOpen = isControlled ? open : internalOpen;
  const setOpen = isControlled ? onOpenChange : setInternalOpen;

  const handleConfirm = async () => {
    await onConfirm();
    setOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setOpen}>
      {!isControlled && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>

          {description ? (
            <DialogDescription>{description}</DialogDescription>
          ) : (
            <DialogDescription />
          )}
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={loading}>
              {cancelLabel}
            </Button>
          </DialogClose>

          <Button variant="destructive" onClick={handleConfirm} disabled={loading}>
            {loading ? 'Processing…' : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
