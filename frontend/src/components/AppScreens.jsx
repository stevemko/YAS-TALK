// src/components/TheApp.jsx
import { useState } from 'react';
import { Mic, Camera, Sparkles, Zap, ShieldCheck, Globe } from 'lucide-react';

// --- Sub-Components (Cleaned up from your original code) ---

export function ConversationScreen() {
  return (
    <div className="flex h-full flex-col justify-between bg-gradient-to-b from-teal/25 to-ink px-4 pb-6 pt-8 text-paper rounded-[32px] shadow-inner">
      <div className="flex flex-col gap-3">
        <div className="self-start rounded-2xl rounded-bl-sm bg-ink-soft px-4 py-3 text-xs leading-relaxed border border-white/5">
          <p className="font-arabic" dir="rtl">مرحباً، كيف حالك؟</p>
          <p className="mt-1 text-[10px] font-mono text-paper/45">Arabic → English</p>
        </div>
        <div className="self-end rounded-2xl rounded-br-sm bg-gold px-4 py-3 text-xs leading-relaxed text-ink font-medium shadow-md">
          <p>Hello, how are you?</p>
        </div>
        <div className="self-start rounded-2xl rounded-bl-sm bg-ink-soft px-4 py-3 text-xs leading-relaxed border border-white/5">
          <p>I'm doing well, thank you!</p>
          <p className="mt-1 text-[10px] font-mono text-paper/45">English → Arabic</p>
        </div>
        <div className="self-end rounded-2xl rounded-br-sm bg-gold px-4 py-3 text-xs leading-relaxed text-ink font-medium shadow-md">
          <p className="font-arabic" dir="rtl">أنا بخير، شكراً لك!</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 pt-4">
        <span className="rounded-full bg-ink-soft px-3 py-1 text-[10px] font-mono uppercase text-paper/60 border border-white/5">AR</span>
        <div className="grid h-12 w-12 place-items-center rounded-full bg-gold text-ink shadow-lg">
          <Mic size={20} />
        </div>
        <span className="rounded-full bg-ink-soft px-3 py-1 text-[10px] font-mono uppercase text-paper/60 border border-white/5">EN</span>
      </div>
    </div>
  );
}

export function VoiceScreen() {
  const bars = [8, 16, 28, 14, 32, 12, 22, 10, 24, 16, 8];
  return (
    <div className="flex h-full flex-col items-center justify-between bg-gradient-to-b from-gold/20 to-ink px-4 pb-6 pt-10 text-paper rounded-[32px] shadow-inner">
      <div className="text-center">
        <p className="font-mono text-[10px] uppercase tracking-widest text-paper/50">Listening…</p>
        <p className="mt-3 font-display text-lg leading-snug text-gold">
          "Where is the nearest market?"
        </p>
      </div>

      <div className="flex h-16 items-end gap-1.5">
        {bars.map((h, i) => (
          <span
            key={i}
            className="w-1.5 rounded-full bg-gold shadow-sm"
            style={{ height: `${h}px` }}
          />
        ))}
      </div>

      <div className="w-full rounded-2xl bg-ink-soft px-4 py-3 text-center border border-white/5">
        <p className="font-arabic text-base" dir="rtl">أين أقرب سوق؟</p>
        <p className="mt-1 text-[10px] font-mono uppercase tracking-wide text-paper/40">English → Arabic</p>
      </div>

      <div className="grid h-14 w-14 place-items-center rounded-full bg-gold text-ink shadow-lg animate-pulse">
        <Mic size={22} />
      </div>
    </div>
  );
}

export function CameraScreen() {
  return (
    <div className="relative flex h-full flex-col justify-between bg-ink px-4 pb-6 pt-8 text-paper rounded-[32px] shadow-inner overflow-hidden border border-white/10">
      <div className="absolute inset-x-4 top-8 flex flex-col gap-2">
        <div className="rounded-2xl border-2 border-gold/70 bg-ink-soft/80 px-4 py-3 backdrop-blur-md shadow-xl">
          <p className="text-[10px] font-mono uppercase tracking-wide text-gold">Sign detected</p>
          <p className="mt-0.5 text-base font-semibold text-white">Fresh Fish Market</p>
          <p className="text-xs text-paper/60">Marché de Poisson Frais / Soko ya Samaki</p>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <span className="rounded-full bg-ink-soft px-3 py-1 text-[10px] font-mono uppercase text-paper/60 border border-white/5">SW</span>
        <div className="grid h-12 w-12 place-items-center rounded-full border-2 border-gold text-gold bg-gold/10 shadow-lg">
          <Camera size={20} />
        </div>
        <span className="rounded-full bg-ink-soft px-3 py-1 text-[10px] font-mono uppercase text-paper/60 border border-white/5">FR</span>
      </div>
    </div>
  );
}

// --- Main App Showcase Component ---

