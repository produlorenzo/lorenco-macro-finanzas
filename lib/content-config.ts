import settings from "@/content/site/settings.json";

export const defaultCover = settings.defaultCover;
export const siteLogo = settings.logoImage;
export const heroBackgroundImage = settings.heroBackgroundImage;

export function getPostCover(cover?: string) {
  return cover && cover.trim() ? cover : defaultCover;
}

export function hasCustomPostCover(cover?: string) {
  return Boolean(cover && cover.trim());
}
