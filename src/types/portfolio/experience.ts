import { FileMetadata } from './image';

export const EXPERIENCE_TYPE_ENUM = [
  'freelance',
  'employment',
  'internship',
  'volunteering',
  'contract',
] as const;

type ExperienceType = (typeof EXPERIENCE_TYPE_ENUM)[number];

export interface Experience {
  _id: string;
  locale: string;
  position: string;
  description: string;
  general: {
    _id: string;
    companyName: string;
    companyLogo?: FileMetadata;
    type: ExperienceType;
    location?: string;
    technologies?: string[];
    startDate: string;
    endDate?: string;
    ongoing?: boolean;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}
