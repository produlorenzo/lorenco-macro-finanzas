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
      <h1 className="font-serif text-4xl font-bold text-ink dark:text-paper">Archivo</h1>
      {entries.length === 0 ? (
        <p className="mt-8 border-y border-line/80 py-8 text-muted dark:border-white/10 dark:text-stone-400">
          Todavía no hay publicaciones disponibles.
        </p>
      ) : (
        <div className="mt-8 divide-y divide-line/80 border-y border-line/80 dark:divide-white/10 dark:border-white/10">
          {entries.map(([period, posts]) => (
            <section className="grid gap-4 py-6 md:grid-cols-[12rem_1fr]" key={period}>
              <h2 className="text-sm uppercase text-muted dark:text-stone-400">{period}</h2>
              <div className="space-y-4">
                {posts.map((post) => (
                  <article key={post.slug}>
                    <Link className="font-serif text-xl font-bold shadow-rule transition hover:text-accent dark:hover:text-brass" href={`/publicaciones/${post.slug}`}>
                      {post.title}
                    </Link>
                    <p className="mt-1 text-sm text-muted dark:text-stone-400">{formatDate(post.date)}</p>
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
