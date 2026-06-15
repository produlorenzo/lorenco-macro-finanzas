import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";

const nav = [
  { href: "/", label: "Inicio" },
  { href: "/publicaciones", label: "Publicaciones" },
  { href: "/archivo", label: "Archivo" },
  { href: "/sobre-el-proyecto", label: "Sobre el proyecto" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-line/80 bg-paper/92 backdrop-blur dark:border-white/10 dark:bg-night/90">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Replace this text mark with /logo.svg when the final logo is available. */}
        <Link className="font-serif text-xl font-bold tracking-normal text-ink dark:text-paper" href="/">
          {site.name}
        </Link>
        <div className="flex items-center justify-between gap-4">
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted dark:text-stone-300">
            {nav.map((item) => (
              <Link
                className="transition hover:text-accent dark:hover:text-brass"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
