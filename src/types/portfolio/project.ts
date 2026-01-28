import { Language } from '@/lib/i18n';
import { FileMetadata } from './image';

export const PROJECT_STATUSES = ['in_progress', 'completed', 'paused'] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export const PROJECT_TYPES = ['personal', 'company', 'freelance'] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number];

export interface ProjectGeneral {
  _id: string;
  title: string;
  type: ProjectType;
  startDate?: Date;
  endDate?: Date;
  status: ProjectStatus;
  technologies?: string[];
  links?: {
    github?: string;
    website?: string;
  };
  images?: FileMetadata[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectTranslation {
  _id: string;
  locale: string;
  summary: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
export interface Project {
  _id: string;
  locale: string;
  summary: string;
  description: string;
  general: ProjectGeneral;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectQueryFilters {
  title?: string;
  status?: ProjectStatus | 'all';
  type?: ProjectType | 'all';
}

export type RequiredProjectFilters = Required<ProjectQueryFilters>;

export interface PrivateProjectQueryFilters extends ProjectQueryFilters {
  locale?: Language | 'all';
}
export type RequiredPrivateProjectFilters = Required<PrivateProjectQueryFilters>;

export interface ProjectWithTranslations {
  _id: string;
  title: string;
  type: ProjectType;
  status: ProjectStatus;
  startDate: string | null;
  endDate: string | null;
  technologies: string[];
  links: {
    github?: string;
    website?: string;
  };
  images?: FileMetadata[];
  translations: {
    locale: string;
    summary: string;
    description: string;
  }[];
}
export interface ProjectIdWithTranslations {
  general: {
    _id: string;
    title: string;
    type: ProjectType;
    status: ProjectStatus;
    startDate?: string;
    endDate?: string;
    technologies: string[];
    links: {
      github?: string;
      website?: string;
    };
    images?: FileMetadata[];
  };
  translations: ProjectTranslation[];
}
