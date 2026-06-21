import type { MetadataRoute } from "next";
import { editorialCategories } from "@/lib/categories";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/publicaciones", "/archivo", "/sobre-el-proyecto", "/contacto"].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
  }));

  const postRoutes = getAllPosts().map((post) => ({
    url: `${site.url}${post.urlPath}`,
    lastModified: new Date(`${post.date}T00:00:00`),
  }));

  const categoryRoutes = editorialCategories.map((category) => ({
    url: `${site.url}/categorias/${category.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...categoryRoutes, ...postRoutes];
}
