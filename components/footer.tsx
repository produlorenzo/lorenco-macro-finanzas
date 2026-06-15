import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line/80 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-muted dark:text-stone-400 sm:px-8 md:flex-row md:items-center md:justify-between">
        <p>{site.name}</p>
        <p>Research editorial macroeconómico y financiero.</p>
      </div>
    </footer>
  );
}
