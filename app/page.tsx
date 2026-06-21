import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { PostList } from "@/components/post-list";
import { editorialCategories } from "@/lib/categories";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export default function HomePage() {
  const posts = getAllPosts();
  const [featuredPost, ...restPosts] = posts;
  const secondaryPosts = restPosts.slice(0, 3);
  const latestPosts = posts.slice(0, 8);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <section className="editorial-panel p-6 sm:p-8">
        <p className="text-sm uppercase tracking-wide text-accent dark:text-brass">{site.name}</p>
        <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_18rem] lg:items-end">
          <div>
            <h1 className="max-w-4xl font-serif text-4xl font-bold leading-tight text-ink dark:text-paper sm:text-6xl">
              {site.headline}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted dark:text-stone-300">
              {site.dek}
            </p>
          </div>
          <div className="border-t border-line pt-4 text-sm leading-6 text-muted dark:border-white/10 dark:text-stone-300 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            Publicación económica-financiera orientada a noticias, opinión y análisis de reportes
            oficiales.
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-bold text-ink dark:text-paper">Nota destacada</h2>
          <Link className="text-sm uppercase tracking-wide text-accent hover:underline dark:text-brass" href="/publicaciones">
            Ver publicaciones
          </Link>
        </div>
        {featuredPost ? (
          <ArticleCard post={featuredPost} variant="feature" />
        ) : (
          <p className="border-y border-line/80 py-8 text-muted dark:border-white/10 dark:text-stone-400">
            Todavía no hay publicaciones disponibles.
          </p>
        )}
      </section>

      {secondaryPosts.length > 0 && (
        <section className="editorial-panel grid gap-8 p-5 lg:grid-cols-3">
          {secondaryPosts.map((post) => (
            <ArticleCard key={post.slug} post={post} variant="compact" />
          ))}
        </section>
      )}

      <section className="grid gap-10 py-10 lg:grid-cols-[1fr_18rem]">
        <div className="editorial-panel p-5">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="font-serif text-3xl font-bold text-ink dark:text-paper">Últimas publicaciones</h2>
          </div>
          <PostList posts={latestPosts} />
        </div>

        <aside className="space-y-8">
          <section className="editorial-panel p-5">
            <h2 className="border-b border-line pb-3 font-serif text-2xl font-bold text-ink dark:border-white/10 dark:text-paper">
              Secciones
            </h2>
            <div className="mt-4 space-y-4">
              {editorialCategories.map((category) => (
                <Link
                  className="block border-b border-line pb-4 transition hover:border-accent dark:border-white/10 dark:hover:border-brass"
                  href={`/categorias/${category.slug}`}
                  key={category.slug}
                >
                  <span className="font-bold text-ink dark:text-paper">{category.label}</span>
                  <span className="mt-1 block text-sm leading-6 text-muted dark:text-stone-400">
                    {category.description}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section className="editorial-panel p-5">
            <h2 className="font-serif text-2xl font-bold text-ink dark:text-paper">Sobre el proyecto</h2>
            <p className="mt-3 text-sm leading-6 text-muted dark:text-stone-300">
              Lorenço Macro & Finanzas ordena información económica y financiera desde fuentes
              públicas, con foco en datos, regulación y lectura de coyuntura.
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm uppercase tracking-wide">
              <Link className="text-accent hover:underline dark:text-brass" href="/sobre-el-proyecto">
                Leer más
              </Link>
              <Link className="text-accent hover:underline dark:text-brass" href="/contacto">
                Contacto
              </Link>
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}
