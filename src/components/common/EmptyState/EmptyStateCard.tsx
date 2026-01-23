import { cn } from '@/lib/shadcn/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { emptyIconMap } from './empty-state.icons';
import { EmptyStateBaseProps } from './empty-state.types';

export function EmptyStateCard({
  title,
  description,
  iconName,
  className = '',
  iconClassName = '',
}: EmptyStateBaseProps) {
  const Icon = emptyIconMap[iconName];

  return (
    <Card className={cn('h-full bg-gray-50 dark:bg-gray-900', className)}>
      <CardHeader className="flex flex-col items-center w-full pt-10 pb-2">
        <Icon
          data-testid="empty-state-icon"
          aria-hidden="true"
          focusable={false}
          className={cn('w-8 h-8 text-primary mb-2', iconClassName)}
        />
        <CardTitle>
          <h3 className="text-lg font-semibold">{title}</h3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground text-center">{description}</p>
      </CardContent>
    </Card>
  );
}
