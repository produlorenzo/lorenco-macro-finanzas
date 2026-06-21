import type { Metadata } from "next";
import Link from "next/link";
import { PublicationsSearch } from "@/components/publications-search";
import { editorialCategories } from "@/lib/categories";
import { getAllPublications } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Publicaciones",
  description: "Publicaciones de Lorenço Macro & Finanzas.",
};

export default function PublicationsPage() {
  const posts = getAllPublications();

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="grid gap-8 border-b border-line pb-8 dark:border-white/10 lg:grid-cols-[1fr_20rem]">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-wide text-accent dark:text-brass">Archivo editorial</p>
          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-ink dark:text-paper sm:text-5xl">
            Publicaciones
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted dark:text-stone-300">
            Noticias, análisis de reportes oficiales y artículos de opinión sobre macroeconomía,
            sistema financiero, mercados y regulación.
          </p>
        </div>
        <div className="flex flex-wrap content-start gap-2">
          {editorialCategories.map((category) => (
            <Link
              className="border border-line px-3 py-2 text-sm text-muted transition hover:border-accent hover:text-accent dark:border-white/10 dark:text-stone-300 dark:hover:border-brass dark:hover:text-brass"
              href={`/categorias/${category.slug}`}
              key={category.slug}
            >
              {category.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <PublicationsSearch posts={posts} />
      </div>
    </section>
  );
}
