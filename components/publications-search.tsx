"use client";

import { useMemo, useState } from "react";
import { ArticleCard } from "@/components/article-card";
import { normalizeSearchText } from "@/lib/format";
import type { Post } from "@/lib/posts";

type SearchLabels = {
  inputLabel: string;
  inputPlaceholder: string;
  resultsSuffix: string;
  emptyText: string;
};

export function PublicationsSearch({ labels, posts }: { labels: SearchLabels; posts: Post[] }) {
  const [query, setQuery] = useState("");
  const normalized = normalizeSearchText(query.trim());

  const filteredPosts = useMemo(() => {
    if (!normalized) return posts;
    return posts.filter((post) => post.searchText.includes(normalized));
  }, [normalized, posts]);

  return (
    <div>
      <label className="block text-sm uppercase tracking-wide text-muted" htmlFor="notes-search">
        {labels.inputLabel}
      </label>
      <input
        className="mt-2 w-full border border-line bg-night-soft/70 px-4 py-3 text-base text-ink outline-none transition placeholder:text-muted/70 focus:border-accent"
        id="notes-search"
        onChange={(event) => setQuery(event.target.value)}
        placeholder={labels.inputPlaceholder}
        type="search"
        value={query}
      />
      <p className="mt-3 text-sm text-muted">
        {filteredPosts.length} de {posts.length} {labels.resultsSuffix}
      </p>
      <div className="mt-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <ArticleCard key={post.slug} post={post} />)
        ) : (
          <p className="py-5 text-muted">{labels.emptyText}</p>
        )}
      </div>
    </div>
  );
}
