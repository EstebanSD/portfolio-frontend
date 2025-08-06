import { FileMetadata } from './image';

export interface AboutGeneral {
  _id: string;
  fullName: string;
  birthYear?: number;
  location?: string;
  image?: FileMetadata;
  positioningTags?: string[];
  createdAt: string;
  updatedAt: string;
}
export interface AboutTranslation {
  _id: string;
  locale: string;
  title: string;
  bio: string;
  tagline?: string;
  cv?: FileMetadata;
  createdAt: string;
  updatedAt: string;
}
export interface About {
  _id: string;
  locale: string;
  title: string;
  bio: string;
  tagline?: string;
  cv?: FileMetadata;
  general: AboutGeneral;
  createdAt: string;
  updatedAt: string;
}

export interface AboutAll {
  general: Omit<AboutGeneral, 'image'>;
  translations: AboutTranslation[];
}
