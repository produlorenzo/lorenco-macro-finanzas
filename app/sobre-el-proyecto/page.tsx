import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { pagesContent } from "@/lib/siteContent";

export const metadata: Metadata = {
  title: pagesContent.about.title,
  description: pagesContent.about.seoDescription,
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <PageHero eyebrow={pagesContent.about.eyebrow} title={pagesContent.about.title} />
      <article className="prose prose-invert editorial-panel mt-10 max-w-3xl p-6 prose-headings:font-serif sm:p-8">
        {pagesContent.about.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </article>
    </section>
  );
}
