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
    <header className="sticky top-0 z-20 border-b border-line bg-night/92 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex items-center justify-between gap-5 py-4">
          <Link className="flex min-w-0 items-center gap-3" href="/" aria-label={site.name}>
            <Image
              alt={site.name}
              className="h-16 w-auto max-w-[245px] shrink-0 object-contain sm:h-20 sm:max-w-[340px]"
              height={128}
              priority
              src={siteLogo}
              width={480}
            />
            <span className="hidden border-l border-line pl-3 text-xs uppercase tracking-wide text-muted sm:block">
              Publicación económica-financiera
            </span>
          </Link>
          <div className="shrink-0">
            <ThemeToggle />
          </div>
        </div>
        <nav className="flex gap-x-5 overflow-x-auto border-t border-line py-2 text-sm text-muted">
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
