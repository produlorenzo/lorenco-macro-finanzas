import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { pagesContent } from "@/lib/siteContent";

export const metadata: Metadata = {
  title: pagesContent.contact.title,
  description: pagesContent.contact.seoDescription,
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <PageHero eyebrow={pagesContent.contact.eyebrow} title={pagesContent.contact.title} />
      <div className="editorial-panel mt-10 max-w-3xl p-6 sm:p-8">
        <p className="text-lg leading-8 text-muted">
          {pagesContent.contact.body}{" "}
          <a className="text-accent underline-offset-4 hover:underline" href={`mailto:${pagesContent.contact.email}`}>
            {pagesContent.contact.email}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
