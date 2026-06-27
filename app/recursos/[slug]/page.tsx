import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { getAllResources, getResourceBySlug } from "@/lib/resources";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllResources().map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) return {};

  return {
    title: resource.title,
    description: resource.description,
    openGraph: {
      title: resource.title,
      description: resource.description,
      images: resource.cover ? [resource.cover] : undefined,
    },
  };
}

export default async function ResourcePage({ params }: Props) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <header className="editorial-panel p-6 sm:p-8">
        <Link className="text-sm font-semibold uppercase tracking-wide text-accent hover:underline" href="/recursos">
          Recursos
        </Link>
        <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-ink sm:text-5xl">
          {resource.title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">{resource.description}</p>
        {resource.cover && (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg border border-line bg-night-soft">
            <Image alt="" className="object-cover" fill priority sizes="(min-width: 1024px) 64rem, 100vw" src={resource.cover} />
          </div>
        )}
        {resource.externalUrl && resource.externalLabel && (
          <a
            className="mt-6 inline-flex rounded-md bg-accent px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brass"
            href={resource.externalUrl}
            rel="noreferrer"
            target="_blank"
          >
            {resource.externalLabel}
          </a>
        )}
      </header>

      <div className="prose editorial-panel mx-auto mt-10 max-w-3xl p-6 prose-headings:font-serif prose-headings:leading-tight prose-a:text-accent sm:p-8">
        <MDXRemote
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug],
            },
          }}
          source={resource.body}
        />
      </div>
    </article>
  );
}
