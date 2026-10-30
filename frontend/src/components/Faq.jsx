import { ChevronDown } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

// Plain <details> elements: keyboard and screen-reader friendly with no extra code.
const QUESTIONS = [
  { q: 'When can I download the app?', a: 'YasTalk is opening in early access. Join the waitlist and we will email you the moment it is ready.' },
  { q: 'Which languages does YasTalk support?', a: 'English, French, Lingala, Swahili and Arabic from day one, with more to come.' },
  { q: 'Does it work without internet?', a: 'YasTalk is built to work offline, so you can keep translating where the signal is weak.' },
  { q: 'How do I pay for a plan?', a: 'Right here on the website with M-Pesa. Choose a plan, create your account, enter your M-Pesa number and approve the prompt on your phone. We email you a receipt, and the plan is tied to your account.' },
  { q: 'Do you keep my payment details?', a: 'No. We never see your M-Pesa PIN. We keep only the amount, the date and the M-Pesa receipt code.' },
  { q: 'Can I support YasTalk without subscribing?', a: 'Yes. The Donate page takes gifts of any size by M-Pesa, card or crypto.' },
];

export default function Faq() {
  return (
    <section id="faq" className="bg-paper px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading title="Questions, answered" subtitle="Cannot find what you need? Send us a message below." />
        <Reveal>
          <div className="divide-y divide-ink/15 border-y border-ink/15">
            {QUESTIONS.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl font-semibold text-ink marker:hidden [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <ChevronDown size={20} className="shrink-0 text-ink/50 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="mt-3 max-w-prose leading-relaxed text-ink/70">{item.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
