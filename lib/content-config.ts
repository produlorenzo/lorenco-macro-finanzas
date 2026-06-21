export const defaultCoverImage = "/images/lorenco-default-cover.png";
export const siteLogo = "/images/lorenco-logo.png";

export function getPostCoverImage(coverImage?: string) {
  return coverImage && coverImage.trim() ? coverImage : defaultCoverImage;
}

export function hasCustomPostCover(coverImage?: string) {
  return Boolean(coverImage && coverImage.trim());
}
