import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();
  const points = [
    { title: t.about.point1Title, body: t.about.point1Body },
    { title: t.about.point2Title, body: t.about.point2Body },
    { title: t.about.point3Title, body: t.about.point3Body },
  ];

  return (
    <section id="about" className="bg-paper-soft px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-rust">
            {t.about.eyebrow}
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-semibold sm:text-4xl">
            {t.about.title}
          </h2>
          <p className="mt-5 max-w-lg leading-relaxed text-ink/75">{t.about.body}</p>
        </div>

        <div className="flex flex-col gap-6">
          {points.map((p, i) => (
            <div key={i} className="border-l-2 border-teal/40 pl-5">
              <h3 className="font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/65">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
