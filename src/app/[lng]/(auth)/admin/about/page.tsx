import { GlobeIcon, UserIcon } from 'lucide-react';
import { fetchDataAction } from '@/actions/about';
import { AboutGeneralForm, AboutTranslations } from '@/components/about';
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

export default async function page() {
  const initialData = await fetchDataAction();
  const tCount = initialData.translations.length;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl">Manage About</CardTitle>
                <CardDescription>
                  Administer your personal information and translations
                </CardDescription>
              </div>
            </div>
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
            <AboutGeneralForm initialData={initialData.general} />
          </TabsContent>
          <TabsContent value="translations">
            <AboutTranslations initialData={initialData.translations} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
