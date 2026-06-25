import { homeContent, siteSettings } from "@/lib/siteContent";

export const site = {
  name: siteSettings.siteName,
  title: siteSettings.seoTitle,
  description: siteSettings.seoDescription,
  headline: homeContent.heroTitle,
  dek: homeContent.heroDescription,
  url: siteSettings.siteUrl,
};
