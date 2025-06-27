import { FileMetadata } from './image';

export const PROJECT_STATUSES = ['in_progress', 'completed', 'paused'] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export const PROJECT_TYPES = ['personal', 'company', 'freelance'] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number];

export interface Project {
  _id: string;
  locale: string;
  description: string;
  general: {
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
  };
  createdAt: string;
  updatedAt: string;
}
