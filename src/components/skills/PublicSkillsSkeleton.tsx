import { serverTranslation } from '@/lib/i18n';
import { Card, CardContent, CardHeader, Skeleton } from '../ui';

export async function PublicSkillsSkeleton({ lng }: { lng: string }) {
  const { t } = await serverTranslation(lng, 'skills');

  return (
    <section id="skills" className="scroll-mt-24 min-h-screen py-20 px-4 bg-background">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-light text-foreground mb-4">
          {t('page.title1')} <span className="text-primary">{t('page.title2')}</span>
        </h2>
        <div className="w-20 h-1 bg-primary mx-auto" />
        <p className="mt-4 md:mt-6 text-gray-600 text-center">{t('page.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={'a' + i} className="h-full bg-gray-50 dark:bg-gray-900">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <div>
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={'b' + i} className="h-6 w-20 rounded-md" />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
