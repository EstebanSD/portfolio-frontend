'use client';

import React, { useCallback, useState } from 'react';
import { Control, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import {
  UploadIcon,
  XIcon,
  FileIcon,
  FileTextIcon,
  FileImageIcon,
  FileVideoIcon,
  FileAudioIcon,
  DownloadIcon,
  AsteriskIcon,
} from 'lucide-react';
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

type FormFileUploadProps<T extends FieldValues, K extends Path<T>> = FileUploadProps<T, K> & {
  showPreview?: boolean;
  allowDownload?: boolean;
};

export function FormFileUpload<T extends FieldValues, K extends Path<T>>({
  control,
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
}: FormFileUploadProps<T, K>) {
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

  const validateFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return [];

      const validFiles: File[] = [];
      const maxSizeBytes = maxSize * 1024 * 1024;

      for (let i = 0; i < files.length && validFiles.length < maxFiles; i++) {
        const file = files[i];
        if (file.size <= maxSizeBytes) {
          validFiles.push(file);
        }
      }

      return validFiles;
    },
    [maxSize, maxFiles],
  );

  const getFileIcon = (file: File) => {
    const type = file.type;
    if (type.startsWith('image/')) return <FileImageIcon className="h-4 w-4" />;
    if (type.startsWith('video/')) return <FileVideoIcon className="h-4 w-4" />;
    if (type.startsWith('audio/')) return <FileAudioIcon className="h-4 w-4" />;
    if (type === 'application/pdf' || type.includes('text'))
      return <FileTextIcon className="h-4 w-4" />;
    return <FileIcon className="h-4 w-4" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
          const newFiles = fileArray.filter((_, i) => i !== index);
          field.onChange(multiple ? newFiles : null);
        };

        const downloadFile = (file: File) => {
          const url = URL.createObjectURL(file);
          const a = document.createElement('a');
          a.href = url;
          a.download = file.name;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        };

        return (
          <FormItem className={cn('w-full', className)}>
            {label && (
              <FormLabel
                htmlFor={`file-input-${name}`}
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
                    <UploadIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground space-x-1">
                        <span>Drag files here or</span>
                        <Button
                          type="button"
                          variant="link"
                          className="p-0 h-auto font-semibold"
                          disabled={disabled}
                          onClick={() => document.getElementById(`file-input-${name}`)?.click()}
                        >
                          select files
                        </Button>
                      </p>
                      {multiple ? (
                        <p className="text-xs text-muted-foreground">
                          Max {maxFiles} file{maxFiles > 1 ? 's' : ''}, {maxSize}MB each
                        </p>
                      ) : (
                        <p className="text-xs text-muted-foreground">Max {maxSize}MB</p>
                      )}
                    </div>
                  </div>

                  <Input
                    id={`file-input-${name}`}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={handleFileChange}
                    disabled={disabled}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>

                {/* File list */}
                {showPreview && fileArray.length > 0 && (
                  <div className="space-y-2">
                    {fileArray.map((file, index) => (
                      <div
                        key={`${file.name}-${index}`}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          {getFileIcon(file)}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1 ml-4">
                          {allowDownload && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => downloadFile(file)}
                              disabled={disabled}
                            >
                              <DownloadIcon className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            disabled={disabled}
                          >
                            <XIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
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
