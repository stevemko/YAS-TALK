import { Apple, PlayCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function StoreBadges({ className = '' }) {
  const { t } = useLanguage();

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <div className="flex items-center gap-2.5 rounded-xl border border-paper/20 bg-ink-soft px-4 py-2.5 opacity-90">
        <Apple size={22} className="text-paper" />
        <div className="text-left rtl:text-right">
          <p className="text-[9px] uppercase tracking-wide text-paper/50">{t.appPage.comingSoon}</p>
          <p className="text-sm font-semibold leading-tight text-paper">App Store</p>
        </div>
      </div>
      <div className="flex items-center gap-2.5 rounded-xl border border-paper/20 bg-ink-soft px-4 py-2.5 opacity-90">
        <PlayCircle size={22} className="text-paper" />
        <div className="text-left rtl:text-right">
          <p className="text-[9px] uppercase tracking-wide text-paper/50">{t.appPage.comingSoon}</p>
          <p className="text-sm font-semibold leading-tight text-paper">Google Play</p>
        </div>
      </div>
    </div>
  );
}
