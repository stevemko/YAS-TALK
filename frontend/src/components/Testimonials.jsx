// src/components/Stories.jsx
export default function Stories() {
  return (
    <section id="stories" className="py-24 px-6 max-w-7xl mx-auto space-y-20">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-gold uppercase tracking-widest bg-gold/10 px-3.5 py-1.5 rounded-full border border-gold/20">
          Community & Vision
        </span>
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-ink tracking-tight">
          Built for how the world <span className="text-gold">actually talks</span>
        </h2>
        <p className="text-ink/80 text-base sm:text-lg leading-relaxed font-light">
          YasTalk isn't just a translation tool; it's a bridge built for traders, creators, and distributed teams connecting across East Africa, Central Africa, and the Middle East.
        </p>
      </div>

      {/* Use Cases / Real-World Scenarios Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Card 1: Commerce & Trade */}
        <div className="bg-[#12211d] border border-white/10 rounded-3xl p-8 text-white flex flex-col justify-between shadow-xl space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 text-gold flex items-center justify-center font-bold text-xl">
              📦
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-gold bg-gold/10 px-2.5 py-1 rounded-full">
              Cross-Border Trade
            </span>
            <h3 className="font-display text-2xl font-bold">Connecting Kinshasa & Nairobi</h3>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
              Enables merchants and suppliers to negotiate terms, manage logistics, and close deals instantly without either party needing to switch to a secondary language.
            </p>
          </div>
          <div className="pt-4 border-t border-white/10 text-xs text-gold font-semibold">
            <span>Lingala ⇄ Swahili ⇄ English</span>
          </div>
        </div>

        {/* Card 2: Culture & Content */}
        <div className="bg-[#12211d] border border-white/10 rounded-3xl p-8 text-white flex flex-col justify-between shadow-xl space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 text-gold flex items-center justify-center font-bold text-xl">
              🌍
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-gold bg-gold/10 px-2.5 py-1 rounded-full">
              Francophone & Global
            </span>
            <h3 className="font-display text-2xl font-bold">Unifying Francophone Networks</h3>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
              Bridging Central and West African communities with international markets, keeping cultural expressions and professional dialogue clear and fluid.
            </p>
          </div>
          <div className="pt-4 border-t border-white/10 text-xs text-gold font-semibold">
            <span>French ⇄ English ⇄ Arabic</span>
          </div>
        </div>

        {/* Card 3: Middle East & Regional Trade */}
        <div className="bg-[#12211d] border border-white/10 rounded-3xl p-8 text-white flex flex-col justify-between shadow-xl space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 text-gold flex items-center justify-center font-bold text-xl">
              🤝
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-gold bg-gold/10 px-2.5 py-1 rounded-full">
              MENA Partnership
            </span>
            <h3 className="font-display text-2xl font-bold">Bridging North Africa & the Gulf</h3>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
              Ensuring real-time voice and text accuracy for businesses, travelers, and remote collaborators interacting across Arabic-speaking trade corridors.
            </p>
          </div>
          <div className="pt-4 border-t border-white/10 text-xs text-gold font-semibold">
            <span>Arabic ⇄ English ⇄ French</span>
          </div>
        </div>

      </div>

      {/* Beta Testing Cohort Banner */}
      <div className="bg-[#12211d] border border-gold/30 rounded-3xl p-10 sm:p-14 text-center max-w-4xl mx-auto text-white shadow-2xl relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-60 h-60 bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <span className="text-xs font-bold text-gold uppercase tracking-widest bg-gold/10 px-3.5 py-1.5 rounded-full border border-gold/20">
          Early Access Program
        </span>
        
        <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mt-4 mb-3">
          Join our upcoming beta testing cohort
        </h3>
        
        <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto mb-8 font-light">
          We are onboarding select early testers, traders, and community leaders to experience the YasTalk live voice and translation engine first.
        </p>
        
        <a 
          href="#waitlist" 
          className="inline-block bg-gold hover:bg-[#d49622] text-[#12211d] font-bold text-sm px-8 py-4 rounded-xl transition-all shadow-lg shadow-gold/20 hover:scale-105 uppercase tracking-wider"
        >
          Secure Your Beta Spot
        </a>
      </div>

    </section>
  );
}