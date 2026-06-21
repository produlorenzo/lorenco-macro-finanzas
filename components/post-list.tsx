import { ArticleCard } from "@/components/article-card";
import type { Post } from "@/lib/posts";

export function PostList({ posts }: { posts: Post[] }) {
  if (!posts.length) {
    return (
      <p className="border-y border-line/80 py-8 text-muted dark:border-white/10 dark:text-stone-400">
        Todavía no hay publicaciones disponibles.
      </p>
    );
  }

  return (
    <div className="border-t border-line dark:border-white/10">
      {posts.map((post) => (
        <ArticleCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
