import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Skeleton,
} from '../ui';

export function ProjectsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card
          key={i}
          className="max-w-sm md:max-w-md lg:max-w-lg pt-0 overflow-hidden border-0 shadow-md bg-background"
        >
          {/* Image */}
          <div className="relative h-48">
            <Skeleton className="absolute inset-0 w-full h-full" />

            {/* Badges */}
            <div className="absolute top-3 left-3">
              <Skeleton className="w-16 h-6 rounded-md" />
            </div>
            <div className="absolute top-3 right-3">
              <Skeleton className="w-16 h-6 rounded-md" />
            </div>
          </div>

          {/* Header */}
          <CardHeader className="pb-3">
            <CardTitle>
              <Skeleton className="h-5 w-3/4" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-5/6" />
            </CardDescription>
          </CardHeader>

          {/* Content */}
          <CardContent className="space-y-4">
            {/* Dates */}
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-1.5">
              {Array.from({ length: 4 }).map((_, idx) => (
                <Skeleton key={idx} className="h-6 w-16 rounded-md" />
              ))}
            </div>
          </CardContent>

          {/* Footer */}
          <CardFooter className="pt-0 flex gap-2">
            <Skeleton className="h-8 w-20 rounded-md" />
            <Skeleton className="h-8 w-20 rounded-md" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
