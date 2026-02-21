import { Metadata } from 'next';
import { GlobeIcon, UserIcon } from 'lucide-react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui';
import { fetchAboutAction } from './actions';
import { GeneralForm } from './components/GeneralForm';
import { Translations } from './components/Translations';

export const metadata: Metadata = {
  title: 'Manage About',
};

export default async function page() {
  const initialData = await fetchAboutAction();
  const tCount = initialData.translations.length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Manage About</CardTitle>
          <CardDescription>Administer your personal information and translations</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="general" className="gap-2">
            <UserIcon className="w-4 h-4" />
            <span>General Information</span>
          </TabsTrigger>
          <TabsTrigger value="translations" className="gap-2">
            <GlobeIcon className="w-4 h-4" />
            <span>
              Translations
              {tCount > 0 && ` (${tCount})`}
            </span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <GeneralForm initialData={initialData.general} />
        </TabsContent>
        <TabsContent value="translations">
          <Translations initialData={initialData.translations} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
