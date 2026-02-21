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

export interface CategoriesWithTranslations {
  _id: string;
  key: string;
  order: number;
  translations: { locale: string; name: string }[];
}

export interface SkillItem {
  _id: string;
  name: string;
  icon?: FileMetadata;
  // category: {
  //   _id: string;
  //   key: string;
  //   order: number;
  //   createdAt: string;
  //   updatedAt: string;
  // };
  createdAt: string;
  updatedAt: string;
}
