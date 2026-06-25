import Link from "next/link";
import { editorialCategories } from "@/lib/categories";
import { footerContent, navigationContent } from "@/lib/siteContent";

export function Footer() {
  return (
    <footer className="border-t border-line bg-night/90 backdrop-blur">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 text-sm text-muted sm:px-8 lg:grid-cols-[1fr_auto]">
        <div className="max-w-2xl">
          <p className="font-serif text-2xl font-bold text-ink">{footerContent.title}</p>
          <p className="mt-3 leading-7">{footerContent.description}</p>
          <p className="mt-3 leading-7">{footerContent.fictionalAuthorsNote}</p>
          <p className="mt-3 leading-7">{footerContent.disclaimer}</p>
        </div>
        <nav className="flex max-w-sm flex-wrap content-start gap-x-5 gap-y-3 lg:justify-end">
          {editorialCategories.map((item) => (
            <Link className="transition hover:text-accent" href={`/${item.slug}`} key={item.slug}>
              {item.label}
            </Link>
          ))}
          {navigationContent.secondary.map((item) => (
            <Link className="transition hover:text-accent" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
