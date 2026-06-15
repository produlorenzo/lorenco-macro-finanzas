import type { Metadata } from "next";
import { PostList } from "@/components/post-list";
import { getAllNotes } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Notas",
  description: "Notas publicadas por Lorenço Macro & Finanzas.",
};

export default function NotesPage() {
  const notes = getAllNotes();

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="max-w-3xl">
        <h1 className="font-serif text-4xl font-bold text-ink dark:text-paper">Notas</h1>
        <p className="mt-4 text-lg leading-8 text-muted dark:text-stone-300">
          Publicaciones Markdown generadas desde la sala de redacción.
        </p>
      </div>
      <div className="mt-8">
        <PostList posts={notes} />
      </div>
    </section>
  );
}
