import Link from "next/link";
import { notFound } from "next/navigation";
import { resourcesContent } from "@/lib/siteContent";

export function ResourceSectionPage({ href }: { href: string }) {
  const section = resourcesContent.sections.find((item) => item.href === href);

  if (!section) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="editorial-panel p-6 sm:p-8">
        <Link className="text-sm font-semibold uppercase tracking-wide text-accent hover:underline" href="/recursos">
          Recursos
        </Link>
        <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-ink sm:text-5xl">
          {section.title}
        </h1>
      </div>

      <div className="editorial-panel mt-8 max-w-3xl p-6 sm:p-8">
        <p className="text-lg leading-8 text-muted">{section.description}</p>
      </div>
    </section>
  );
}
