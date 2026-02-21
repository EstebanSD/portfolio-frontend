import { Card, CardHeader, CardContent, Skeleton } from '@/components/ui';

export default function Loading() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Back button skeleton */}
      <div className="py-4">
        <Skeleton className="h-9 w-32 rounded-md" />
      </div>

      <div className="space-y-6">
        {/* Header Card */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="space-y-3 w-full">
                <Skeleton className="h-7 w-3/5" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Tabs + Form Skeleton */}
        <Card>
          <CardContent className="space-y-6 pt-6">
            {/* Tabs trigger skeleton */}
            <div className="flex gap-4">
              <Skeleton className="h-10 w-32 rounded-md" />
              <Skeleton className="h-10 w-40 rounded-md" />
            </div>

            {/* Form fields skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-24 w-full rounded-md" />
              <Skeleton className="h-10 w-40 rounded-md" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
