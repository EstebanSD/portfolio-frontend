import { FolderIcon, GlobeIcon } from 'lucide-react';
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
import { fetchProjectIdAction } from '../actions';
import { GeneralForm } from './components/GeneralForm';
import { Translations } from './components/Translations';

export default async function page({ params }: PageProps<'/[lng]/admin/projects/[id]'>) {
  const { id } = await params;
  const projectData = await fetchProjectIdAction(id);
  const tCount = projectData.translations.length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">Manage Project</CardTitle>
              <CardDescription>
                Administer your project information and translations
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="general" className="gap-2">
            <FolderIcon className="w-4 h-4" />
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
          <GeneralForm projectId={id} initialData={projectData.general} />
        </TabsContent>
        <TabsContent value="translations">
          <Translations projectId={id} initialData={projectData.translations} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
