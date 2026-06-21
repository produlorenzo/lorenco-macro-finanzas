import Image from "next/image";
import Link from "next/link";
import { getPostCoverImage, hasCustomPostCover } from "@/lib/content-config";
import { formatDate } from "@/lib/format";
import type { Post } from "@/lib/posts";

type ArticleCardProps = {
  post: Post;
  variant?: "feature" | "compact" | "row";
};

export function ArticleCard({ post, variant = "row" }: ArticleCardProps) {
  const hasCover = hasCustomPostCover(post.coverImage);

  if (variant === "feature") {
    return (
      <article className="editorial-panel grid gap-6 p-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        {hasCover ? (
          <Link
            aria-label={post.title}
            className="group relative block aspect-[16/10] overflow-hidden bg-night-soft"
            href={post.urlPath}
          >
            <Image
              alt=""
              className="object-cover transition duration-300 group-hover:scale-[1.02]"
              fill
              priority
              sizes="(min-width: 1024px) 52vw, 100vw"
              src={getPostCoverImage(post.coverImage)}
            />
          </Link>
        ) : (
          <Link
            aria-label={post.title}
            className="flex min-h-64 items-end border border-line bg-night-soft/70 p-5 transition hover:border-accent"
            href={post.urlPath}
          >
            <span className="text-sm uppercase tracking-wide text-brass">{post.category}</span>
          </Link>
        )}
        <div>
          <ArticleMeta post={post} />
          <h2 className="mt-3 font-serif text-4xl font-bold leading-tight text-ink dark:text-paper sm:text-5xl">
            <Link className="transition hover:text-accent dark:hover:text-brass" href={post.urlPath}>
              {post.title}
            </Link>
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted dark:text-stone-300">{post.description}</p>
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="border-b border-line py-5 dark:border-white/10">
        <ArticleMeta post={post} />
        <h3 className="mt-2 font-serif text-2xl font-bold leading-snug text-ink dark:text-paper">
          <Link className="transition hover:text-accent dark:hover:text-brass" href={post.urlPath}>
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted dark:text-stone-300">
          {post.description}
        </p>
      </article>
    );
  }

  return (
    <article className="grid gap-5 border-b border-line py-7 dark:border-white/10 sm:grid-cols-[11rem_1fr]">
      {hasCover ? (
        <Link
          aria-label={post.title}
          className="group relative block aspect-[16/10] overflow-hidden bg-night-soft"
          href={post.urlPath}
        >
          <Image
            alt=""
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
            fill
            sizes="(min-width: 640px) 11rem, 100vw"
            src={getPostCoverImage(post.coverImage)}
          />
        </Link>
      ) : (
        <Link
          aria-label={post.title}
          className="flex aspect-[16/10] items-end border border-line bg-night-soft/65 p-3 text-xs uppercase tracking-wide text-brass transition hover:border-accent"
          href={post.urlPath}
        >
          {post.category}
        </Link>
      )}
      <div>
        <ArticleMeta post={post} />
        <h2 className="mt-2 font-serif text-2xl font-bold leading-snug text-ink dark:text-paper">
          <Link className="transition hover:text-accent dark:hover:text-brass" href={post.urlPath}>
            {post.title}
          </Link>
        </h2>
        <p className="mt-2 max-w-3xl text-base leading-7 text-muted dark:text-stone-300">
          {post.description}
        </p>
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                className="border border-line px-2 py-1 text-xs uppercase tracking-wide text-muted dark:border-white/10 dark:text-stone-400"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

function ArticleMeta({ post }: { post: Post }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-wide text-muted dark:text-stone-400">
      <span className="font-bold text-accent dark:text-brass">{post.category}</span>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span>{post.readingMinutes}</span>
    </div>
  );
}
