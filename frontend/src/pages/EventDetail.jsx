import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarPlus, Clock, ExternalLink, MapPin, Share2, Video } from 'lucide-react';
import { fetchEvent } from '../api/client';
import { dateParts, googleCalendarUrl, KIND_STYLE } from '../data/events';
import { SITE } from '../config/site';

const btnPrimary =
  'inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 font-semibold text-ink transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink';
const btnGhost =
  'inline-flex items-center justify-center gap-2 rounded-full border border-ink/30 px-6 py-3.5 font-semibold text-ink transition-colors hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink';

export default function EventDetail() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [state, setState] = useState('loading'); // loading | ok | missing | error

  useEffect(() => {
    let cancelled = false;
    setState('loading');
    fetchEvent(slug)
      .then((e) => {
        if (cancelled) return;
        setEvent(e);
        setState('ok');
        document.title = `${e.title} | YasTalk`;
      })
      .catch((err) => !cancelled && setState(err.response?.status === 404 ? 'missing' : 'error'));
    return () => {
      cancelled = true;
      document.title = 'YasTalk | Talk. Understood.';
    };
  }, [slug]);

  if (state === 'loading') {
    return <div role="status" className="grid min-h-[50vh] place-items-center bg-paper text-ink/60">Loading...</div>;
  }
  if (state !== 'ok') {
    return (
      <div className="bg-paper px-5 py-24 text-center sm:px-8">
        <h1 className="font-display text-3xl font-semibold text-ink">
          {state === 'missing' ? 'We could not find that event' : 'Something went wrong'}
        </h1>
        <Link to="/events" className={`${btnPrimary} mt-8`}>See all events</Link>
      </div>
    );
  }

  const d = dateParts(event.starts_at);
  const shareText = `${event.title} - ${d.full}. ${SITE.url}/events/${event.slug}`;

  return (
    <div className="bg-paper px-5 pb-24 pt-10 sm:px-8 sm:pt-14">
      <article className="mx-auto max-w-3xl">
        <Link to="/events" className="inline-flex items-center gap-2 text-sm font-medium text-ink/70 hover:text-ink">
          <ArrowLeft size={16} aria-hidden="true" className="rtl:rotate-180" /> All events
        </Link>

        {event.image && (
          <img src={event.image} alt="" className="mt-6 aspect-[16/9] w-full rounded-3xl object-cover shadow-lg" />
        )}

        <div className="mt-8 flex items-center gap-3">
          <span className={`rounded-full px-3 py-0.5 text-sm font-semibold ${KIND_STYLE[event.kind] || KIND_STYLE.other}`}>
            {event.kind_label}
          </span>
          {event.is_past && <span className="rounded-full bg-ink/10 px-3 py-0.5 text-sm font-medium text-ink/70">This event has ended</span>}
        </div>

        <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-balance text-ink sm:text-5xl">{event.title}</h1>
        {event.summary && <p className="mt-4 text-xl text-ink/70">{event.summary}</p>}

        <dl className="mt-8 grid gap-4 rounded-3xl border border-ink/10 bg-white p-6 sm:grid-cols-2">
          <div className="flex gap-3">
            <Clock size={20} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
            <div>
              <dt className="sr-only">When</dt>
              <dd className="font-medium text-ink">{d.full}</dd>
              <dd className="text-ink/60">{d.time}</dd>
            </div>
          </div>
          {event.location && (
            <div className="flex gap-3">
              <MapPin size={20} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              <div>
                <dt className="sr-only">Where</dt>
                <dd className="font-medium text-ink">{event.location}</dd>
              </div>
            </div>
          )}
          {event.online_url && !event.is_past && (
            <div className="flex gap-3 sm:col-span-2">
              <Video size={20} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              <div>
                <dt className="sr-only">Join online</dt>
                <dd>
                  <a href={event.online_url} target="_blank" rel="noreferrer" className="font-medium text-teal underline underline-offset-4">
                    Join online
                  </a>
                </dd>
              </div>
            </div>
          )}
        </dl>

        {event.description && (
          <div className="mt-8 whitespace-pre-line text-lg leading-relaxed text-ink/80">{event.description}</div>
        )}

        {!event.is_past && (
          <div className="mt-10 flex flex-wrap gap-3">
            {event.registration_url && (
              <a href={event.registration_url} target="_blank" rel="noreferrer" className={btnPrimary}>
                Register <ExternalLink size={16} aria-hidden="true" />
              </a>
            )}
            <a href={googleCalendarUrl(event)} target="_blank" rel="noreferrer" className={btnGhost}>
              <CalendarPlus size={18} aria-hidden="true" /> Add to calendar
            </a>
            <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noreferrer" className={btnGhost}>
              <Share2 size={18} aria-hidden="true" /> Share
            </a>
          </div>
        )}
      </article>
    </div>
  );
}
