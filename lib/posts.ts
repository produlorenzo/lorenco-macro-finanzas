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
  title: string;
  description: string;
  date: string;
  author: string;
  status: PostStatus;
  tags: string[];
  coverImage: string;
  sources: Source[];
  body: string;
  readingMinutes: string;
  searchText: string;
};

const postsDirectory = path.join(process.cwd(), "content", "publicaciones");

function ensureString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
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

function readPostFile(fileName: string): Post {
  const slug = fileName.replace(/\.mdx?$/, "");
  const fullPath = path.join(postsDirectory, fileName);
  const file = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(file);
  const title = ensureString(data.title);
  const description = ensureString(data.description);
  const tags = ensureStringArray(data.tags);

  return {
    slug,
    title,
    description,
    date: ensureString(data.date),
    author: ensureString(data.author, "Lorenço Macro & Finanzas"),
    status: data.status === "published" ? "published" : "draft",
    tags,
    coverImage: ensureString(data.coverImage),
    sources: ensureSources(data.sources),
    body: content,
    readingMinutes: readingTime(content).text.replace("min read", "min de lectura"),
    searchText: normalizeSearchText([title, description, tags.join(" "), content].join(" ")),
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

export function getPostBySlug(slug: string) {
  const post = getAllPosts({ includeDrafts: false }).find((item) => item.slug === slug);
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
