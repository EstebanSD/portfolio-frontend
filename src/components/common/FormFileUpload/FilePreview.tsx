import { DownloadIcon, XIcon } from 'lucide-react';
import { Button } from '../../ui';
import { formatFileSize, getFileIcon } from '../File';

interface FilePreviewProps {
  files: File[];
  allowDownload: boolean;
  disabled: boolean;
  onRemove: (index: number) => void;
  onDownload?: (file: File) => void;
}

export function FilePreview({
  files,
  allowDownload,
  disabled,
  onRemove,
  onDownload,
}: FilePreviewProps) {
  if (files.length === 0) return null;

  return (
    <div className="space-y-2">
      {files.map((file, index) => (
        <div
          key={`${file.name}-${index}`}
          className="flex items-center justify-between gap-3 p-3 bg-muted/50 rounded-lg"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {getFileIcon(file)}

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {allowDownload && onDownload && (
              <Button
                aria-label="download-file"
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onDownload(file)}
                disabled={disabled}
              >
                <DownloadIcon className="h-4 w-4" />
              </Button>
            )}
            <Button
              aria-label="remove-file"
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onRemove(index)}
              disabled={disabled}
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
