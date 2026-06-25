import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { editorialCategories } from "@/lib/categories";
import { getAllPosts, getPostsByCategoryMap } from "@/lib/posts";
import { site } from "@/lib/site";

export default function HomePage() {
  const posts = getAllPosts();
  const [mainPost, ...latestPosts] = posts;
  const postsByCategory = getPostsByCategoryMap();

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <section className="hero-panel overflow-hidden p-6 sm:p-8">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-wide text-accent">{site.name}</p>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-ink sm:text-6xl">
            {site.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{site.dek}</p>
        </div>
      </section>

      <section className="py-10">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-bold text-ink">Nota principal</h2>
          <Link className="text-sm uppercase tracking-wide text-accent hover:underline" href="/buscar">
            Buscar notas
          </Link>
        </div>
        {mainPost ? (
          <ArticleCard post={mainPost} variant="feature" />
        ) : (
          <p className="editorial-panel p-6 text-muted">Todavía no hay notas publicadas.</p>
        )}
      </section>

      {latestPosts.length > 0 && (
        <section className="editorial-panel p-5">
          <h2 className="font-serif text-3xl font-bold text-ink">Últimas notas</h2>
          <div className="mt-4">
            {latestPosts.slice(0, 6).map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      <section className="grid gap-6 py-10 lg:grid-cols-2">
        {editorialCategories.map((category) => {
          const categoryPosts = postsByCategory[category.slug]?.slice(0, 3) ?? [];

          return (
            <section className="editorial-panel p-5" key={category.slug}>
              <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
                <h2 className="font-serif text-2xl font-bold text-ink">{category.label}</h2>
                <Link className="text-sm uppercase tracking-wide text-accent hover:underline" href={`/${category.slug}`}>
                  Ver sección
                </Link>
              </div>
              <div className="mt-2">
                {categoryPosts.length > 0 ? (
                  categoryPosts.map((post) => <ArticleCard key={post.slug} post={post} variant="compact" />)
                ) : (
                  <p className="py-5 text-sm text-muted">Todavía no hay notas publicadas en esta categoría.</p>
                )}
              </div>
            </section>
          );
        })}
      </section>
    </div>
  );
}
