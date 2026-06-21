import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostList } from "@/components/post-list";
import { editorialCategories, getCategoryBySlug } from "@/lib/categories";
import { getPostsByCategory } from "@/lib/posts";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return editorialCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) return {};

  return {
    title: category.label,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const posts = getPostsByCategory(category.slug);

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="border-b border-line pb-8 dark:border-white/10">
        <Link className="text-sm uppercase tracking-wide text-accent hover:underline dark:text-brass" href="/publicaciones">
          Publicaciones
        </Link>
        <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-ink dark:text-paper sm:text-5xl">
          {category.label}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-muted dark:text-stone-300">
          {category.description}
        </p>
      </div>
      <div className="mt-8">
        <PostList posts={posts} />
      </div>
    </section>
  );
}
