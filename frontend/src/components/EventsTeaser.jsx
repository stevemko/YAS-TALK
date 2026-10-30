import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import { fetchEvents } from '../api/client';
import { dateParts, KIND_STYLE } from '../data/events';
import { useCopy } from '../i18n/homeCopy';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export function EventCard({ event, detailsLabel = 'Details' }) {
  const d = dateParts(event.starts_at);
  return (
    <Link
      to={`/events/${event.slug}`}
      className="group flex h-full gap-5 rounded-3xl border border-ink/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold/70 hover:shadow-lg hover:shadow-ink/5 sm:p-6"
    >
      <div className="grid h-20 w-20 shrink-0 place-content-center rounded-2xl bg-night text-center text-paper">
        <span className="font-display text-3xl font-semibold leading-none">{d.day}</span>
        <span className="mt-1 text-sm text-gold">{d.month}</span>
      </div>
      <div className="min-w-0">
        <span className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${KIND_STYLE[event.kind] || KIND_STYLE.other}`}>
          {event.kind_label}
        </span>
        <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-ink">{event.title}</h3>
        <p className="mt-1 text-ink/70">{event.summary}</p>
        <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink/60">
          {event.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} aria-hidden="true" /> {event.location}
            </span>
          )}
          <span className="inline-flex items-center gap-1 font-medium text-ink group-hover:text-teal">
            {detailsLabel} <ArrowRight size={14} aria-hidden="true" className="rtl:rotate-180" />
          </span>
        </p>
      </div>
    </Link>
  );
}

// Next three upcoming events, or a friendly note when none are scheduled.
export default function EventsTeaser() {
  const copy = useCopy();
  const c = copy.events;
  const [events, setEvents] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchEvents('upcoming')
      .then((rows) => !cancelled && setEvents(rows.slice(0, 3)))
      .catch(() => !cancelled && setEvents([]));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="events" className="bg-paper-soft/60 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading title={c.title} subtitle={c.subtitle} />
          <Reveal>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 whitespace-nowrap font-medium text-ink underline decoration-gold decoration-2 underline-offset-[6px] hover:text-teal"
            >
              {c.all} <ArrowRight size={16} aria-hidden="true" className="rtl:rotate-180" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12">
          {events === null ? (
            <div className="grid gap-5 lg:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-40 animate-pulse rounded-3xl bg-ink/5" />
              ))}
            </div>
          ) : events.length === 0 ? (
            <Reveal className="mx-auto max-w-2xl rounded-3xl border-2 border-dashed border-ink/20 p-10 text-center">
              <CalendarDays size={32} className="mx-auto text-gold" aria-hidden="true" />
              <h3 className="mt-4 font-display text-2xl font-semibold text-ink">{c.emptyTitle}</h3>
              <p className="mx-auto mt-2 max-w-md text-ink/70">{c.emptyBody}</p>
              <a
                href="#cta"
                className="mt-6 inline-block rounded-full bg-gold px-6 py-3 font-semibold text-ink transition-transform hover:scale-105"
              >
                {c.emptyCta}
              </a>
            </Reveal>
          ) : (
            <ul className="grid gap-5 lg:grid-cols-3">
              {events.map((e, i) => (
                <Reveal as="li" key={e.id} delay={i * 0.08}>
                  <EventCard event={e} detailsLabel={c.details} />
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
