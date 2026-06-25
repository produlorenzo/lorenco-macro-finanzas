import Image from "next/image";
import Link from "next/link";
import { editorialCategories } from "@/lib/categories";
import { siteLogo } from "@/lib/content-config";
import { site } from "@/lib/site";

const secondaryNav = [
  { href: "/buscar", label: "Buscar" },
  { href: "/sobre-el-proyecto", label: "Sobre el proyecto" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-night/94 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex items-center justify-between gap-5 py-4">
          <Link className="flex min-w-0 items-center gap-3" href="/" aria-label={site.name}>
            <Image
              alt={site.name}
              className="h-14 w-auto max-w-[220px] shrink-0 object-contain sm:h-[4.5rem] sm:max-w-[300px]"
              height={112}
              priority
              src={siteLogo}
              width={420}
            />
            <span className="hidden border-l border-line pl-3 font-serif text-xl font-bold text-ink md:block">
              Magazine
            </span>
          </Link>
          <span className="hidden text-sm uppercase tracking-wide text-accent sm:block">Editorial financiero</span>
        </div>
        <div className="grid gap-2 border-t border-line py-2 lg:grid-cols-[1fr_auto]">
          <nav className="flex gap-x-5 overflow-x-auto text-sm font-bold uppercase tracking-wide text-ink">
            {editorialCategories.map((item) => (
              <Link className="whitespace-nowrap transition hover:text-accent" href={`/${item.slug}`} key={item.slug}>
                {item.label}
              </Link>
            ))}
          </nav>
          <nav className="flex gap-x-5 overflow-x-auto text-sm text-muted">
            {secondaryNav.map((item) => (
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
