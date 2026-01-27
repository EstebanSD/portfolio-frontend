'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FileImageIcon } from 'lucide-react';
import { useFormContext, useWatch } from 'react-hook-form';
import { cn } from '@/lib/shadcn/utils';
import { FormControl, FormField, FormItem, FormMessage } from '../../ui';
import { normalizeFileValue, validateFiles } from '../File';
import { FormInputLabel } from '../FormInputLabel';
import { DropZone } from '../DropZone';
import { ImagePreview } from './ImagePreview';

type FormImageUploadProps = {
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
  showImagePreview?: boolean;
  previewSize?: 'sm' | 'md' | 'lg';
};

export function FormImageUpload({
  name,
  label = '',
  labelIcon = null,
  required = false,
  disabled = false,
  multiple = false,
  maxFiles = 1,
  maxSize = 5,
  accept = 'image/*',
  showImagePreview = true,
  previewSize = 'md',
  className,
}: FormImageUploadProps) {
  const { control } = useFormContext();
  const [dragOver, setDragOver] = useState(false);

  const watchedFiles = useWatch({ control, name });
  const fileArray = normalizeFileValue(watchedFiles);

  const previewUrls = useMemo(() => {
    const urls: { [key: string]: string } = {};
    fileArray.forEach((file, index) => {
      const key = `${index}-${file.name}-${file.size}`;
      urls[key] = URL.createObjectURL(file);
    });
    return urls;
  }, [fileArray]);

  useEffect(() => {
    return () => {
      Object.values(previewUrls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

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
          setDragOver(false);

          if (disabled) return;

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
              <div className="space-y-4">
                <DropZone
                  name={name}
                  disabled={disabled}
                  multiple={multiple}
                  maxFiles={maxFiles}
                  maxSize={maxSize}
                  accept={accept}
                  icon={<FileImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />}
                  dragText={'Drag images here or'}
                  selectText={'select images'}
                  itemLabel={'image'}
                  dragOver={dragOver}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onChange={handleFileChange}
                />

                {showImagePreview && (
                  <ImagePreview
                    files={fileArray}
                    previewUrls={previewUrls}
                    previewSize={previewSize}
                    multiple={multiple}
                    disabled={disabled}
                    onRemove={removeFile}
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
