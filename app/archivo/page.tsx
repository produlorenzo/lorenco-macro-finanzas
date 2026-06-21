import type { Metadata } from "next";
import Link from "next/link";
import { formatDate } from "@/lib/format";
import { getArchiveGroups } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Archivo",
  description: "Archivo de publicaciones de Lorenço Macro & Finanzas.",
};

export default function ArchivePage() {
  const groups = getArchiveGroups();
  const entries = Object.entries(groups);

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="editorial-panel max-w-3xl p-6 sm:p-8">
        <p className="text-sm uppercase tracking-wide text-accent dark:text-brass">Histórico</p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-ink dark:text-paper">Archivo</h1>
        <p className="mt-4 text-lg leading-8 text-muted dark:text-stone-300">
          Índice cronológico de publicaciones, ordenado por mes.
        </p>
      </div>
      {entries.length === 0 ? (
        <p className="mt-8 border-y border-line/80 py-8 text-muted dark:border-white/10 dark:text-stone-400">
          Todavía no hay publicaciones disponibles.
        </p>
      ) : (
        <div className="editorial-panel mt-8 divide-y divide-line/80 p-5 dark:divide-white/10">
          {entries.map(([period, posts]) => (
            <section className="grid gap-4 py-6 md:grid-cols-[12rem_1fr]" key={period}>
              <h2 className="text-sm uppercase tracking-wide text-muted dark:text-stone-400">{period}</h2>
              <div className="space-y-4">
                {posts.map((post) => (
                  <article key={post.slug}>
                    <Link
                      className="font-serif text-xl font-bold transition hover:text-accent dark:hover:text-brass"
                      href={post.urlPath}
                    >
                      {post.title}
                    </Link>
                    <p className="mt-1 text-sm text-muted dark:text-stone-400">
                      {formatDate(post.date)} · {post.category}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </section>
  );
}
