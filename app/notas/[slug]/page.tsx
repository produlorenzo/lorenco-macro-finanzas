import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { formatDate } from "@/lib/format";
import { getAllNotes, getNoteBySlug } from "@/lib/posts";
import { site } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllNotes().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getNoteBySlug(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [post.coverImage],
      url: `${site.url}/notas/${post.slug}`,
    },
  };
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const post = getNoteBySlug(slug);

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-16">
      <header>
        <p className="text-sm uppercase text-accent dark:text-brass">{post.category}</p>
        <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-ink dark:text-paper sm:text-6xl">
          {post.title}
        </h1>
        <p className="mt-5 text-xl leading-8 text-muted dark:text-stone-300">{post.description}</p>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted dark:text-stone-400">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.readingMinutes}</span>
          <span>{post.author}</span>
        </div>
      </header>

      <div className="prose prose-stone mt-10 max-w-none dark:prose-invert prose-headings:font-serif prose-a:text-accent dark:prose-a:text-brass">
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

      {post.sources.length > 0 && (
        <section className="mt-12 border-t border-line pt-8 dark:border-white/10">
          <h2 className="font-serif text-2xl font-bold text-ink dark:text-paper">Fuentes consultadas</h2>
          <ul className="mt-4 space-y-2 text-muted dark:text-stone-300">
            {post.sources.map((source) => (
              <li key={`${source.title}${source.url ?? ""}`}>
                {source.url ? (
                  <a className="shadow-rule transition hover:text-accent dark:hover:text-brass" href={source.url}>
                    {source.title}
                  </a>
                ) : (
                  source.title
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
