import Link from "next/link";
import { getPostCoverImage } from "@/lib/content-config";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/format";

export function PostList({ posts }: { posts: Post[] }) {
  if (!posts.length) {
    return (
      <p className="border-y border-line/80 py-8 text-muted dark:border-white/10 dark:text-stone-400">
        Todavía no hay publicaciones disponibles.
      </p>
    );
  }

  return (
    <div className="divide-y divide-line/80 border-y border-line/80 dark:divide-white/10 dark:border-white/10">
      {posts.map((post) => (
        <article className="grid gap-4 py-6 sm:grid-cols-[8rem_1fr] md:grid-cols-[9rem_10rem_1fr]" key={post.slug}>
          <time className="text-sm text-muted dark:text-stone-400" dateTime={post.date}>
            {formatDate(post.date)}
          </time>
          <Link
            aria-label={post.title}
            className="block aspect-[16/10] w-full border border-line bg-cover bg-center transition hover:border-accent dark:border-white/10 dark:hover:border-brass sm:max-w-40"
            href={post.urlPath}
            style={{ backgroundImage: `url(${getPostCoverImage(post.coverImage)})` }}
          />
          <div>
            <h2 className="font-serif text-2xl font-bold text-ink dark:text-paper">
              <Link className="shadow-rule transition hover:text-accent dark:hover:text-brass" href={post.urlPath}>
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 max-w-3xl text-base leading-7 text-muted dark:text-stone-300">
              {post.description}
            </p>
            <p className="mt-2 text-sm uppercase text-accent dark:text-brass">{post.category}</p>
            {post.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span className="border border-line px-2 py-1 text-xs uppercase text-muted dark:border-white/10 dark:text-stone-400" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
