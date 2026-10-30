import Reveal from './Reveal';

// Title + short intro used at the top of every home-page section.
export default function SectionHeading({ title, subtitle, tone = 'light', align = 'left', className = '' }) {
  const dark = tone === 'dark';
  return (
    <Reveal className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}>
      <h2
        className={`font-display text-3xl font-semibold leading-tight text-balance sm:text-4xl lg:text-5xl ${
          dark ? 'text-paper' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg leading-relaxed ${dark ? 'text-paper/70' : 'text-ink/70'}`}>{subtitle}</p>
      )}
    </Reveal>
  );
}
