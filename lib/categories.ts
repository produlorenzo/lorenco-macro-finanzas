export const editorialCategories = [
  { label: "Macro", slug: "macro" },
  { label: "Finanzas", slug: "finanzas" },
  { label: "Normativas", slug: "normativas" },
  { label: "Historia", slug: "historia" },
  { label: "Reflexiones", slug: "reflexiones" },
] as const;

export const validCategoryLabels = editorialCategories.map((category) => category.label);

export const validAuthors = [
  "Martín Ferrer",
  "Clara Montes",
  "Julián Rivas",
  "Emilia Duarte",
  "Tomás Alvarado",
] as const;

export type CategoryLabel = (typeof validCategoryLabels)[number];
export type AuthorName = (typeof validAuthors)[number];

export function slugifyCategory(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getCategoryBySlug(slug: string) {
  return editorialCategories.find((category) => category.slug === slug) ?? null;
}

export function getCategoryByLabel(label: string) {
  return editorialCategories.find((category) => category.label === label) ?? null;
}
