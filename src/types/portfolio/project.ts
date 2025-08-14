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

export interface PrivateProjectQueryFilters extends ProjectQueryFilters {
  locale?: string;
}

export type ProjectsMap = Record<string, Project[]>;
