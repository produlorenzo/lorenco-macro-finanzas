export const editorialCategories = [
  {
    label: "Macro",
    slug: "macro",
    description: "Coyuntura, actividad, inflación, política fiscal y sector externo.",
  },
  {
    label: "Sistema financiero",
    slug: "sistema-financiero",
    description: "Bancos, crédito, depósitos, tasas y dinámica monetaria.",
  },
  {
    label: "Mercados",
    slug: "mercados",
    description: "Renta fija, acciones, dólar, liquidez y condiciones financieras.",
  },
  {
    label: "Regulación",
    slug: "regulacion",
    description: "Normas, supervisión y cambios institucionales del mercado local.",
  },
  {
    label: "Opinión",
    slug: "opinion",
    description: "Lecturas editoriales y columnas sobre economía y finanzas.",
  },
  {
    label: "Reportes",
    slug: "reportes",
    description: "Análisis de informes oficiales, datos públicos y documentos técnicos.",
  },
] as const;

export type EditorialCategory = (typeof editorialCategories)[number];

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
