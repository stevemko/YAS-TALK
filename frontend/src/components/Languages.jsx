// src/components/Languages.jsx
const languagesList = [
  {
    code: "GB",
    name: "English",
    native: "English",
    region: "Global & East Africa",
    description: "The global bridge of business, technology, and international diplomacy.",
  },
  {
    code: "FR",
    name: "French",
    native: "Français",
    region: "Central & West Africa / Global",
    description: "Connecting vibrant Francophone communities, commerce, and culture worldwide.",
  },
  {
    code: "CD",
    name: "Lingala",
    native: "Lingála",
    region: "DRC & Congo Basin",
    description: "The heartbeat of Central African music, storytelling, daily trade, and unity.",
  },
  {
    code: "KE",
    name: "Swahili",
    native: "Kiswahili",
    region: "East Africa & Beyond",
    description: "A fast-growing lingua franca binding millions across East African markets and communities.",
  },
  {
    code: "SA",
    name: "Arabic",
    native: "العربية",
    region: "Middle East & North Africa",
    description: "A profound historical language connecting rich trade routes, scholarship, and modern networks.",
  },
];

export default function Languages() {
  return (
    <section id="languages" className="py-24 px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
        <span className="text-xs font-bold text-gold uppercase tracking-widest bg-gold/10 px-3.5 py-1.5 rounded-full border border-gold/20">
          Where We Start
        </span>
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-ink tracking-tight">
          Five languages, <span className="text-gold">one relay</span>
        </h2>
        <p className="text-ink/80 text-base sm:text-lg leading-relaxed font-normal">
          We chose English, French, Lingala, Swahili, and Arabic because together they connect the people we grew up talking to — and we are adding more as we go.
        </p>
      </div>

      {/* Language Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {languagesList.map((lang, index) => (
          <div 
            key={index}
            className="bg-[#12211d] border border-white/10 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:border-gold/50 group shadow-xl text-white"
          >
            {/* Top Badge & Region */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center font-mono font-bold text-gold text-sm tracking-wider border border-white/10 shadow-inner">
                  {lang.code}
                </span>
                <span className="text-[10px] font-semibold text-gray-300 uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                  {lang.region}
                </span>
              </div>

              {/* Language Names */}
              <h3 className="font-display text-2xl font-bold text-white mb-1 group-hover:text-gold transition-colors">
                {lang.name}
              </h3>
              <p className="text-sm font-medium text-gold/90 mb-4 font-arabic">
                {lang.native}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                {lang.description}
              </p>
            </div>

            {/* Bottom Accent Line */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gold font-semibold">
              <span>Fully Supported</span>
              <span className="transform transition-transform group-hover:translate-x-1">→</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Callout Banner */}
      <div className="mt-16 bg-[#12211d] border border-gold/30 rounded-3xl p-8 text-center max-w-4xl mx-auto shadow-xl text-white">
        <h3 className="font-display text-xl sm:text-2xl font-bold mb-2">
          Want your native language added next?
        </h3>
        <p className="text-gray-300 text-sm max-w-xl mx-auto mb-6">
          Yas Talk is expanding rapidly to bridge more communities worldwide. Join our waitlist to vote for upcoming language integrations.
        </p>
        <a 
          href="#waitlist" 
          className="inline-block bg-gold hover:bg-[#d49622] text-[#12211d] font-bold text-sm px-8 py-3.5 rounded-full transition-all shadow-lg shadow-gold/20 hover:scale-105"
        >
          Request a Language
        </a>
      </div>
    </section>
  );
}