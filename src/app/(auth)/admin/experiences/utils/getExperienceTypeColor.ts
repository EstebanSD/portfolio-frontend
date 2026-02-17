import type { ExperienceType } from '@/types-portfolio/experience';

export const getExperienceTypeColor = (type: ExperienceType) => {
  switch (type) {
    case 'contract':
      return 'bg-purple-100 text-purple-800';
    case 'freelance':
      return 'bg-cyan-100 text-cyan-800';
    case 'employment':
      return 'bg-orange-100 text-orange-800';
    case 'internship':
      return 'bg-lime-100 text-lime-800';
    case 'volunteering':
      return 'bg-emerald-100 text-emerald-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
