import { PostList } from "@/components/post-list";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <div className="max-w-4xl">
        <p className="mb-4 text-sm uppercase text-accent dark:text-brass">{site.name}</p>
        <h1 className="font-serif text-4xl font-bold leading-tight text-ink dark:text-paper sm:text-6xl">
          {site.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted dark:text-stone-300">
          {site.dek}
        </p>
      </div>
      <div className="mt-14">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 className="font-serif text-2xl font-bold text-ink dark:text-paper">Publicaciones</h2>
        </div>
        <PostList posts={posts} />
      </div>
    </section>
  );
}
