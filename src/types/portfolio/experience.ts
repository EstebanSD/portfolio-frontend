import { Language } from '@/lib/i18n';
import { FileMetadata } from './image';

export const EXPERIENCE_TYPE_ENUM = [
  'freelance',
  'employment',
  'internship',
  'volunteering',
  'contract',
] as const;

export type ExperienceType = (typeof EXPERIENCE_TYPE_ENUM)[number];

export const EXPERIENCE_LABELS = {
  freelance: 'Freelance',
  employment: 'Employment',
  internship: 'Internship',
  volunteering: 'Volunteering',
  contract: 'Contract',
};

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

export interface ExperienceWithTranslations {
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
  translations: {
    locale: string;
    position: string;
    description?: string;
  }[];
}

export interface ExperienceTranslation {
  _id: string;
  locale: Language;
  position: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
export interface ExperienceIdWithTranslations {
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
  translations: ExperienceTranslation[];
}
