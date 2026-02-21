import { FolderIcon, GlobeIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Props = {
  general: React.ReactNode;
  translations: React.ReactNode;
  translationsCount?: number;
  defaultTab?: 'general' | 'translations';
};

export function EntityEditorTabs({
  general,
  translations,
  translationsCount,
  defaultTab = 'general',
}: Props) {
  return (
    <Tabs defaultValue={defaultTab} className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="general" className="gap-2">
          <FolderIcon className="w-4 h-4" />
          <span>General Information</span>
        </TabsTrigger>

        <TabsTrigger value="translations" className="gap-2">
          <GlobeIcon className="w-4 h-4" />
          <span>
            Translations
            {translationsCount !== undefined && translationsCount > 0 && (
              <> ({translationsCount})</>
            )}
          </span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="general">{general}</TabsContent>
      <TabsContent value="translations">{translations}</TabsContent>
    </Tabs>
  );
}
