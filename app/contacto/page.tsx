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
      <div className="mt-10 grid gap-10 lg:grid-cols-[18rem_1fr]">
        <div className="border-y border-line py-5 text-sm leading-6 text-muted dark:border-white/10 dark:text-stone-300">
          <p>
            Para consultas, comentarios o propuestas vinculadas al contenido publicado en Lorenço
            Macro & Finanzas, podés enviar un mensaje a través del formulario.
          </p>
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
