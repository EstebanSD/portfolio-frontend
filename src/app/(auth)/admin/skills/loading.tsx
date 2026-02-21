import { Card, CardContent, CardHeader, Skeleton } from '@/components/ui';

export default function Loading() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Skills Management</h1>
        <p className="text-muted-foreground">Manage your skill categories and their items.</p>
      </div>

      <div className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 h-full">
          <Card className="md:min-w-60">
            <CardHeader>
              <Skeleton className="h-6 w-1/3 mb-2" />
            </CardHeader>

            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/3 mb-2" />
            </CardHeader>

            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/3 mb-2" />
          </CardHeader>

          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
