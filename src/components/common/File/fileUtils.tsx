import { FileAudioIcon, FileIcon, FileImageIcon, FileTextIcon, FileVideoIcon } from 'lucide-react';

export interface ValidationError {
  type: 'size' | 'count' | 'type';
  file: File;
  message: string;
  maxSize?: number;
}

interface ValidationResult {
  valid: File[];
  errors: ValidationError[];
}

interface ValidateFilesOptions {
  maxSize: number; // MB
  maxFiles: number;
  accept?: string; // MIME types
}

export function validateFiles(
  files: FileList | File[] | null,
  options: ValidateFilesOptions,
): ValidationResult {
  if (!files || files.length === 0) {
    return { valid: [], errors: [] };
  }

  const { maxSize, maxFiles, accept } = options;
  const maxSizeBytes = maxSize * 1024 * 1024;

  const valid: File[] = [];
  const errors: ValidationError[] = [];

  const fileArray = Array.from(files);

  for (let i = 0; i < fileArray.length; i++) {
    const file = fileArray[i];

    if (file.size > maxSizeBytes) {
      errors.push({
        type: 'size',
        file,
        message: `File "${file.name}" exceeds ${maxSize}MB`,
        maxSize,
      });
      continue;
    }

    if (accept && accept !== '*/*') {
      const acceptedTypes = accept.split(',').map((t) => t.trim());

      const isAccepted = acceptedTypes.some((type) => {
        if (type.endsWith('/*')) {
          const baseType = type.split('/')[0];
          return file.type.startsWith(baseType + '/');
        }
        return file.type === type;
      });

      if (!isAccepted) {
        errors.push({
          type: 'type',
          file,
          message: `File "${file.name}" type not accepted`,
        });
        continue;
      }
    }

    if (valid.length >= maxFiles) {
      errors.push({
        type: 'count',
        file,
        message: `Maximum ${maxFiles} files allowed`,
      });
      continue;
    }

    valid.push(file);
  }

  return { valid, errors };
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  if (bytes < 0) return 'Invalid size';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const sizeIndex = Math.min(i, sizes.length - 1);

  return parseFloat((bytes / Math.pow(k, sizeIndex)).toFixed(2)) + ' ' + sizes[sizeIndex];
}

export function getFileIcon(file: File): React.ReactNode {
  const type = file.type;

  if (type.startsWith('image/')) {
    return <FileImageIcon className="h-4 w-4" />;
  }

  if (type.startsWith('video/')) {
    return <FileVideoIcon className="h-4 w-4" />;
  }

  if (type.startsWith('audio/')) {
    return <FileAudioIcon className="h-4 w-4" />;
  }

  if (type === 'application/pdf' || type.includes('text')) {
    return <FileTextIcon className="h-4 w-4" />;
  }

  return <FileIcon className="h-4 w-4" />;
}

export function normalizeFileValue(value: File[] | File | null | undefined): File[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return [value];
}

export function downloadFile(file: File): void {
  const url = URL.createObjectURL(file);

  try {
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } finally {
    URL.revokeObjectURL(url);
  }
}
