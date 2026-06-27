import Image from "next/image";
import Link from "next/link";
import { editorialCategories } from "@/lib/categories";
import { siteLogo } from "@/lib/content-config";
import { site } from "@/lib/site";
import { navigationContent } from "@/lib/siteContent";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-night/92 shadow-sm shadow-slate-200/60 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex items-center justify-between gap-5 py-3">
          <Link className="flex min-w-0 items-center gap-3" href="/" aria-label={site.name}>
            <Image
              alt={site.name}
              className="h-12 w-auto max-w-[210px] shrink-0 object-contain sm:h-16 sm:max-w-[280px]"
              height={112}
              priority
              src={siteLogo}
              width={420}
            />
            <span className="hidden border-l border-line pl-3 font-serif text-xl font-bold text-ink md:block">
              {navigationContent.brandSuffix}
            </span>
          </Link>
          <span className="hidden text-sm font-semibold uppercase tracking-wide text-accent sm:block">{navigationContent.tagline}</span>
        </div>
        <div className="grid gap-2 border-t border-line py-2 lg:grid-cols-[1fr_auto]">
          <nav className="flex gap-x-5 overflow-x-auto text-sm font-bold uppercase tracking-wide text-ink">
            {editorialCategories.map((item) => (
              <Link className="whitespace-nowrap transition hover:text-accent" href={`/${item.slug}`} key={item.slug}>
                {item.label}
              </Link>
            ))}
          </nav>
          <nav className="flex gap-x-5 overflow-x-auto text-sm font-medium text-muted">
            {navigationContent.secondary.map((item) => (
              <Link className="whitespace-nowrap transition hover:text-accent" href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
