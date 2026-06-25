import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { getPostCoverImage } from "@/lib/content-config";
import { formatDate } from "@/lib/format";
import { getAllNotes, getPostBySlug } from "@/lib/posts";
import { site } from "@/lib/site";
import { pagesContent } from "@/lib/siteContent";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllNotes().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return {};

  const coverImage = getPostCoverImage(post.coverImage);

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [coverImage],
      url: `${site.url}/notas/${post.slug}`,
    },
  };
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const coverImage = getPostCoverImage(post.coverImage);

  return (
    <article className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-16">
      <header className="editorial-panel p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm uppercase tracking-wide text-muted">
          <Link className="font-bold text-accent hover:underline" href={`/${post.categorySlug}`}>
            {post.category}
          </Link>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.author}</span>
          <span>{post.readingMinutes}</span>
        </div>
        <h1 className="mt-5 font-serif text-4xl font-bold leading-tight text-ink sm:text-6xl">
          {post.title}
        </h1>
        <p className="mt-5 text-xl leading-8 text-muted">{post.description}</p>
        <div className="relative mt-8 aspect-[16/9] overflow-hidden bg-night-soft">
          <Image alt="" className="object-cover" fill priority sizes="(min-width: 1024px) 64rem, 100vw" src={coverImage} />
        </div>
        {post.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span className="border border-line px-2 py-1 text-xs uppercase tracking-wide text-muted" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose prose-invert editorial-panel mx-auto mt-10 max-w-3xl p-6 prose-headings:font-serif prose-headings:leading-tight prose-a:text-accent sm:p-8">
        <MDXRemote
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug],
            },
          }}
          source={post.body}
        />
      </div>

      <section className="editorial-panel mx-auto mt-12 max-w-3xl p-6 sm:p-8">
        <h2 className="font-serif text-2xl font-bold text-ink">{pagesContent.article.sourcesTitle}</h2>
        <ul className="mt-4 space-y-2 text-muted">
          {post.sources.map((source) => (
            <li key={`${source.title}${source.url}`}>
              <a className="shadow-rule transition hover:text-accent" href={source.url}>
                {source.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
