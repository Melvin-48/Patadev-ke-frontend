import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { cn } from '../../lib/utils';

const FAQS = [
  {
    q: 'How does PataDev Ke work?',
    a: 'PataDev Ke connects Kenyan businesses with verified local developers. Businesses post projects, developers submit proposals, and the work is completed securely through milestone-based payments.'
  },
  {
    q: 'How do businesses find developers?',
    a: 'Businesses can either post a project and receive proposals directly from interested developers, or they can browse our directory of categorized developer services and invite them to bid.'
  },
  {
    q: 'How do developers submit proposals?',
    a: 'Once a developer creates a profile and gets verified, they can browse the "Find Projects" board and submit custom proposals, including timelines and milestone breakdowns.'
  },
  {
    q: 'How are project payments handled?',
    a: 'Payments are held securely in escrow by PataDev Ke before the project (or milestone) begins. Funds are only released to the developer once the business approves the completed work.'
  },
  {
    q: 'What are milestones?',
    a: 'Milestones are specific, measurable stages of a project (e.g., "Design Approval", "Database Setup", "Final Delivery"). They help organize the workflow and tie payments to clear deliverables.'
  },
  {
    q: 'What is the platform fee?',
    a: 'PataDev Ke charges a flat 6% platform fee on all transactions. This covers payment processing, escrow services, and platform maintenance. There are no hidden fees.'
  },
  {
    q: 'Can I communicate with a developer before hiring?',
    a: 'Yes. Once a developer submits a proposal, you can use our built-in messaging system to ask questions, clarify requirements, and ensure they are the right fit before accepting their bid.'
  },
  {
    q: 'How are payments released?',
    a: 'Upon completion of a milestone, the developer requests payment. The business reviews the work, and upon approval, the funds in escrow for that specific milestone are released to the developer.'
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { ref, isVisible } = useScrollReveal();

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={ref} id="faq" className="py-24 bg-[#F8FAFC]">
      <div
        className="max-w-3xl mx-auto px-5 sm:px-8"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 600ms cubic-bezier(0.22, 1, 0.36, 1), transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[#2563EB] mb-3">Support</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Frequently asked questions
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={cn(
                  'border border-slate-200 rounded-2xl bg-white overflow-hidden transition-all duration-300',
                  isOpen ? 'shadow-md border-[#2563EB]/30' : 'shadow-sm hover:border-slate-300'
                )}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={cn('text-base font-bold', isOpen ? 'text-[#2563EB]' : 'text-[#0F172A]')}>
                    {faq.q}
                  </span>
                  <span className={cn('flex-shrink-0 ml-4 transition-transform duration-300', isOpen ? 'text-[#2563EB]' : 'text-slate-400')}>
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{ maxHeight: isOpen ? '200px' : '0px', opacity: isOpen ? 1 : 0 }}
                >
                  <p className="px-6 pb-6 text-slate-600 text-[15px] leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
