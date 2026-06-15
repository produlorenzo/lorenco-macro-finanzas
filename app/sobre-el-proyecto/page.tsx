import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre el proyecto",
  description: "Información institucional sobre Lorenço Macro & Finanzas.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <article className="prose prose-stone max-w-none dark:prose-invert">
        <h1>Sobre el proyecto</h1>
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
    </section>
  );
}
