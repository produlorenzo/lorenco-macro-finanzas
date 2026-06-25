"use client";

import { useMemo, useState } from "react";
import { ArticleCard } from "@/components/article-card";
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
      <label className="block text-sm uppercase tracking-wide text-muted" htmlFor="notes-search">
        Buscar
      </label>
      <input
        className="mt-2 w-full border border-line bg-night-soft/70 px-4 py-3 text-base text-ink outline-none transition placeholder:text-muted/70 focus:border-accent"
        id="notes-search"
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Título, descripción, categoría, autor, tag o contenido"
        type="search"
        value={query}
      />
      <p className="mt-3 text-sm text-muted">
        {filteredPosts.length} de {posts.length} notas
      </p>
      <div className="mt-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <ArticleCard key={post.slug} post={post} />)
        ) : (
          <p className="py-5 text-muted">No se encontraron notas para esa búsqueda.</p>
        )}
      </div>
    </div>
  );
}
