import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import {
  getCategoryByLabel,
  slugifyCategory,
  validAuthors,
  validCategoryLabels,
} from "@/lib/categories";
import { normalizeSearchText } from "@/lib/format";

export type PostStatus = "draft" | "published";

export type Source = {
  title: string;
  url: string;
};

export type Post = {
  slug: string;
  urlPath: string;
  title: string;
  description: string;
  date: string;
  author: string;
  status: PostStatus;
  category: string;
  categorySlug: string;
  tags: string[];
  coverImage?: string;
  sources: Source[];
  body: string;
  readingMinutes: string;
  searchText: string;
};

const postsDirectory = path.join(process.cwd(), "content", "notas");
const requiredFields = ["title", "description", "date", "author", "status", "category", "tags", "sources"];

function fail(fileName: string, message: string): never {
  throw new Error(`Frontmatter inválido en content/notas/${fileName}: ${message}`);
}

function requireString(fileName: string, data: Record<string, unknown>, field: string) {
  const value = data[field];
  if (typeof value !== "string" || !value.trim()) {
    fail(fileName, `falta el campo obligatorio "${field}" o no es texto.`);
  }
  return value.trim();
}

function requireStringArray(fileName: string, data: Record<string, unknown>, field: string) {
  const value = data[field];
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    fail(fileName, `"${field}" debe ser un array de textos.`);
  }
  return value as string[];
}

function requireSources(fileName: string, data: Record<string, unknown>) {
  const value = data.sources;
  if (!Array.isArray(value)) {
    fail(fileName, `"sources" debe existir y ser un array.`);
  }

  return value.map((item, index) => {
    if (!item || typeof item !== "object") {
      fail(fileName, `sources[${index}] debe tener title y url.`);
    }

    const source = item as Record<string, unknown>;
    if (typeof source.title !== "string" || !source.title.trim()) {
      fail(fileName, `sources[${index}].title es obligatorio.`);
    }
    if (typeof source.url !== "string" || !source.url.trim()) {
      fail(fileName, `sources[${index}].url es obligatorio.`);
    }

    return { title: source.title.trim(), url: source.url.trim() };
  });
}

function readPostFile(fileName: string): Post {
  const slug = fileName.replace(/\.mdx?$/, "");
  const fullPath = path.join(postsDirectory, fileName);
  const file = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(file);
  const frontmatter = data as Record<string, unknown>;

  for (const field of requiredFields) {
    if (!(field in frontmatter)) {
      fail(fileName, `falta el campo obligatorio "${field}".`);
    }
  }

  const title = requireString(fileName, frontmatter, "title");
  const description = requireString(fileName, frontmatter, "description");
  const date = requireString(fileName, frontmatter, "date");
  const author = requireString(fileName, frontmatter, "author");
  const status = requireString(fileName, frontmatter, "status");
  const category = requireString(fileName, frontmatter, "category");
  const tags = requireStringArray(fileName, frontmatter, "tags");
  const sources = requireSources(fileName, frontmatter);
  const coverImage = typeof frontmatter.coverImage === "string" && frontmatter.coverImage.trim()
    ? frontmatter.coverImage.trim()
    : undefined;

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    fail(fileName, `"date" debe usar formato YYYY-MM-DD.`);
  }
  if (status !== "published" && status !== "draft") {
    fail(fileName, `"status" debe ser "published" o "draft".`);
  }
  if (!validCategoryLabels.includes(category as (typeof validCategoryLabels)[number])) {
    fail(fileName, `"category" debe ser una de: ${validCategoryLabels.join(", ")}.`);
  }
  if (!validAuthors.includes(author as (typeof validAuthors)[number])) {
    fail(fileName, `"author" debe ser uno de: ${validAuthors.join(", ")}.`);
  }

  const categorySlug = getCategoryByLabel(category)?.slug ?? slugifyCategory(category);

  return {
    slug,
    urlPath: `/notas/${slug}`,
    title,
    description,
    date,
    author,
    status,
    category,
    categorySlug,
    tags,
    coverImage,
    sources,
    body: content,
    readingMinutes: readingTime(content).text.replace("min read", "min de lectura"),
    searchText: normalizeSearchText([title, description, category, author, tags.join(" "), content].join(" ")),
  };
}

export function getAllPosts({ includeDrafts = false } = {}) {
  if (!fs.existsSync(postsDirectory)) return [];

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => /\.mdx?$/.test(fileName))
    .map(readPostFile)
    .filter((post) => includeDrafts || post.status === "published")
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
}

export const getAllNotes = getAllPosts;

export function getPostBySlug(slug: string) {
  return getAllPosts({ includeDrafts: false }).find((item) => item.slug === slug) ?? null;
}

export function getPostsByCategory(categorySlug: string) {
  return getAllPosts().filter((post) => post.categorySlug === categorySlug);
}

export function getPostsByCategoryMap() {
  return getAllPosts().reduce<Record<string, Post[]>>((groups, post) => {
    groups[post.categorySlug] = [...(groups[post.categorySlug] ?? []), post];
    return groups;
  }, {});
}
