import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays } from 'lucide-react';
import { fetchEvents } from '../api/client';
import { EventCard } from '../components/EventsTeaser';

const TABS = [
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'past', label: 'Past events' },
];

export default function Events() {
  const [when, setWhen] = useState('upcoming');
  const [events, setEvents] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setEvents(null);
    setFailed(false);
    fetchEvents(when)
      .then((rows) => !cancelled && setEvents(rows))
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [when]);

  return (
    <div className="bg-paper px-5 pb-24 pt-14 sm:px-8 sm:pt-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-4xl font-semibold leading-tight text-balance text-ink sm:text-5xl">
          Events and meetups
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-ink/70">
          Webinars, workshops, launches and community evenings. Come and talk with us.
        </p>

        <div role="tablist" aria-label="Event timing" className="mt-10 inline-flex rounded-full border border-ink/15 bg-white p-1">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              type="button"
              aria-selected={when === tab.key}
              onClick={() => setWhen(tab.key)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${
                when === tab.key ? 'bg-ink text-paper' : 'text-ink/70 hover:text-ink'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-8" role="tabpanel">
          {failed ? (
            <p role="alert" className="rounded-2xl border border-red-300 bg-red-50 p-6 text-red-800">
              We could not load the events. Please refresh the page.
            </p>
          ) : events === null ? (
            <div className="space-y-5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-36 animate-pulse rounded-3xl bg-ink/5" />
              ))}
            </div>
          ) : events.length === 0 ? (
            <div className="rounded-3xl border-2 border-dashed border-ink/20 p-10 text-center">
              <CalendarDays size={32} className="mx-auto text-gold" aria-hidden="true" />
              <h2 className="mt-4 font-display text-2xl font-semibold text-ink">
                {when === 'upcoming' ? 'No events scheduled right now' : 'No past events yet'}
              </h2>
              {when === 'upcoming' && (
                <>
                  <p className="mx-auto mt-2 max-w-md text-ink/70">
                    We announce new events here first. Join the waitlist and we will email you.
                  </p>
                  <Link to="/#cta" className="mt-6 inline-block rounded-full bg-gold px-6 py-3 font-semibold text-ink transition-transform hover:scale-105">
                    Join the waitlist
                  </Link>
                </>
              )}
            </div>
          ) : (
            <ul className="space-y-5">
              {events.map((e) => (
                <li key={e.id}>
                  <EventCard event={e} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
