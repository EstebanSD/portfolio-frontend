'use client';

import { cn } from '@/lib/shadcn/utils';
import { UploadIcon } from 'lucide-react';
import { Button, Input } from '../../ui';

interface DropZoneProps {
  name: string;
  disabled: boolean;
  multiple: boolean;
  maxFiles: number;
  maxSize: number;
  accept?: string;
  icon?: React.ReactNode;
  dragText?: string;
  selectText?: string;
  itemLabel?: string;
  dragOver: boolean;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function DropZone({
  name,
  disabled,
  multiple,
  maxFiles,
  maxSize,
  accept = '*/*',
  icon = <UploadIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />,
  dragText = 'Drag files here or',
  selectText = 'select files',
  itemLabel = 'file',
  dragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onChange,
}: DropZoneProps) {
  const inputId = `file-input-${name}`;

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={cn(
        'relative border-2 border-dashed rounded-lg p-6 transition-colors',
        dragOver && !disabled ? 'border-primary bg-primary/5' : 'border-muted-foreground/25',
        disabled && 'opacity-50 cursor-not-allowed',
      )}
    >
      <div className="text-center">
        {icon}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground space-x-1">
            <span>{dragText}</span>
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto font-semibold"
              disabled={disabled}
              onClick={() => document.getElementById(inputId)?.click()}
            >
              {selectText}
            </Button>
          </p>
          {multiple ? (
            <p className="text-xs text-muted-foreground">
              Max {maxFiles} {itemLabel}
              {maxFiles > 1 ? 's' : ''}, {maxSize}MB each
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">Max {maxSize}MB</p>
          )}
        </div>
      </div>

      <Input
        name={name}
        data-testid={inputId}
        id={inputId}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={onChange}
        disabled={disabled}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  );
}
