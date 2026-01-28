export const SOCIAL_PLATFORM_ENUM = [
  'github',
  'linkedin',
  'twitter',
  'instagram',
  'website',
] as const;

export type SocialPlatformType = (typeof SOCIAL_PLATFORM_ENUM)[number];
type SocialLinks = Partial<Record<SocialPlatformType, string>>;

export interface Contact {
  email: string;
  phone?: string;
  socialLinks?: SocialLinks;
  createdAt: string;
  updatedAt: string;
}
