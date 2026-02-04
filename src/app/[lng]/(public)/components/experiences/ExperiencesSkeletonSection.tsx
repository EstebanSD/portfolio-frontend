import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
} from '@/components/ui';
import { serverTranslation } from '@/lib/i18n/server';

export async function ExperiencesSkeletonSection({ lng }: { lng: string }) {
  const { t } = await serverTranslation(lng, 'experiences');
  return (
    <section
      id="experiences"
      className="scroll-mt-24 min-h-screen py-20 px-2 md:px-8 bg-background dark:bg-gray-900"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl font-light text-foreground mb-4">
          {t('page.title1')} <span className="text-primary">{t('page.title2')}</span>
        </h2>
        <div className="w-20 h-1 bg-primary mx-auto" />
      </div>

      <div className="pb-4 flex flex-col items-center justify-center space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card
            key={i}
            className="w-full max-w-4xl hover:shadow-lg transition-all duration-300 bg-background dark:bg-gray-900 border-border/50"
          >
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                {/* Company Info */}
                <div className="flex items-start gap-3 flex-1">
                  {/* Avatar */}
                  <Skeleton className="h-12 w-12 rounded-full" />

                  <div className="flex-1 min-w-0 space-y-2">
                    <CardTitle>
                      <Skeleton className="h-5 w-3/4" />
                    </CardTitle>
                    <CardDescription>
                      <Skeleton className="h-4 w-1/2" />
                    </CardDescription>
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                </div>

                {/* Date and Type */}
                <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-5 w-20 rounded-md" />
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0 space-y-4">
              {/* Description */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-6 w-16 rounded-md" />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
