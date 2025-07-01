import { serverTranslation } from '@/lib/i18n';
import { Skeleton } from '../ui';

export async function PublicAboutSkeleton({ lng }: { lng: string }) {
  const { t } = await serverTranslation(lng, 'about');

  return (
    <section id="about" className="scroll-mt-24 py-20 px-2 md:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-light text-foreground mb-4">
          {t('page.title1')} <span className="text-primary">{t('page.title2')}</span>
        </h2>
        <div className="w-20 h-1 bg-primary mx-auto" />
      </div>

      <div className="max-w-4xl mx-auto leading-relaxed relative">
        {/* Image + Name + Location */}
        <div className="p-4 float-right md:ml-6 hidden md:flex flex-col items-center bg-gray-100 dark:bg-gray-900 rounded-2xl">
          <Skeleton className="w-48 h-48 mb-4 rounded-lg" />
          <Skeleton className="h-5 w-32 mb-2" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Bio */}
        <div className="space-y-4">
          <Skeleton className="h-5 w-full md:w-[60%]" />
          <Skeleton className="h-5 w-[90%] md:w-[50%]" />
          <Skeleton className="h-5 w-[85%] md:w-[45%]" />
          <Skeleton className="h-5 w-[92%] md:w-[52%]" />
          <Skeleton className="h-5 w-[88%] md:w-[48%]" />
        </div>

        {/* Tagline */}
        <Skeleton className="h-6 w-64 mt-6" />

        <div className="clear-both" />
      </div>

      {/* Stack */}
      <div className="mt-8 max-w-4xl mx-auto">
        <Skeleton className="h-5 w-48 mb-4" />
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton key={idx} className="h-8 w-24 rounded-full" />
          ))}
        </div>
      </div>
    </section>
  );
}
