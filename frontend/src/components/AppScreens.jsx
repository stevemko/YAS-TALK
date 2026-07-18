import { Mic, Camera } from 'lucide-react';

export function ConversationScreen() {
  return (
    <div className="flex h-full flex-col justify-between bg-gradient-to-b from-teal/25 to-ink px-3 pb-4 pt-8 text-paper">
      <div className="flex flex-col gap-2">
        <div className="self-start rounded-2xl rounded-bl-sm bg-ink-soft px-3 py-2 text-[11px] leading-snug">
          <p className="font-arabic" dir="rtl">مرحباً، كيف حالك؟</p>
          <p className="mt-0.5 text-[9px] text-paper/45">Arabic → English</p>
        </div>
        <div className="self-end rounded-2xl rounded-br-sm bg-gold px-3 py-2 text-[11px] leading-snug text-ink">
          <p>Hello, how are you?</p>
        </div>
        <div className="self-start rounded-2xl rounded-bl-sm bg-ink-soft px-3 py-2 text-[11px] leading-snug">
          <p>I'm doing well, thank you!</p>
          <p className="mt-0.5 text-[9px] text-paper/45">English → Arabic</p>
        </div>
        <div className="self-end rounded-2xl rounded-br-sm bg-gold px-3 py-2 text-[11px] leading-snug text-ink">
          <p className="font-arabic" dir="rtl">أنا بخير، شكراً لك!</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3">
        <span className="rounded-full bg-ink-soft px-2.5 py-1 text-[9px] font-mono uppercase text-paper/60">AR</span>
        <div className="grid h-11 w-11 place-items-center rounded-full bg-gold text-ink">
          <Mic size={18} />
        </div>
        <span className="rounded-full bg-ink-soft px-2.5 py-1 text-[9px] font-mono uppercase text-paper/60">EN</span>
      </div>
    </div>
  );
}

export function VoiceScreen() {
  const bars = [6, 14, 22, 12, 26, 10, 18, 8, 20, 14, 6];
  return (
    <div className="flex h-full flex-col items-center justify-between bg-gradient-to-b from-gold/20 to-ink px-4 pb-6 pt-10 text-paper">
      <div className="text-center">
        <p className="font-mono text-[10px] uppercase tracking-widest text-paper/50">Listening…</p>
        <p className="mt-3 font-display text-base leading-snug">
          "Where is the nearest market?"
        </p>
      </div>

      <div className="flex h-14 items-end gap-1">
        {bars.map((h, i) => (
          <span
            key={i}
            className="w-1.5 rounded-full bg-gold/70"
            style={{ height: `${h}px` }}
          />
        ))}
      </div>

      <div className="w-full rounded-2xl bg-ink-soft px-4 py-3 text-center">
        <p className="font-arabic text-sm" dir="rtl">أين أقرب سوق؟</p>
        <p className="mt-1 text-[9px] font-mono uppercase tracking-wide text-paper/40">English → Arabic</p>
      </div>

      <div className="grid h-14 w-14 place-items-center rounded-full bg-gold text-ink">
        <Mic size={22} />
      </div>
    </div>
  );
}

export function CameraScreen() {
  return (
    <div className="relative flex h-full flex-col justify-between bg-ink px-3 pb-5 pt-8 text-paper">
      <div className="absolute inset-x-3 top-8 flex flex-col gap-2">
        <div className="rounded-lg border-2 border-gold/70 bg-ink-soft/40 px-3 py-2 backdrop-blur-sm">
          <p className="text-[9px] font-mono uppercase tracking-wide text-gold/80">Sign detected</p>
          <p className="mt-0.5 text-sm font-semibold">Fresh Fish Market</p>
          <p className="text-[10px] text-paper/60">Marché de Poisson Frais</p>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <span className="rounded-full bg-ink-soft px-2.5 py-1 text-[9px] font-mono uppercase text-paper/60">SW</span>
        <div className="grid h-12 w-12 place-items-center rounded-full border-2 border-gold text-gold">
          <Camera size={20} />
        </div>
        <span className="rounded-full bg-ink-soft px-2.5 py-1 text-[9px] font-mono uppercase text-paper/60">FR</span>
      </div>
    </div>
  );
}
