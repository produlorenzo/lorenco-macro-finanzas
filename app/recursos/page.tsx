import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { getPostsByCategory } from "@/lib/posts";
import { pagesContent, resourcesContent } from "@/lib/siteContent";

export const metadata: Metadata = {
  title: resourcesContent.title,
};

export default function RecursosPage() {
  const posts = getPostsByCategory("recursos");

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="editorial-panel p-6 sm:p-8">
        <p className="text-sm uppercase tracking-wide text-accent">{pagesContent.category.eyebrow}</p>
        <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-ink sm:text-5xl">
          {resourcesContent.title}
        </h1>
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {resourcesContent.sections.map((section) => (
          <Link
            className="editorial-panel group block p-5 transition hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_16px_36px_rgba(37,99,235,0.10)] sm:p-6"
            href={section.href}
            key={section.href}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-serif text-2xl font-bold leading-snug text-ink transition group-hover:text-accent">
                {section.title}
              </h2>
              <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-night-soft text-accent transition group-hover:border-accent/40 group-hover:bg-accent group-hover:text-white">
                →
              </span>
            </div>
            <p className="mt-3 text-base leading-7 text-muted">{section.description}</p>
          </Link>
        ))}
      </section>

      <section className="editorial-panel mt-8 p-5 sm:p-6">
        <h2 className="font-serif text-3xl font-bold text-ink">{resourcesContent.title}</h2>
        <div className="mt-2">
          {posts.length > 0 ? (
            posts.map((post) => <ArticleCard key={post.slug} post={post} />)
          ) : (
            <p className="py-5 text-muted">{pagesContent.category.emptyText}</p>
          )}
        </div>
      </section>
    </section>
  );
}
