import { useLanguage } from '../context/LanguageContext';

export default function Testimonials({ testimonials }) {
  const { t } = useLanguage();

  if (!testimonials.length) return null;

  return (
    <section id="testimonials" className="bg-paper px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-teal">
            {t.testimonials.eyebrow}
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-semibold sm:text-4xl">
            {t.testimonials.title}
          </h2>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map((item, idx) => {
            const isRtl = item.language_code === 'ar';
            return (
              <figure
                key={item.id ?? idx}
                className="flex flex-col justify-between rounded-2xl bg-ink px-6 py-7 text-paper"
              >
                <blockquote
                  className={`text-[1.05rem] leading-relaxed ${isRtl ? 'font-arabic text-right' : 'font-display'}`}
                  dir={isRtl ? 'rtl' : 'ltr'}
                >
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-gold font-display text-sm font-semibold text-ink">
                    {item.author_name?.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{item.author_name}</p>
                    <p className="text-xs text-paper/55">{item.author_role}</p>
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
