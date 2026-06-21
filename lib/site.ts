const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || vercelUrl || "http://localhost:3000";

export const site = {
  name: "Lorenço Macro & Finanzas",
  title: "Lorenço Macro & Finanzas | Publicación económica-financiera",
  description:
    "Noticias, opinión y análisis económico-financiero sobre macroeconomía, mercados, sistema financiero y regulación.",
  headline: "Análisis económico-financiero con foco editorial.",
  dek:
    "Noticias, artículos de opinión y lecturas de reportes oficiales sobre macroeconomía, mercados, regulación y sistema financiero.",
  url: siteUrl,
};
