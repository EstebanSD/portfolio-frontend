import { cn } from '@/lib/shadcn/utils';
import { emptyIconMap } from './emptyState.icons';
import { EmptyStateBaseProps } from './emptyState.types';

export function EmptyStatePage({
  title,
  description,
  iconName,
  className = '',
  iconClassName = '',
}: EmptyStateBaseProps) {
  const Icon = emptyIconMap[iconName];

  return (
    <div
      className={cn(
        'w-full h-full flex flex-col justify-center items-center text-center py-12 px-4',
        className,
      )}
    >
      <div className="mb-4">
        <div className="mx-auto h-24 w-24 rounded-full bg-muted flex items-center justify-center">
          <Icon
            data-testid="empty-state-icon"
            aria-hidden="true"
            focusable={false}
            className={cn('h-12 w-12 text-muted-foreground', iconClassName)}
          />
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2">{title}</h3>

      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
