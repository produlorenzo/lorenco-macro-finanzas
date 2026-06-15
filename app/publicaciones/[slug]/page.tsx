import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { formatDate } from "@/lib/format";
import { getAllPublications, getPostBySlug } from "@/lib/posts";
import { site } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPublications().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: post.coverImage ? [post.coverImage] : undefined,
      url: `${site.url}/publicaciones/${post.slug}`,
    },
  };
}

export default async function PublicationPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-16">
      <header>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span className="border border-line px-2 py-1 text-xs uppercase text-muted dark:border-white/10 dark:text-stone-400" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <h1 className="mt-5 font-serif text-4xl font-bold leading-tight text-ink dark:text-paper sm:text-6xl">
          {post.title}
        </h1>
        <p className="mt-5 text-xl leading-8 text-muted dark:text-stone-300">{post.description}</p>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted dark:text-stone-400">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.category}</span>
          <span>{post.readingMinutes}</span>
          <span>{post.author}</span>
        </div>
        {post.coverImage && (
          <div
            className="mt-8 aspect-[16/9] w-full border border-line bg-cover bg-center dark:border-white/10"
            style={{ backgroundImage: `url(${post.coverImage})` }}
          />
        )}
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
