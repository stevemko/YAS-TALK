import { Mic, Type, MessageCircle, Camera, WifiOff, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ICONS = {
  mic: Mic,
  text: Type,
  chat: MessageCircle,
  camera: Camera,
  offline: WifiOff,
  document: FileText,
};

export default function Services({ services }) {
  const { t } = useLanguage();

  return (
    <section id="services" className="bg-paper px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-teal">
            {t.services.eyebrow}
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-semibold sm:text-4xl">
            {t.services.title}
          </h2>
          <p className="mt-4 text-ink/70">{t.services.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => {
            const Icon = ICONS[service.icon] || Type;
            return (
              <div
                key={service.id ?? idx}
                className="group rounded-2xl border border-ink/10 bg-white/40 p-6 transition-colors hover:border-teal/40 hover:bg-white/70"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-ink text-gold transition-colors group-hover:bg-teal">
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
