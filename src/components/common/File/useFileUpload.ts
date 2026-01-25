import { useCallback, useState } from 'react';
import { validateFiles, ValidationError } from './fileUtils';

interface UseFileUploadOptions {
  maxSize: number; // MB
  maxFiles: number;
  multiple: boolean;
  disabled: boolean;
  accept?: string;
  onFilesChange?: (files: File[] | File) => void;
  onValidationError?: (errors: ValidationError[]) => void;
}

interface UseFileUploadReturn {
  dragOver: boolean;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent, currentFiles: File[]) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, currentFiles: File[]) => void;
}

/**
 * TODO
 * @deprecated its correct use has not yet been decided
 */
export function useFileUpload(options: UseFileUploadOptions): UseFileUploadReturn {
  const { maxSize, maxFiles, multiple, disabled, accept, onFilesChange, onValidationError } =
    options;

  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) {
        setDragOver(true);
      }
    },
    [disabled],
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, currentFiles: File[]) => {
      e.preventDefault();
      setDragOver(false);

      if (disabled) return;

      const { valid, errors } = validateFiles(e.dataTransfer.files, {
        maxSize,
        maxFiles,
        accept,
      });

      if (errors.length > 0 && onValidationError) {
        onValidationError(errors);
      }

      if (valid.length > 0 && onFilesChange) {
        const newFiles = multiple ? [...currentFiles, ...valid] : valid;

        onFilesChange(multiple ? newFiles : newFiles[0]);
      }
    },
    [disabled, maxSize, maxFiles, accept, multiple, onFilesChange, onValidationError],
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, currentFiles: File[]) => {
      const { valid, errors } = validateFiles(e.target.files, {
        maxSize,
        maxFiles,
        accept,
      });

      if (errors.length > 0 && onValidationError) {
        onValidationError(errors);
      }

      if (valid.length > 0 && onFilesChange) {
        const newFiles = multiple ? [...currentFiles, ...valid] : valid;

        onFilesChange(multiple ? newFiles : newFiles[0]);
      }

      e.target.value = '';
    },
    [maxSize, maxFiles, accept, multiple, onFilesChange, onValidationError],
  );
  return {
    dragOver,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
  };
}
