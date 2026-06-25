import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacto con Lorenço Magazine.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <PageHero eyebrow="Contacto" title="Contacto" />
      <div className="editorial-panel mt-10 max-w-3xl p-6 sm:p-8">
        <p className="text-lg leading-8 text-muted">
          Para consultas vinculadas al proyecto, podés escribir a{" "}
          <a className="text-accent underline-offset-4 hover:underline" href="mailto:produ.lorenzo@gmail.com">
            produ.lorenzo@gmail.com
          </a>
          .
        </p>
      </div>
    </section>
  );
}