export default function TheApp() {
  const [activeTab, setActiveTab] = useState('chat'); // 'chat', 'voice', 'camera'

  return (
    <section id="the-app" className="py-24 px-6 max-w-7xl mx-auto space-y-24">
      
      {/* Top Hero Section */}
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Heading & Value Proposition */}
        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs font-bold text-gold uppercase tracking-widest bg-gold/10 px-3.5 py-1.5 rounded-full border border-gold/25">
            The YasTalk App
          </span>
          
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink tracking-tight leading-[1.1]">
            Your pocket interpreter, <br />
            <span className="text-gold">in five languages</span>
          </h2>
          
          <p className="text-ink/80 text-base sm:text-lg leading-relaxed font-light">
            One tap to start talking. YasTalk listens, translates, and speaks back — connecting communities across English, French, Lingala, Swahili, and Arabic without missing a beat.
          </p>

          {/* Interactive Screen Switcher Tabs */}
          <div className="pt-2 flex flex-wrap gap-2">
            <button 
              onClick={() => setActiveTab('chat')}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${activeTab === 'chat' ? 'bg-[#12211d] text-white shadow-md' : 'bg-ink-soft/10 text-ink hover:bg-ink-soft/20'}`}
            >
              <Sparkles size={14} className="text-gold" /> Live Chat
            </button>
            <button 
              onClick={() => setActiveTab('voice')}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${activeTab === 'voice' ? 'bg-[#12211d] text-white shadow-md' : 'bg-ink-soft/10 text-ink hover:bg-ink-soft/20'}`}
            >
              <Mic size={14} className="text-gold" /> Voice Interpreter
            </button>
            <button 
              onClick={() => setActiveTab('camera')}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${activeTab === 'camera' ? 'bg-[#12211d] text-white shadow-md' : 'bg-ink-soft/10 text-ink hover:bg-ink-soft/20'}`}
            >
              <Camera size={14} className="text-gold" /> Vision Scan
            </button>
          </div>

          {/* Download Badges */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <div className="bg-[#12211d] text-white border border-white/15 px-6 py-3.5 rounded-2xl flex items-center gap-3 shadow-lg opacity-85 cursor-not-allowed">
              <span className="text-2xl"></span>
              <div className="text-left">
                <div className="text-[9px] uppercase text-gray-400 tracking-wider">Coming Soon</div>
                <div className="text-sm font-bold">App Store</div>
              </div>
            </div>

            <div className="bg-[#12211d] text-white border border-white/15 px-6 py-3.5 rounded-2xl flex items-center gap-3 shadow-lg opacity-85 cursor-not-allowed">
              <span className="text-2xl">▶</span>
              <div className="text-left">
                <div className="text-[9px] uppercase text-gray-400 tracking-wider">Coming Soon</div>
                <div className="text-sm font-bold">Google Play</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic App Screen Display */}
        <div className="lg:col-span-5 flex justify-center relative">
          <div className="absolute inset-0 bg-gold/15 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative w-full max-w-sm h-[520px] bg-[#12211d] border-4 border-white/10 rounded-[40px] p-4 shadow-2xl flex flex-col">
            {/* Phone Speaker Notch */}
            <div className="w-20 h-4 bg-black/40 rounded-full mx-auto mb-2 shrink-0"></div>
            
            {/* Active Screen View */}
            <div className="flex-1 overflow-hidden relative">
              {activeTab === 'chat' && <ConversationScreen />}
              {activeTab === 'voice' && <VoiceScreen />}
              {activeTab === 'camera' && <CameraScreen />}
            </div>
          </div>
        </div>

      </div>

      {/* The Gap & Solution Section */}
      <div className="grid md:grid-cols-2 gap-8 pt-12 border-t border-ink/10">
        
        {/* The Gap */}
        <div className="bg-[#12211d] text-white border border-white/10 rounded-3xl p-8 shadow-xl space-y-4">
          <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 flex items-center justify-center font-bold text-lg">✕</div>
          <h3 className="font-display text-2xl font-bold">The Communication Gap</h3>
          <p className="text-gray-300 text-sm leading-relaxed font-light">
            Standard translation apps are built for tourists, offering stiff, robotic word-for-word translations. They fail to understand cultural nuance, regional dialects, or natural speech rhythms connecting African, Middle Eastern, and Western communities.
          </p>
        </div>

        {/* The Solution */}
        <div className="bg-[#12211d] text-white border border-white/10 rounded-3xl p-8 shadow-xl space-y-4">
          <div className="w-10 h-10 rounded-xl bg-gold/20 border border-gold/30 text-gold flex items-center justify-center font-bold text-lg">✓</div>
          <h3 className="font-display text-2xl font-bold">How YasTalk Fills It</h3>
          <p className="text-gray-300 text-sm leading-relaxed font-light">
            YasTalk bridges the divide with context-aware interpretation optimized specifically for English, French, Lingala, Swahili, and Arabic. It enables fluid, human-to-human dialogue across borders instantly through voice, text, and visual tools.
          </p>
        </div>

      </div>

      {/* Key Advantages Grid */}
      <div className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h3 className="font-display text-3xl font-bold text-ink">Advantages of Using YasTalk</h3>
          <p className="text-ink/70 text-sm">Engineered for absolute clarity, speed, and real-world connection.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="bg-[#12211d] text-white border border-white/10 rounded-3xl p-8 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
              <Zap size={22} />
            </div>
            <h4 className="font-display text-xl font-bold">Lightning Fast</h4>
            <p className="text-xs text-gray-300 leading-relaxed font-light">
              Zero-lag translation pipeline designed to match the natural speed of live human conversation without awkward pauses.
            </p>
          </div>

          <div className="bg-[#12211d] text-white border border-white/10 rounded-3xl p-8 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
              <Globe size={22} />
            </div>
            <h4 className="font-display text-xl font-bold">Contextual Accuracy</h4>
            <p className="text-xs text-gray-300 leading-relaxed font-light">
              Built with deep understanding of local expressions, idioms, and regional context across Africa and international trade hubs.
            </p>
          </div>

          <div className="bg-[#12211d] text-white border border-white/10 rounded-3xl p-8 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
              <ShieldCheck size={22} />
            </div>
            <h4 className="font-display text-xl font-bold">Multi-Modal Suite</h4>
            <p className="text-xs text-gray-300 leading-relaxed font-light">
              Switch effortlessly between live text chats, voice interpretation, and camera sign-scanning all in one unified application.
            </p>
          </div>

        </div>
      </div>

    </section>
  );
}