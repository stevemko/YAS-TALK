// src/components/Hero.jsx
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0b1714] via-[#12211d] to-[#0f172a] text-white py-24 px-6 lg:px-12">
      {/* Decorative background ambient glow */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Compelling Copy & CTA */}
        <div className="lg:col-span-7 space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-gold text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
            YASTALK · REAL-TIME TRANSLATION
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
            Say it once. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gold">
              Be understood everywhere.
            </span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-2xl">
            YasTalk is a next-generation translation app built for how people actually talk to each other — by voice, by text, and face to face — across <span className="text-gold font-medium">English, French, Lingala, Swahili, and Arabic</span>.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a 
              href="#waitlist" 
              className="bg-gold hover:bg-[#d49622] text-[#12211d] font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-gold/20 hover:scale-105"
            >
              Join the waitlist
            </a>
            <a 
              href="#services" 
              className="bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold px-8 py-4 rounded-full transition-all duration-300 backdrop-blur-md"
            >
              See how it works
            </a>
          </div>
        </div>

        {/* Right Column: Visual Mockup / Floating Chat Bubble Card */}
        <div className="lg:col-span-5 flex justify-center relative">
          <div className="relative w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs text-gold font-mono tracking-widest uppercase">Live Translation</span>
            </div>

            {/* Chat Bubbles Preview */}
            <div className="space-y-3 py-2">
              <div className="bg-white/10 rounded-2xl rounded-tl-sm p-4 max-w-[85%] text-sm space-y-1">
                <div className="text-[10px] text-gray-400 uppercase tracking-wide">Arabic → English</div>
                <p className="text-white font-arabic text-right">مرحباً، كيف حالك؟</p>
                <p className="text-gold text-xs font-medium pt-1 border-t border-white/10">"Hello, how are you?"</p>
              </div>

              <div className="bg-gold/20 border border-gold/30 rounded-2xl rounded-tr-sm p-4 max-w-[85%] ml-auto text-sm space-y-1">
                <div className="text-[10px] text-gold/80 uppercase tracking-wide">English → Swahili</div>
                <p className="text-white">I'm doing well, thank you!</p>
                <p className="text-gold text-xs font-medium pt-1 border-t border-white/10">"Niko salama, asante!"</p>
              </div>
            </div>

            <div className="pt-2 text-center">
              <span className="text-[11px] text-gray-400 tracking-wide uppercase">⚡ Powered by YasTalk Voice Engine</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}