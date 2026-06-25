import { ArticleCard } from "@/components/article-card";
import { getCategoryBySlug } from "@/lib/categories";
import { getPostsByCategory } from "@/lib/posts";

export function CategoryPage({ slug }: { slug: string }) {
  const category = getCategoryBySlug(slug);
  const posts = getPostsByCategory(slug);

  if (!category) return null;

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="editorial-panel p-6 sm:p-8">
        <p className="text-sm uppercase tracking-wide text-accent">Categoría</p>
        <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-ink sm:text-5xl">
          {category.label}
        </h1>
      </div>
      <div className="editorial-panel mt-8 p-5">
        {posts.length > 0 ? (
          posts.map((post) => <ArticleCard key={post.slug} post={post} />)
        ) : (
          <p className="py-5 text-muted">Todavía no hay notas publicadas.</p>
        )}
      </div>
    </section>
  );
}
