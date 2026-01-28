import Image from 'next/image';
import { XIcon } from 'lucide-react';
import { cn } from '@/lib/shadcn/utils';
import { getContainerSize, getPreviewSize, ImageSize } from '../File';
import { Button } from '../../ui';

interface ImagePreviewProps {
  files: File[];
  multiple: boolean;
  previewUrls: Record<string, string>;
  previewSize?: ImageSize;
  disabled: boolean;
  onRemove: (index: number) => void;
}

export function ImagePreview({
  files,
  multiple,
  previewUrls,
  previewSize = 'md',
  disabled,
  onRemove,
}: ImagePreviewProps) {
  if (files.length === 0) return null;
  return (
    <div
      className={cn(
        'grid gap-3',
        multiple ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-1 max-w-sm mx-auto',
      )}
    >
      {files.map((file, index) => {
        const key = `${index}-${file.name}-${file.size}`;
        const previewUrl = previewUrls[key];

        return (
          <div
            key={`${file.name}-${index}`}
            className={cn(
              'relative group rounded-lg overflow-hidden border border-border/50',
              getContainerSize(previewSize),
              multiple ? 'bg-muted/30' : 'bg-muted/50',
            )}
          >
            <div className="absolute inset-0 flex items-center justify-center p-2">
              {previewUrl && (
                <div className={cn('relative', getPreviewSize(previewSize))}>
                  <Image fill src={previewUrl} alt={file.name} className="object-cover rounded" />
                </div>
              )}
            </div>

            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                data-testid={'remove-image'}
                aria-label="remove-image"
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => onRemove(index)}
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
  );
}
