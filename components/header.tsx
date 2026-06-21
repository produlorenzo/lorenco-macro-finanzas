import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteLogo } from "@/lib/content-config";
import { site } from "@/lib/site";

const nav = [
  { href: "/", label: "Inicio" },
  { href: "/publicaciones", label: "Publicaciones" },
  { href: "/sobre-el-proyecto", label: "Sobre el proyecto" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-line/80 bg-paper/95 backdrop-blur dark:border-white/10 dark:bg-night/92">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex items-center justify-between gap-5 py-3">
          <Link className="flex min-w-0 items-center gap-3" href="/" aria-label={site.name}>
            <Image
              alt={site.name}
              className="h-10 w-auto shrink-0 object-contain"
              height={96}
              priority
              src={siteLogo}
              width={360}
            />
            <span className="hidden border-l border-line pl-3 text-xs uppercase tracking-wide text-muted dark:border-white/10 dark:text-stone-400 sm:block">
              Publicación económica-financiera
            </span>
          </Link>
          <div className="shrink-0">
            <ThemeToggle />
          </div>
        </div>
        <nav className="flex gap-x-5 overflow-x-auto border-t border-line py-2 text-sm text-muted dark:border-white/10 dark:text-stone-300">
          {nav.map((item) => (
            <Link
              className="whitespace-nowrap transition hover:text-accent dark:hover:text-brass"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
