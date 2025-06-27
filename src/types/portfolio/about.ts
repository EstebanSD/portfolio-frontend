import { FileMetadata } from './image';

export interface About {
  _id: string;
  locale: string;
  title: string;
  bio: string;
  tagline?: string;
  cv?: FileMetadata;
  general: {
    _id: string;
    fullName: string;
    birthYear?: number;
    location?: string;
    image?: FileMetadata;
    positioningTags?: string[];
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}
