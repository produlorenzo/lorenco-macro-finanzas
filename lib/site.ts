const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || vercelUrl || "http://localhost:3000";

export const site = {
  name: "Lorenço Macro & Finanzas",
  title: "Lorenço Macro & Finanzas | Análisis económico-financiero",
  description:
    "Lecturas sobre la coyuntura macroeconómica y financiera a partir de reportes, datos y fuentes públicas.",
  headline: "Lecturas sobre la coyuntura macroeconómica y financiera.",
  dek:
    "Análisis basado en reportes, datos y fuentes públicas, con foco en Argentina, mercados y sistema financiero.",
  url: siteUrl,
};
