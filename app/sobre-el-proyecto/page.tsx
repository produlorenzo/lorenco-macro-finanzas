import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Sobre el proyecto",
  description: "Información institucional sobre Lorenço Magazine.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <PageHero eyebrow="Institucional" title="Sobre el proyecto" />
      <article className="prose prose-invert editorial-panel mt-10 max-w-3xl p-6 prose-headings:font-serif sm:p-8">
        <p>
          Lorenço Magazine es un proyecto individual de análisis económico-financiero, enfocado en
          coyuntura macroeconómica, finanzas, normativas, historia económica y reflexiones sobre
          mercados y datos públicos.
        </p>
        <p>Los autores que firman las notas son personajes ficticios.</p>
        <p>
          El contenido tiene fines informativos y analíticos. No constituye asesoramiento financiero
          ni recomendación de inversión.
        </p>
      </article>
    </section>
  );
}
