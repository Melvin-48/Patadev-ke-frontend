import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { cn } from '../../lib/utils';

const FAQS = [
  {
    question: 'How does milestone escrow protection work on PataDev?',
    answer: 'Before work begins, the client deposits funds into a secure PataDev escrow vault for the specific milestone. Money is held safely and is only released to the developer once the client reviews and approves the submitted code deliverables.',
  },
  {
    question: 'Are developers on PataDev verified?',
    answer: 'Yes. All developers undergo profile verification, technical portfolio reviews, and identity checks before they can submit proposals to active client projects on the platform.',
  },
  {
    question: 'What payment methods are supported for escrow funding and payouts?',
    answer: 'We support M-Pesa STK push for instant funding in Kenya, as well as Visa, Mastercard, and direct local bank transfers for seamless deposit and withdrawal.',
  },
  {
    question: 'What happens if there is a disagreement or code quality issue?',
    answer: 'PataDev includes a dedicated dispute resolution mechanism. Our technical arbitration team reviews submitted code, original requirements, and chat logs to mediate fair outcomes or issue full escrow refunds if work is incomplete.',
  },
  {
    question: 'How much does it cost to post a project as a business?',
    answer: 'Posting projects and receiving developer proposals is 100% free! Clients pay a small 3% processing fee only when releasing completed milestone funds to the developer.',
  },
  {
    question: 'How do developers get paid upon milestone approval?',
    answer: 'Upon client sign-off, milestone funds are immediately transferred to the developer\'s PataDev wallet, which can be withdrawn instantly to M-Pesa or any Kenyan bank account.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="relative w-full py-16 lg:py-24">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Outer Translucent Glass Card Container */}
        <div
          className={cn(
            'relative rounded-[36px] backdrop-blur-2xl border border-white/70 shadow-2xl p-8 sm:p-12 lg:p-16 transition-all duration-700 ease-out max-w-5xl mx-auto',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          )}
          style={{
            background: 'rgba(255, 255, 255, 0.40)',
            boxShadow: '0 20px 50px rgba(7, 21, 47, 0.06)',
          }}
        >
          {/* Section Header */}
          <div className="flex flex-col items-center text-center gap-3 mb-10">
            <div className="font-mono text-xs uppercase tracking-[0.25em] font-semibold text-primary">
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#07152F] tracking-tight">
              Got Questions? We Have Answers
            </h2>
            <p className="text-[#64748B] text-base lg:text-lg max-w-2xl">
              Everything you need to know about PataDev escrow protection and developer hiring.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-white/85 backdrop-blur-xl border border-white shadow-lg overflow-hidden transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-7 py-5 flex items-center justify-between gap-4 text-left transition-colors hover:bg-white/50"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-bold text-[#07152F]">
                      {faq.question}
                    </span>
                    <div
                      className={cn(
                        'w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 transition-transform duration-300',
                        isOpen && 'rotate-180 bg-primary text-white',
                      )}
                    >
                      <ChevronDown size={18} strokeWidth={2.5} />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-7 pb-6 text-xs sm:text-sm text-[#64748B] leading-relaxed animate-fade-in border-t border-slate-100/60 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
