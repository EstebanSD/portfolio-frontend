'use client';

import React, { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/shadcn/utils';
import { FormControl, FormField, FormItem, FormMessage } from '../../ui';
import { downloadFile, normalizeFileValue, validateFiles } from '../File';
import { DropZone } from '../DropZone';
import { FormInputLabel } from '../FormInputLabel';
import { FilePreview } from './FilePreview';

type FileUploadProps = {
  name: string;
  label?: string;
  labelIcon?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // MB
  accept?: string;
  className?: string;
};

type FormFileUploadProps = FileUploadProps & {
  showPreview?: boolean;
  allowDownload?: boolean;
};

export function FormFileUpload({
  name,
  label = '',
  labelIcon = null,
  required = false,
  disabled = false,
  multiple = false,
  maxFiles = 5,
  maxSize = 10,
  accept = '*/*',
  showPreview = true,
  allowDownload = false,
  className,
}: FormFileUploadProps) {
  const { control } = useFormContext();
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) setDragOver(true);
    },
    [disabled],
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const fileArray = normalizeFileValue(field.value);

        const handleDrop = (e: React.DragEvent) => {
          e.preventDefault();
          setDragOver(false);

          if (disabled) return;

          const droppedFiles = validateFiles(e.dataTransfer.files, {
            maxSize,
            maxFiles,
            accept,
          }).valid;

          if (droppedFiles.length > 0) {
            const newFiles = multiple ? [...fileArray, ...droppedFiles] : droppedFiles;
            field.onChange(multiple ? newFiles : newFiles[0]);
          }
        };

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const selectedFiles = validateFiles(e.target.files, { maxSize, maxFiles, accept }).valid;

          if (selectedFiles.length > 0) {
            const newFiles = multiple ? [...fileArray, ...selectedFiles] : selectedFiles;
            field.onChange(multiple ? newFiles : newFiles[0]);
          }
          e.target.value = '';
        };

        const removeFile = (index: number) => {
          const newFiles = fileArray.filter((_, i) => i !== index);
          field.onChange(multiple ? newFiles : null);
        };

        return (
          <FormItem className={cn('w-full', className)}>
            <FormInputLabel
              htmlFor={name}
              label={label}
              labelIcon={labelIcon}
              inputRequired={required}
            />

            <FormControl>
              <div className="space-y-4 overflow-hidden">
                <DropZone
                  name={name}
                  dragOver={dragOver}
                  disabled={disabled}
                  multiple={multiple}
                  maxFiles={maxFiles}
                  maxSize={maxSize}
                  accept={accept}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onChange={handleFileChange}
                />

                {showPreview && (
                  <FilePreview
                    files={fileArray}
                    allowDownload={allowDownload}
                    disabled={disabled}
                    onRemove={removeFile}
                    onDownload={allowDownload ? downloadFile : undefined}
                  />
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
