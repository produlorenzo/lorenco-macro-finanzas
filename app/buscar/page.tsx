import type { Metadata } from "next";
import { PublicationsSearch } from "@/components/publications-search";
import { getAllNotes } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Buscar",
  description: "Búsqueda local de notas de Lorenço Magazine.",
};

export default function SearchPage() {
  const posts = getAllNotes();

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="editorial-panel p-6 sm:p-8">
        <p className="text-sm uppercase tracking-wide text-accent">Archivo local</p>
        <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-ink sm:text-5xl">
          Buscar
        </h1>
      </div>
      <div className="editorial-panel mt-8 p-5">
        <PublicationsSearch posts={posts} />
      </div>
    </section>
  );
}
