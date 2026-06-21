import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Sobre el proyecto",
  description: "Información institucional sobre Lorenço Macro & Finanzas.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <PageHero
        eyebrow="Institucional"
        title="Sobre el proyecto"
        description="Un espacio editorial para ordenar señales macroeconómicas y financieras desde fuentes públicas."
      />
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_18rem]">
        <article className="prose prose-invert editorial-panel max-w-3xl p-6 prose-headings:font-serif sm:p-8">
          <p>
            Lorenço Macro & Finanzas es un espacio de análisis económico-financiero enfocado en la
            coyuntura macroeconómica, el sistema financiero, los mercados y la lectura de reportes
            públicos.
          </p>
          <p>
            El objetivo es ordenar información dispersa, identificar señales relevantes y poner en
            valor datos, gráficos o metodologías que muchas veces quedan fuera de la discusión diaria.
          </p>
          <p>
            El contenido tiene fines informativos y analíticos. No constituye asesoramiento financiero
            ni recomendación de inversión.
          </p>
        </article>
        <aside className="editorial-panel p-5 text-sm leading-6 text-muted dark:text-stone-300">
          <p className="font-bold uppercase tracking-wide text-accent dark:text-brass">Enfoque</p>
          <p className="mt-3">
            Datos públicos, reportes oficiales, regulación, mercado local y lectura macrofinanciera
            con tono sobrio.
          </p>
        </aside>
      </div>
    </section>
  );
}
