import { ProjectType } from '@/types-portfolio/project';
import { BriefcaseIcon, BuildingIcon, UserIcon } from 'lucide-react';

export const getTypeIcon = (type: ProjectType) => {
  switch (type) {
    case 'personal':
      return <UserIcon className="w-4 h-4" />;
    case 'company':
      return <BuildingIcon className="w-4 h-4" />;
    case 'freelance':
      return <BriefcaseIcon className="w-4 h-4" />;
    default:
      return <UserIcon className="w-4 h-4" />;
  }
};
