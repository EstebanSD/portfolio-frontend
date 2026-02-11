import Image from 'next/image';
import {
  AppWindowIcon,
  CloudIcon,
  Code2Icon,
  DatabaseIcon,
  LightbulbIcon,
  PaletteIcon,
  ServerIcon,
  SmartphoneIcon,
  UsersIcon,
  WrenchIcon,
} from 'lucide-react';
import { Skill, SkillCategory } from '@/types-portfolio/skill';
import { Badge, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

const getCategoryIcon = (categoryKey: string): React.ElementType => {
  const iconMap: Record<string, React.ElementType> = {
    frontend: AppWindowIcon,
    backend: ServerIcon,
    database: DatabaseIcon,
    mobile: SmartphoneIcon,
    design: PaletteIcon,
    cloud: CloudIcon,
    tools: WrenchIcon,
    'soft-skills': UsersIcon,
    languages: LightbulbIcon,
  };
  return iconMap[categoryKey] || Code2Icon;
};

const getCategoryColor = (categoryKey: string) => {
  const colorMap: Record<string, string> = {
    frontend: 'bg-blue-100 text-blue-800 border-blue-200',
    backend: 'bg-green-100 text-green-800 border-green-200',
    database: 'bg-orange-100 text-orange-800 border-orange-200',
    mobile: 'bg-purple-100 text-purple-800 border-purple-200',
    design: 'bg-pink-100 text-pink-800 border-pink-200',
    cloud: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    tools: 'bg-gray-100 text-gray-800 border-gray-200',
    'soft-skills': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    languages: 'bg-red-100 text-red-800 border-red-200',
  };
  return colorMap[categoryKey] || 'bg-gray-100 text-gray-800 border-gray-200';
};

interface SkillCardProps {
  category: SkillCategory;
  skills: Skill[];
}

export const SkillCard = ({ category, skills }: SkillCardProps) => {
  const Icon = getCategoryIcon(category.general.key);

  return (
    <Card className="h-full hover:shadow-lg transition-shadow bg-gray-50 dark:bg-gray-900">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${getCategoryColor(category.general.key)}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-lg">{category.name}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge
              key={skill._id}
              variant="secondary"
              className="text-xs hover:bg-gray-200 dark:hover:bg-accent transition-colors cursor-default"
            >
              {skill.icon ? (
                <Image
                  src={skill.icon.url}
                  width={16}
                  height={16}
                  alt={skill.name}
                  className="mr-1 rounded-full"
                />
              ) : null}
              {skill.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
