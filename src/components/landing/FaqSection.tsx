import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { cn } from '../../lib/utils';

const FAQS = [
  {
    q: 'What is PataDev Ke?',
    a: 'PataDev Ke is Kenya’s developer-business marketplace. We connect local businesses looking to build web and mobile applications with vetted, skilled developers.',
  },
  {
    q: 'How do I post a project?',
    a: 'Simply click "Post a Project", describe what you want to build, specify your estimated budget and timeline, and publish. Skilled developers will review your brief and submit proposals.',
  },
  {
    q: 'How do developers submit proposals?',
    a: 'Developers can browse open project listings, review the project requirements, and submit a detailed proposal outlining their approach, cost, and milestone schedule.',
  },
  {
    q: 'How do milestones work?',
    a: 'Projects are split into clear milestones (e.g. Design, Core Build, Testing, Launch). Funds for each milestone are held securely in escrow and released to the developer once you approve the completed work.',
  },
  {
    q: 'How are project payments handled?',
    a: 'Payments are made in KES. You fund each milestone before work begins. Once you review and approve the completed milestone deliverable, payment is transferred to the developer.',
  },
  {
    q: 'How does the platform fee work?',
    a: 'PataDev Ke charges a simple, transparent platform fee of 6% to cover payment infrastructure, escrow protection, and continuous support.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { ref, isVisible } = useScrollReveal();

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section ref={ref} id="faqs" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        
        {/* Header */}
        <div
          className="text-center mb-12 transition-all duration-500"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <p className="text-xs font-extrabold uppercase tracking-widest text-primary mb-2">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#07152F] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 mt-2 text-sm">
            Everything you need to know about getting started on PataDev Ke.
          </p>
        </div>

        {/* Smooth CSS Grid Height Accordions */}
        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.q}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all duration-200"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 text-[#07152F] font-bold text-sm sm:text-base hover:text-primary transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={cn(
                      'text-slate-400 flex-shrink-0 transition-transform duration-300',
                      isOpen && 'rotate-180 text-primary',
                    )}
                  />
                </button>

                {/* Smooth CSS Grid Expand/Collapse Container */}
                <div
                  className={cn(
                    'grid transition-all duration-300 ease-in-out',
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-5 pt-1 text-sm text-slate-500 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
