import type { Metadata } from "next";
import { PublicationsSearch } from "@/components/publications-search";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Publicaciones",
  description: "Publicaciones de Lorenço Macro & Finanzas.",
};

export default function PublicationsPage() {
  const posts = getAllPosts();

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="max-w-3xl">
        <h1 className="font-serif text-4xl font-bold text-ink dark:text-paper">Publicaciones</h1>
      </div>
      <div className="mt-8">
        <PublicationsSearch posts={posts} />
      </div>
    </section>
  );
}
