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
    <section className="editorial-panel relative min-h-64 overflow-hidden px-6 py-12 sm:px-10 sm:py-16">
      <div className="absolute inset-0 bg-gradient-to-br from-night/15 via-paper/30 to-transparent" />
      <div className="relative max-w-3xl">
        {eyebrow && <p className="mb-3 text-sm uppercase text-accent">{eyebrow}</p>}
        <h1 className="font-serif text-4xl font-bold leading-tight text-ink sm:text-5xl">{title}</h1>
        {description && <p className="mt-4 text-lg leading-8 text-muted">{description}</p>}
      </div>
    </section>
  );
}
