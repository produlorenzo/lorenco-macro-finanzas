import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { editorialCategories } from "@/lib/categories";
import { heroBackgroundImage } from "@/lib/content-config";
import { getAllPosts, getPostsByCategoryMap } from "@/lib/posts";
import { homeContent } from "@/lib/siteContent";

export default function HomePage() {
  const posts = getAllPosts();
  const [mainPost, ...latestPosts] = posts;
  const postsByCategory = getPostsByCategoryMap();

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      {homeContent.showHero && (
        <section
          className="hero-panel overflow-hidden bg-cover bg-center p-6 sm:p-8"
          style={{ backgroundImage: `linear-gradient(90deg, rgba(3, 9, 18, 0.92), rgba(7, 20, 33, 0.76)), url(${heroBackgroundImage})` }}
        >
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-wide text-accent">{homeContent.heroEyebrow}</p>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-ink sm:text-6xl">
              {homeContent.heroTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{homeContent.heroDescription}</p>
          </div>
        </section>
      )}

      {homeContent.showMainNote && (
        <section className="py-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="font-serif text-3xl font-bold text-ink">{homeContent.mainSectionTitle}</h2>
            <Link className="text-sm uppercase tracking-wide text-accent hover:underline" href="/buscar">
              {homeContent.searchLinkLabel}
            </Link>
          </div>
          {mainPost ? (
            <ArticleCard post={mainPost} variant="feature" />
          ) : (
            <p className="editorial-panel p-6 text-muted">{homeContent.emptyMainText}</p>
          )}
        </section>
      )}

      {homeContent.showLatestNotes && latestPosts.length > 0 && (
        <section className="editorial-panel p-5">
          <h2 className="font-serif text-3xl font-bold text-ink">{homeContent.latestSectionTitle}</h2>
          <div className="mt-4">
            {latestPosts.slice(0, homeContent.latestNotesLimit).map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {homeContent.showCategoryBlocks && (
        <section className="py-10">
          <h2 className="mb-5 font-serif text-3xl font-bold text-ink">{homeContent.categoryBlocksTitle}</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            {editorialCategories.map((category) => {
              const categoryPosts = postsByCategory[category.slug]?.slice(0, homeContent.categoryNotesLimit) ?? [];

              return (
                <section className="editorial-panel p-5" key={category.slug}>
                  <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
                    <h3 className="font-serif text-2xl font-bold text-ink">{category.label}</h3>
                    <Link className="text-sm uppercase tracking-wide text-accent hover:underline" href={`/${category.slug}`}>
                      {homeContent.categoryViewLabel}
                    </Link>
                  </div>
                  <div className="mt-2">
                    {categoryPosts.length > 0 ? (
                      categoryPosts.map((post) => <ArticleCard key={post.slug} post={post} variant="compact" />)
                    ) : (
                      <p className="py-5 text-sm text-muted">{homeContent.emptyCategoryText}</p>
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
