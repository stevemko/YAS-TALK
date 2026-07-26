// src/components/Services.jsx
import yasPosterImg from '../images/yas-poster.jpg';
import voiceDemoImg from '../images/voice-demo.jpg';

export default function Services({ services }) {
  return (
    <section id="services" className="py-20 px-6 max-w-7xl mx-auto">
      {/* Original Services Grid */}
      {services && services.length > 0 && (
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Core <span className="text-gold">Services</span>
            </h2>
            <p className="text-gray-600">
              Powerful tools designed to break down language barriers instantly.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Feature Showcase Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          One App. Unlimited <span className="text-gold">Conversations</span>.
        </h2>
        <p className="text-gray-600 text-base sm:text-lg">
          Yas Talk bridges global gaps seamlessly—transforming text, voice, and live calls across English, French, Swahili, Lingala, and Arabic.
        </p>
      </div>

      {/* Feature 1: The Main Poster & Core Utility Breakdown */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-20 bg-gray-50 p-8 sm:p-12 rounded-3xl border border-gray-100">
        <div className="flex justify-center">
          <img 
            src={yasPosterImg} 
            alt="Yas Talk Overview Poster" 
            className="rounded-2xl shadow-xl max-h-[550px] object-cover w-full border-4 border-white"
          />
        </div>
        <div className="space-y-6">
          <span className="text-xs font-bold text-gold uppercase tracking-wider bg-gold/10 px-3 py-1.5 rounded-full">
            Multilingual Ecosystem
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
            Built for Every Day, Every Profession
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            Language barriers shouldn't limit opportunity. Yas Talk is precision-engineered to make complex cross-border communication effortless for everyone:
          </p>

          <div className="space-y-4 text-sm sm:text-base text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-gold font-bold text-lg">✓</span>
              <div>
                <strong className="text-gray-900">For Students & Researchers:</strong> Access global educational resources, collaborate seamlessly with international peers, and study across language divides without missing a beat.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-gold font-bold text-lg">✓</span>
              <div>
                <strong className="text-gray-900">For Traders & Entrepreneurs:</strong> Expand your market footprint. Negotiate deals, chat with suppliers, and close sales across borders with instant text and voice translation.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-gold font-bold text-lg">✓</span>
              <div>
                <strong className="text-gray-900">For Lecturers & Educators:</strong> Deliver multi-lingual lectures, engage diverse student bodies, and foster an inclusive, globally connected classroom environment.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-gold font-bold text-lg">✓</span>
              <div>
                <strong className="text-gray-900">For Travelers & Daily Life:</strong> Navigate foreign cities, speak naturally with locals, and handle everyday transactions instantly using our pocket interpreter.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature 2: Real-time Voice & Call Capabilities */}
      <div className="grid lg:grid-cols-2 gap-12 items-center bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm">
        <div className="space-y-6 order-2 lg:order-1">
          <span className="text-xs font-bold text-gold uppercase tracking-wider bg-gold/10 px-3 py-1.5 rounded-full">
            Voice & Call Engine
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
            Speak Naturally, We Translate Instantly
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            Never let translation lag slow down your flow. Whether you're making voice calls or chatting face-to-face, Yas Talk listens to your natural voice input and speaks out the translated language in real time.
          </p>
          <ul className="space-y-3 text-sm sm:text-base text-gray-700">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold"></span>
              Real-time voice-to-voice translation
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold"></span>
              Live call translation support
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold"></span>
              Instant messaging text translation
            </li>
          </ul>
        </div>
        <div className="flex justify-center order-1 lg:order-2">
          <img 
            src={voiceDemoImg} 
            alt="Yas Talk Voice Translation Illustration" 
            className="rounded-2xl shadow-md max-h-[400px] object-cover w-full border-4 border-gray-50"
          />
        </div>
      </div>
    </section>
  );
}