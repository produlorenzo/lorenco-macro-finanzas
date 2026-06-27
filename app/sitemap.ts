import type { MetadataRoute } from "next";
import { editorialCategories } from "@/lib/categories";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";
import { resourcesContent } from "@/lib/siteContent";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/buscar", "/sobre-el-proyecto", "/contacto", "/recursos"].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
  }));

  const categoryRoutes = editorialCategories.map((category) => ({
    url: `${site.url}/${category.slug}`,
    lastModified: new Date(),
  }));

  const resourceRoutes = resourcesContent.sections.map((section) => ({
    url: `${site.url}${section.href}`,
    lastModified: new Date(),
  }));

  const postRoutes = getAllPosts().map((post) => ({
    url: `${site.url}${post.urlPath}`,
    lastModified: new Date(`${post.date}T00:00:00`),
  }));

  return [...staticRoutes, ...categoryRoutes, ...resourceRoutes, ...postRoutes];
}
