"use client";

import { useMemo, useState } from "react";
import { PostList } from "@/components/post-list";
import { normalizeSearchText } from "@/lib/format";
import type { Post } from "@/lib/posts";

export function PublicationsSearch({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");
  const normalized = normalizeSearchText(query.trim());

  const filteredPosts = useMemo(() => {
    if (!normalized) return posts;
    return posts.filter((post) => post.searchText.includes(normalized));
  }, [normalized, posts]);

  return (
    <div>
      <label className="block text-sm uppercase tracking-wide text-muted dark:text-stone-400" htmlFor="publication-search">
        Buscar publicaciones
      </label>
      <input
        className="mt-2 w-full border border-line bg-transparent px-4 py-3 text-base text-ink outline-none transition placeholder:text-muted/70 focus:border-accent dark:border-white/10 dark:text-paper dark:placeholder:text-stone-500 dark:focus:border-brass"
        id="publication-search"
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Título, descripción, tag o contenido"
        type="search"
        value={query}
      />
      <p className="mt-3 text-sm text-muted dark:text-stone-400">
        {filteredPosts.length} de {posts.length} publicaciones
      </p>
      <div className="mt-8">
        <PostList posts={filteredPosts} />
      </div>
    </div>
  );
}
