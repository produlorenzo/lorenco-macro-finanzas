import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { normalizeSearchText } from "@/lib/format";

export type PostStatus = "draft" | "published";

export type Source = {
  title: string;
  url?: string;
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
  tags: string[];
  coverImage: string;
  sources: Source[];
  body: string;
  readingMinutes: string;
  searchText: string;
};

const contentSources = [
  {
    directory: path.join(process.cwd(), "content", "publicaciones"),
    publishByDefault: false,
    basePath: "/publicaciones",
  },
  {
    directory: path.join(process.cwd(), "content", "notas"),
    publishByDefault: true,
    basePath: "/notas",
  },
];

const defaultCoverImage = "/images/publicaciones/default-cover.svg";
const datePrefixPattern = /^(\d{4}-\d{2}-\d{2})-/;

function ensureString(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function ensureStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item) => typeof item === "string") : [];
}

function ensureSources(value: unknown): Source[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (typeof item === "string") return { title: item };
      if (!item || typeof item !== "object") return null;

      const source = item as Record<string, unknown>;
      const title = ensureString(source.title);
      if (!title) return null;

      return {
        title,
        url: ensureString(source.url) || undefined,
      };
    })
    .filter((item): item is Source => Boolean(item));
}

function titleFromSlug(slug: string) {
  return slug
    .replace(datePrefixPattern, "")
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function dateFromSlug(slug: string) {
  return slug.match(datePrefixPattern)?.[1];
}

function descriptionFromContent(content: string) {
  return content
    .split(/\r?\n/)
    .map((line) => line.replace(/^#+\s*/, "").trim())
    .find(Boolean) ?? "";
}

function resolveStatus(value: unknown, publishByDefault: boolean): PostStatus {
  if (value === "draft") return "draft";
  if (value === "published" || publishByDefault) return "published";
  return "draft";
}

function readPostFile(directory: string, fileName: string, publishByDefault: boolean, basePath: string): Post {
  const slug = fileName.replace(/\.mdx?$/, "");
  const fullPath = path.join(directory, fileName);
  const file = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(file);
  const title = ensureString(data.title, titleFromSlug(slug));
  const description = ensureString(data.description, descriptionFromContent(content));
  const tags = ensureStringArray(data.tags);
  const category = ensureString(data.category, ensureString(data.categoria, "Nota"));

  return {
    slug,
    urlPath: `${basePath}/${slug}`,
    title,
    description,
    date: ensureString(data.date, dateFromSlug(slug) ?? new Date().toISOString().slice(0, 10)),
    author: ensureString(data.author, "Lorenço Macro & Finanzas"),
    status: resolveStatus(data.status, publishByDefault),
    category,
    tags,
    coverImage: ensureString(data.coverImage, defaultCoverImage),
    sources: ensureSources(data.sources),
    body: content,
    readingMinutes: readingTime(content).text.replace("min read", "min de lectura"),
    searchText: normalizeSearchText([title, description, tags.join(" "), content].join(" ")),
  };
}

export function getAllPosts({ includeDrafts = false } = {}) {
  return contentSources
    .flatMap((source) => {
      if (!fs.existsSync(source.directory)) return [];

      return fs
        .readdirSync(source.directory)
        .filter((fileName) => /\.mdx?$/.test(fileName))
        .map((fileName) => readPostFile(source.directory, fileName, source.publishByDefault, source.basePath));
    })
    .filter((post) => includeDrafts || post.status === "published")
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
}

export function getAllPublications({ includeDrafts = false } = {}) {
  const source = contentSources.find((item) => item.basePath === "/publicaciones");
  if (!source || !fs.existsSync(source.directory)) return [];

  return fs
    .readdirSync(source.directory)
    .filter((fileName) => /\.mdx?$/.test(fileName))
    .map((fileName) => readPostFile(source.directory, fileName, source.publishByDefault, source.basePath))
    .filter((post) => includeDrafts || post.status === "published")
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
}

export function getAllNotes({ includeDrafts = false } = {}) {
  const source = contentSources.find((item) => item.basePath === "/notas");
  if (!source || !fs.existsSync(source.directory)) return [];

  return fs
    .readdirSync(source.directory)
    .filter((fileName) => /\.mdx?$/.test(fileName))
    .map((fileName) => readPostFile(source.directory, fileName, source.publishByDefault, source.basePath))
    .filter((post) => includeDrafts || post.status === "published")
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
}

export function getPostBySlug(slug: string) {
  const post = getAllPublications({ includeDrafts: false }).find((item) => item.slug === slug);
  return post ?? null;
}

export function getNoteBySlug(slug: string) {
  const post = getAllNotes({ includeDrafts: false }).find((item) => item.slug === slug);
  return post ?? null;
}

export function getArchiveGroups() {
  return getAllPosts().reduce<Record<string, Post[]>>((groups, post) => {
    const date = new Date(`${post.date}T00:00:00`);
    const key = new Intl.DateTimeFormat("es-AR", {
      year: "numeric",
      month: "long",
    }).format(date);

    groups[key] = [...(groups[key] ?? []), post];
    return groups;
  }, {});
}
