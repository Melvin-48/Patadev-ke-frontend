import { Plus, Users, UserCheck, Milestone, CreditCard } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const STEPS = [
  {
    num: '01',
    icon: Plus,
    title: 'Post Your Project',
    desc: 'Describe what you need — project goals, required skills, budget, and timeline.',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    num: '02',
    icon: Users,
    title: 'Receive Proposals',
    desc: 'Review developer proposals, rates, experience, and past project reviews.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    num: '03',
    icon: UserCheck,
    title: 'Choose a Developer',
    desc: 'Select the best developer for your project and agree on milestones.',
    color: 'text-sky-600',
    bg: 'bg-sky-50',
  },
  {
    num: '04',
    icon: Milestone,
    title: 'Track Milestones',
    desc: 'Monitor progress step by step through clear project stages.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    num: '05',
    icon: CreditCard,
    title: 'Complete & Pay',
    desc: 'Review completed work and release payments with complete confidence.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
];

export default function HowItWorksSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} id="how-it-works" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div
          className="text-center mb-16 transition-all duration-500"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <p className="text-xs font-extrabold uppercase tracking-widest text-primary mb-3">Process</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#07152F] tracking-tight">
            How It Works
          </h2>
          <p className="text-slate-500 mt-3 max-w-md mx-auto text-sm leading-relaxed">
            From idea to delivery — five clear steps to project success.
          </p>
        </div>

        {/* 5-Step Process Stepper */}
        <div className="relative grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">

          {/* Connected line (desktop only) */}
          <div aria-hidden className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary/30 via-violet-200 via-sky-200 via-emerald-200 to-amber-200 z-0" />

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative z-10 flex flex-col items-center text-center group"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${i * 100}ms`,
                  transition: 'all 0.5s ease',
                }}
              >
                {/* Node icon with step number badge */}
                <div className={`relative w-14 h-14 rounded-2xl ${step.bg} flex items-center justify-center shadow-xs border border-white mb-4 group-hover:scale-105 transition-transform duration-200`}>
                  <Icon size={24} className={step.color} strokeWidth={2} />
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white border border-slate-200 text-[10px] font-extrabold flex items-center justify-center text-[#07152F] shadow-2xs">
                    {step.num}
                  </span>
                </div>

                <h3 className="font-bold text-[#07152F] text-base mb-2 leading-snug">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-[200px]">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
