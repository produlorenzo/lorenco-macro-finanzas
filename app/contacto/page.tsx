import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacto con Lorenço Macro & Finanzas.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <PageHero
        eyebrow="Contacto"
        title="Contacto"
        description="Consultas, comentarios o propuestas vinculadas al contenido publicado."
      />
      <div className="prose prose-stone mt-10 max-w-3xl dark:prose-invert">
        <p>
          Para consultas, comentarios o propuestas vinculadas al contenido publicado en Lorenço Macro
          & Finanzas, podés enviar un mensaje a través del formulario de contacto.
        </p>
      </div>
      <div className="max-w-3xl">
        <ContactForm />
      </div>
    </section>
  );
}
