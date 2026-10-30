import mark from '../assets/yastalk-mark.svg';

// The symbol on its own: no square, transparent, sharp at any size.
export function LogoMark({ className = 'h-10', ...rest }) {
  return (
    <img
      src={mark}
      alt=""
      aria-hidden="true"
      draggable="false"
      className={`w-auto select-none ${className}`}
      {...rest}
    />
  );
}

// Symbol + wordmark. tone="dark" is for dark backgrounds (cream "Yas"), "light" for paper.
export default function Logo({ markClass = 'h-11 sm:h-12', textClass = 'text-2xl sm:text-[1.7rem]', tone = 'dark' }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className={markClass} />
      <span className={`font-display font-semibold leading-none ${textClass} ${tone === 'dark' ? 'text-paper' : 'text-ink'}`}>
        Yas<span className="text-gold">Talk</span>
      </span>
    </span>
  );
}
