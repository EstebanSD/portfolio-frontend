import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { cn } from '@/lib/shadcn/utils';
import { AlertTriangleIcon, BanIcon, InboxIcon, SearchIcon } from 'lucide-react';

const getIcon = (key: string): React.ElementType => {
  const iconMap: Record<string, React.ElementType> = {
    ban: BanIcon,
    alert: AlertTriangleIcon,
    search: SearchIcon,
    inbox: InboxIcon,
  };
  return iconMap[key] || BanIcon;
};

interface Props {
  title: string;
  description: string;
  iconName: string;
  asCard?: boolean;
  className?: string;
  iconClassName?: string;
}

export async function EmptyState({
  title,
  description,
  iconName,
  asCard = false,
  className = '',
  iconClassName = '',
}: Props) {
  const Icon = getIcon(iconName);

  if (asCard) {
    return (
      <Card className="h-full bg-gray-50 dark:bg-gray-900">
        <CardHeader className="flex flex-col items-center w-full pt-10 pb-2">
          <Icon className={cn('w-8 h-8 text-primary mb-2', iconClassName)} />
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center">{description}</p>
        </CardContent>
      </Card>
    );
  }
  return (
    <div
      className={cn(
        'w-full h-full flex flex-col justify-center items-center text-center py-12 px-4',
        className,
      )}
    >
      <div className="mb-4">
        <div className="mx-auto h-24 w-24 rounded-full bg-muted flex items-center justify-center">
          <Icon className={cn('h-12 w-12 text-muted-foreground', iconClassName)} />
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2">{title}</h3>

      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
