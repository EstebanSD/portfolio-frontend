import { fetchProjectIdAction } from '@/actions/projects';
import { ProjectGeneral, ProjectTranslations } from '@/components/projects/private';
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
import { FolderIcon, GlobeIcon } from 'lucide-react';

interface Props {
  params: Promise<{ id: string }>;
}
export default async function page({ params }: Props) {
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
          <ProjectGeneral projectId={id} initialData={projectData.general} />
        </TabsContent>
        <TabsContent value="translations">
          <ProjectTranslations projectId={id} initialData={projectData.translations} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
