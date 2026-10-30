import { LogoMark } from './Logo';

// A slow ribbon of greetings in all five languages, separated by the logo mark.
const WORDS = [
  { w: 'Hello', l: 'English' },
  { w: 'Bonjour', l: 'Français' },
  { w: 'Mbote', l: 'Lingála' },
  { w: 'Habari', l: 'Kiswahili' },
  { w: 'مرحباً', l: 'العربية', rtl: true },
  { w: 'Thank you', l: 'English' },
  { w: 'Merci', l: 'Français' },
  { w: 'Matondi', l: 'Lingála' },
  { w: 'Asante', l: 'Kiswahili' },
  { w: 'شكراً', l: 'العربية', rtl: true },
];

function Row({ hidden = false }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {WORDS.map((item) => (
        <li key={item.w} className="flex items-center">
          <span className="flex items-baseline gap-3 px-8">
            <span className="font-display text-3xl font-semibold text-ink sm:text-4xl" dir={item.rtl ? 'rtl' : 'ltr'}>
              {item.w}
            </span>
            <span className="text-xs text-ink/50">{item.l}</span>
          </span>
          <LogoMark className="h-5 opacity-80" />
        </li>
      ))}
    </ul>
  );
}

export default function LanguageMarquee() {
  return (
    <div className="marquee overflow-hidden border-y border-ink/10 bg-paper py-6" dir="ltr" aria-label="Hello in five languages">
      <div className="marquee-track flex w-max">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
