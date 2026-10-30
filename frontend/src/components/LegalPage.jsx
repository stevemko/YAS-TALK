// Plain, readable layout for the legal pages.
export default function LegalPage({ title, updated, intro, sections }) {
  return (
    <div className="bg-paper px-5 pb-24 pt-14 sm:px-8 sm:pt-20">
      <article className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">{title}</h1>
        <p className="mt-3 text-ink/60">Last updated {updated}</p>
        {intro && <p className="mt-8 text-lg leading-relaxed text-ink/80">{intro}</p>}
        {sections.map((s) => (
          <section key={s.heading} className="mt-10">
            <h2 className="font-display text-2xl font-semibold text-ink">{s.heading}</h2>
            {s.paragraphs?.map((p) => (
              <p key={p} className="mt-3 leading-relaxed text-ink/80">{p}</p>
            ))}
            {s.list && (
              <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed text-ink/80 marker:text-gold">
                {s.list.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>
    </div>
  );
}
