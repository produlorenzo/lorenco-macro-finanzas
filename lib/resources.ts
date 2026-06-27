import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ResourcePage = {
  slug: string;
  title: string;
  description: string;
  cover?: string;
  externalUrl?: string;
  externalLabel?: string;
  body: string;
};

const resourcesDirectory = path.join(process.cwd(), "content", "recursos");

function fail(fileName: string, message: string): never {
  throw new Error(`Frontmatter inválido en content/recursos/${fileName}: ${message}`);
}

function requireString(fileName: string, data: Record<string, unknown>, field: string) {
  const value = data[field];

  if (typeof value !== "string" || !value.trim()) {
    fail(fileName, `falta el campo obligatorio "${field}" o no es texto.`);
  }

  return value.trim();
}

function optionalString(data: Record<string, unknown>, field: string) {
  const value = data[field];
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function readResourceFile(fileName: string): ResourcePage {
  const slug = fileName.replace(/\.mdx?$/, "");
  const fullPath = path.join(resourcesDirectory, fileName);
  const file = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(file);
  const frontmatter = data as Record<string, unknown>;

  return {
    slug,
    title: requireString(fileName, frontmatter, "title"),
    description: requireString(fileName, frontmatter, "description"),
    cover: optionalString(frontmatter, "cover"),
    externalUrl: optionalString(frontmatter, "externalUrl"),
    externalLabel: optionalString(frontmatter, "externalLabel"),
    body: content,
  };
}

export function getAllResources() {
  if (!fs.existsSync(resourcesDirectory)) return [];

  return fs
    .readdirSync(resourcesDirectory)
    .filter((fileName) => /\.mdx?$/.test(fileName))
    .map(readResourceFile)
    .sort((a, b) => a.title.localeCompare(b.title, "es"));
}

export function getResourceBySlug(slug: string) {
  const fileName = `${slug}.mdx`;
  const fullPath = path.join(resourcesDirectory, fileName);

  if (!fs.existsSync(fullPath)) return null;

  return readResourceFile(fileName);
}
