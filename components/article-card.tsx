import Image from "next/image";
import Link from "next/link";
import { getPostCover } from "@/lib/content-config";
import { formatDate } from "@/lib/format";
import type { Post } from "@/lib/posts";

type ArticleCardProps = {
  post: Post;
  variant?: "feature" | "compact" | "row";
};

export function ArticleCard({ post, variant = "row" }: ArticleCardProps) {
  if (variant === "feature") {
    return (
      <article className="editorial-panel grid gap-6 p-5 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <PostImage post={post} priority sizes="(min-width: 1024px) 52vw, 100vw" />
        <div>
          <ArticleMeta post={post} />
          <h2 className="mt-3 font-serif text-4xl font-bold leading-tight text-ink sm:text-5xl">
            <Link className="transition hover:text-accent" href={post.urlPath}>
              {post.title}
            </Link>
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted">{post.description}</p>
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="border-b border-line/80 py-5 last:border-b-0">
        <PostImage post={post} sizes="(min-width: 1024px) 20rem, 100vw" />
        <ArticleMeta className="mt-4" post={post} />
        <h3 className="mt-2 font-serif text-2xl font-bold leading-snug text-ink">
          <Link className="transition hover:text-accent" href={post.urlPath}>
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted">{post.description}</p>
      </article>
    );
  }

  return (
    <article className="grid gap-5 border-b border-line/80 py-7 last:border-b-0 sm:grid-cols-[11rem_1fr]">
      <PostImage post={post} sizes="(min-width: 640px) 11rem, 100vw" />
      <div>
        <ArticleMeta post={post} />
        <h2 className="mt-2 font-serif text-2xl font-bold leading-snug text-ink">
          <Link className="transition hover:text-accent" href={post.urlPath}>
            {post.title}
          </Link>
        </h2>
        <p className="mt-2 max-w-3xl text-base leading-7 text-muted">{post.description}</p>
      </div>
    </article>
  );
}

function PostImage({ post, priority = false, sizes }: { post: Post; priority?: boolean; sizes: string }) {
  return (
    <Link
      aria-label={post.title}
      className="group relative block aspect-[16/10] overflow-hidden rounded-md border border-line bg-night-soft"
      href={post.urlPath}
    >
      <Image
        alt=""
        className="object-cover transition duration-300 group-hover:scale-[1.02]"
        fill
        priority={priority}
        sizes={sizes}
        src={getPostCover(post.cover)}
      />
    </Link>
  );
}

function ArticleMeta({ post, className = "" }: { post: Post; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-wide text-muted ${className}`}>
      <Link className="font-bold text-accent hover:underline" href={`/${post.categorySlug}`}>
        {post.category}
      </Link>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span>{post.author}</span>
    </div>
  );
}
