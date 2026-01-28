import { ProjectType } from '@/types-portfolio/project';

export const getTypeColor = (type: ProjectType) => {
  switch (type) {
    case 'company':
      return 'bg-purple-100 text-purple-800';
    case 'freelance':
      return 'bg-cyan-100 text-cyan-800';
    case 'personal':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
