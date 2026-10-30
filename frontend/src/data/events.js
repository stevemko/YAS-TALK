// Small helpers shared by the events cards, list and detail pages.

export function dateParts(iso) {
  const d = new Date(iso);
  return {
    day: d.toLocaleDateString('en-KE', { day: 'numeric' }),
    month: d.toLocaleDateString('en-KE', { month: 'short' }),
    weekday: d.toLocaleDateString('en-KE', { weekday: 'long' }),
    time: d.toLocaleTimeString('en-KE', { hour: 'numeric', minute: '2-digit' }),
    full: d.toLocaleDateString('en-KE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
  };
}

// One calm colour per kind of event.
export const KIND_STYLE = {
  webinar: 'bg-sky/15 text-[#1c6fa8]',
  meetup: 'bg-leaf/15 text-[#0f7442]',
  launch: 'bg-gold/25 text-[#7a5200]',
  workshop: 'bg-lagoon/15 text-[#13787b]',
  other: 'bg-ink/10 text-ink/70',
};

// A link that adds the event to Google Calendar. No account or setup needed.
export function googleCalendarUrl(e) {
  const fmt = (iso) => new Date(iso).toISOString().replace(/[-:]|\.\d{3}/g, '');
  const end = e.ends_at || new Date(new Date(e.starts_at).getTime() + 60 * 60 * 1000).toISOString();
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: e.title,
    dates: `${fmt(e.starts_at)}/${fmt(end)}`,
    details: [e.summary, e.online_url].filter(Boolean).join('\n'),
    location: e.location || '',
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
