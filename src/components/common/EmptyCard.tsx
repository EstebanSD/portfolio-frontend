import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Ban } from 'lucide-react';

export async function EmptyCard({ t }: { t: (key: string) => string }) {
  return (
    <Card className="h-full bg-gray-50 dark:bg-gray-900 text-center flex flex-col justify-center items-center py-10">
      <CardHeader className="flex flex-col items-center w-full">
        <Ban className="w-8 h-8 text-accent mb-2" />
        <CardTitle className="text-lg">{t('empty.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{t('empty.description')}</p>
      </CardContent>
    </Card>
  );
}
