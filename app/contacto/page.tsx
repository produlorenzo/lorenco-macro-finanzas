import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacto con Lorenço Macro & Finanzas.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="prose prose-stone max-w-none dark:prose-invert">
        <h1>Contacto</h1>
        <p>
          Para consultas, comentarios o propuestas vinculadas al contenido publicado en Lorenço Macro
          & Finanzas, podés enviar un mensaje a través del formulario de contacto.
        </p>
      </div>
      <ContactForm />
    </section>
  );
}
