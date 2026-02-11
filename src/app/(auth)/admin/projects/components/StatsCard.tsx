import { Card, CardContent } from '@/components/ui';
import { cn } from '@/lib/shadcn/utils';

interface Props {
  title: string;
  value: number;
  icon: React.ReactNode;
  className?: string;
}
export function StatsCard({ title, value, icon, className }: Props) {
  return (
    <Card className={cn('p-0', className)}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-muted">{icon}</div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
