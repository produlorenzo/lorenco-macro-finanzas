import { defaultCoverImage } from "@/lib/content-config";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section
      className="relative min-h-64 overflow-hidden border-b border-line bg-cover bg-center px-6 py-12 dark:border-white/10 sm:px-10 sm:py-16"
      style={{ backgroundImage: `url(${defaultCoverImage})` }}
    >
      <div className="absolute inset-0 bg-paper/82 dark:bg-night/72" />
      <div className="relative max-w-3xl">
        {eyebrow && (
          <p className="mb-3 text-sm uppercase text-accent dark:text-brass">{eyebrow}</p>
        )}
        <h1 className="font-serif text-4xl font-bold leading-tight text-ink dark:text-paper sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-lg leading-8 text-muted dark:text-stone-300">{description}</p>
        )}
      </div>
    </section>
  );
}
