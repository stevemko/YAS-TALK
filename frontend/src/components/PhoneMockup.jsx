export default function PhoneMockup({ children, className = '' }) {
  return (
    <div className={`relative mx-auto w-[240px] sm:w-[260px] ${className}`}>
      <div className="relative rounded-[2.2rem] border-[6px] border-ink-soft bg-ink-soft p-1.5 shadow-2xl shadow-black/30">
        {/* notch */}
        <div className="absolute left-1/2 top-2.5 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-ink-soft" />
        <div className="relative overflow-hidden rounded-[1.7rem] bg-ink">
          <div className="aspect-[9/19.5] w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
