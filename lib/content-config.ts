import settings from "@/content/site/settings.json";

export const defaultCoverImage = settings.defaultCoverImage;
export const siteLogo = settings.logoImage;
export const heroBackgroundImage = settings.heroBackgroundImage;

export function getPostCoverImage(coverImage?: string) {
  return coverImage && coverImage.trim() ? coverImage : defaultCoverImage;
}

export function hasCustomPostCover(coverImage?: string) {
  return Boolean(coverImage && coverImage.trim());
}
