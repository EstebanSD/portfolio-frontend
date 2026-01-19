'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { Control, ControllerRenderProps, FieldValues, Path, useWatch } from 'react-hook-form';
import { XIcon, FileImageIcon, AsteriskIcon } from 'lucide-react';
import { Button, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '../ui';
import { cn } from '@/lib/shadcn/utils';

type FileUploadProps<T extends FieldValues, K extends Path<T>> = {
  control: Control<T>;
  name: K;
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

type FormImageUploadProps<T extends FieldValues, K extends Path<T>> = FileUploadProps<T, K> & {
  showImagePreview?: boolean;
  previewSize?: 'sm' | 'md' | 'lg';
  allowCrop?: boolean;
};

export function FormImageUpload<T extends FieldValues, K extends Path<T>>({
  control,
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
}: FormImageUploadProps<T, K>) {
  const [dragOver, setDragOver] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<{ [key: string]: string }>({});

  const watchedFiles = useWatch({
    control,
    name,
  });

  // Update preview URLs when files change
  useEffect(() => {
    const files = watchedFiles as File[] | File | null;
    const fileArray = files ? (Array.isArray(files) ? files : [files]) : [];

    if (fileArray.length > 0) {
      const newUrls: { [key: string]: string } = {};
      let hasNewUrls = false;

      fileArray.forEach((file) => {
        const key = `${file.name}-${file.size}`;
        if (!previewUrls[key]) {
          newUrls[key] = URL.createObjectURL(file);
          hasNewUrls = true;
        }
      });

      if (hasNewUrls) {
        setPreviewUrls((prev) => ({ ...prev, ...newUrls }));
      }
    }

    // Cleanup URLs
    const currentKeys = fileArray.map((file) => `${file.name}-${file.size}`);
    const urlsToRevoke = Object.keys(previewUrls).filter((key) => !currentKeys.includes(key));

    if (urlsToRevoke.length > 0) {
      urlsToRevoke.forEach((key) => {
        URL.revokeObjectURL(previewUrls[key]);
      });

      setPreviewUrls((prev) => {
        const newUrls = { ...prev };
        urlsToRevoke.forEach((key) => delete newUrls[key]);
        return newUrls;
      });
    }
  }, [watchedFiles, previewUrls]);

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      Object.values(previewUrls).forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const validateFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return [];

      const validFiles: File[] = [];
      const maxSizeBytes = maxSize * 1024 * 1024;

      for (let i = 0; i < files.length && validFiles.length < maxFiles; i++) {
        const file = files[i];
        if (file.type.startsWith('image/') && file.size <= maxSizeBytes) {
          validFiles.push(file);
        }
      }

      return validFiles;
    },
    [maxSize, maxFiles],
  );

  const getPreviewSize = () => {
    switch (previewSize) {
      case 'sm':
        return 'h-20 w-20'; // 80px
      case 'lg':
        return 'h-40 w-40'; // 160px
      default:
        return 'h-28 w-28'; // 112px
    }
  };

  const getContainerSize = () => {
    switch (previewSize) {
      case 'sm':
        return 'min-h-[6rem]'; // 96px
      case 'lg':
        return 'min-h-[11rem]'; // 176px
      default:
        return 'min-h-[8rem]'; // 128px
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }: { field: ControllerRenderProps<T, K> }) => {
        const files = field.value as File[] | File | null;
        const fileArray = files ? (Array.isArray(files) ? files : [files]) : [];

        const handleDrop = (e: React.DragEvent) => {
          e.preventDefault();
          setDragOver(false);

          if (disabled) return;

          const droppedFiles = validateFiles(e.dataTransfer.files);
          if (droppedFiles.length > 0) {
            const newFiles = multiple ? [...fileArray, ...droppedFiles] : droppedFiles;
            field.onChange(multiple ? newFiles : newFiles[0]);
          }
        };

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const selectedFiles = validateFiles(e.target.files);
          if (selectedFiles.length > 0) {
            const newFiles = multiple ? [...fileArray, ...selectedFiles] : selectedFiles;
            field.onChange(multiple ? newFiles : newFiles[0]);
          }
          e.target.value = '';
        };

        const removeFile = (index: number) => {
          // if (disabled) return;

          const newFiles = fileArray.filter((_, i) => i !== index);
          field.onChange(multiple ? newFiles : null);
        };

        return (
          <FormItem className={cn('w-full', className)}>
            {label && (
              <FormLabel
                htmlFor={`image-input-${name}`}
                aria-required={required}
                className="data-[error=true]:text-foreground"
              >
                {labelIcon && <span>{labelIcon}</span>}
                <p className="m-0 text-sm font-medium flex items-center gap-1">
                  {label}
                  {required && <AsteriskIcon className="text-destructive w-3 h-3 mb-1" />}
                </p>
              </FormLabel>
            )}

            <FormControl>
              <div className="space-y-4">
                {/* Drop zone */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={cn(
                    'relative border-2 border-dashed rounded-lg p-6 transition-colors',
                    dragOver && !disabled
                      ? 'border-primary bg-primary/5'
                      : 'border-muted-foreground/25',
                    disabled && 'opacity-50 cursor-not-allowed',
                  )}
                >
                  <div className="text-center">
                    <FileImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground space-x-1">
                        <span>Drag images here or</span>
                        <Button
                          type="button"
                          variant="link"
                          className="p-0 h-auto font-semibold"
                          disabled={disabled}
                          onClick={() => document.getElementById(`image-input-${name}`)?.click()}
                        >
                          select images
                        </Button>
                      </p>
                      {multiple ? (
                        <p className="text-xs text-muted-foreground">
                          Max {maxFiles} image{maxFiles > 1 ? 's' : ''}, {maxSize}MB each
                        </p>
                      ) : (
                        <p className="text-xs text-muted-foreground">Max {maxSize}MB</p>
                      )}
                    </div>
                  </div>

                  <Input
                    id={`image-input-${name}`}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={handleFileChange}
                    disabled={disabled}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>

                {/* Image preview */}
                {showImagePreview && fileArray.length > 0 && (
                  <div
                    className={cn(
                      'grid gap-3',
                      multiple ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-1 max-w-sm mx-auto',
                    )}
                  >
                    {fileArray.map((file, index) => {
                      const key = `${file.name}-${file.size}`;
                      const previewUrl = previewUrls[key];

                      return (
                        <div
                          key={`${file.name}-${index}`}
                          className={cn(
                            'relative group rounded-lg overflow-hidden border border-border/50',
                            getContainerSize(),
                            multiple ? 'bg-muted/30' : 'bg-muted/50',
                          )}
                        >
                          <div className="absolute inset-0 flex items-center justify-center p-2">
                            {previewUrl && (
                              <div className={cn('relative', getPreviewSize())}>
                                <Image
                                  fill
                                  src={previewUrl}
                                  alt={file.name}
                                  className="object-cover rounded"
                                />
                              </div>
                            )}
                          </div>

                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => removeFile(index)}
                              disabled={disabled}
                              className="h-8 w-8 p-0"
                            >
                              <XIcon className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-2">
                            <p className="truncate">{file.name}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
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
