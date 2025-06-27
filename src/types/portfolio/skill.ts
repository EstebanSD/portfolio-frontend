import { FileMetadata } from './image';

interface Category {
  _id: string;
  key: string;
  order: number;
}

export interface SkillCategory {
  _id: string;
  locale: string;
  name: string;
  general: Category;
}

export interface Skill {
  _id: string;
  name: string;
  icon?: FileMetadata;
  category: Category;
}
