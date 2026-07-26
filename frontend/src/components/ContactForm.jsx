// src/components/Contact.jsx
import { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    // Replace YOUR_ACCESS_KEY_HERE with your free key from web3forms.com
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE"); 

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        setLoading(false);
      } else {
        alert("Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      alert("Error sending message.");
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="bg-[#0b1714] border border-white/10 rounded-3xl p-8 sm:p-16 shadow-2xl grid lg:grid-cols-12 gap-12 items-center relative overflow-hidden">
        
        {/* Background glow accent */}
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Left Column: Heading & Value Add info */}
        <div className="lg:col-span-5 space-y-6 relative z-10">
          <span className="text-xs font-bold text-gold uppercase tracking-widest bg-gold/10 px-3.5 py-1.5 rounded-full border border-gold/20">
            Get In Touch
          </span>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            Questions, ideas, or want to build with us?
          </h2>
          
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
            Whether you are a developer, potential partner, educator, or early user, we’d love to hear from you. Drop us a message and our team will get back to you shortly.
          </p>

          <div className="space-y-4 pt-4 border-t border-white/10 text-sm text-gray-300">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gold border border-white/10 font-bold">✉</span>
              <span>Yastalk@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gold border border-white/10 font-bold">🌍</span>
              <span>Connecting Global Communities</span>
            </div>
          </div>
        </div>

        {/* Right Column: Styled Form or Success State */}
        <div className="lg:col-span-7 bg-white/5 backdrop-blur-md border border-white/10 p-6 sm:p-8 rounded-2xl relative z-10 shadow-xl">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-gold/20 border border-gold/40 text-gold rounded-full flex items-center justify-center mx-auto text-2xl font-bold">✓</div>
              <h3 className="font-display text-2xl font-bold text-white">Message Sent Successfully!</h3>
              <p className="text-gray-300 text-sm max-w-md mx-auto">
                Thank you for reaching out. Your message has been forwarded directly to <span className="text-gold font-medium">Yastalk@gmail.com</span>. We will respond soon!
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs font-semibold uppercase tracking-wider text-gold hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gold mb-2">
                  Your name
                </label>
                <input 
                  type="text" 
                  name="name"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full bg-[#12211d] border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gold mb-2">
                  Your email
                </label>
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="sarah@example.com"
                  className="w-full bg-[#12211d] border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gold mb-2">
                  Your message
                </label>
                <textarea 
                  name="message"
                  required
                  rows="4" 
                  placeholder="Tell us what's on your mind or how you'd like to collaborate..."
                  className="w-full bg-[#12211d] border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-gold transition-colors resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gold hover:bg-[#d49622] text-[#12211d] font-bold py-4 rounded-xl transition-all shadow-lg shadow-gold/20 hover:scale-[1.01] text-sm uppercase tracking-wider disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send message"}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}