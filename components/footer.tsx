import Link from "next/link";
import { site } from "@/lib/site";

const footerNav = [
  { href: "/publicaciones", label: "Publicaciones" },
  { href: "/archivo", label: "Archivo" },
  { href: "/sobre-el-proyecto", label: "Sobre el proyecto" },
  { href: "/contacto", label: "Contacto" },
];

export function Footer() {
  return (
    <footer className="border-t border-line/80 dark:border-white/10">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 text-sm text-muted dark:text-stone-400 sm:px-8 lg:grid-cols-[1fr_auto]">
        <div className="max-w-xl">
          <p className="font-serif text-2xl font-bold text-ink dark:text-paper">{site.name}</p>
          <p className="mt-3 leading-7">
            Research editorial macroeconómico y financiero. El contenido publicado tiene fines
            informativos y analíticos; no constituye asesoramiento financiero ni recomendación de
            inversión.
          </p>
        </div>
        <nav className="flex flex-wrap content-start gap-x-5 gap-y-3 lg:max-w-sm lg:justify-end">
          {footerNav.map((item) => (
            <Link className="transition hover:text-accent dark:hover:text-brass" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
