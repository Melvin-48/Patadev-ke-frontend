import { Plus, Users, Milestone, CreditCard } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const STEPS = [
  {
    num: '01',
    icon: Plus,
    title: 'Post a Project',
    desc: 'Tell developers what you need — project goals, scope, budget, and timeline.',
    color: 'text-primary',
    bg: 'bg-primary/8',
    connector: 'bg-primary/20',
  },
  {
    num: '02',
    icon: Users,
    title: 'Receive Proposals',
    desc: 'Review profiles, portfolios, and proposals from skilled developers.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    connector: 'bg-violet-200',
  },
  {
    num: '03',
    icon: Milestone,
    title: 'Work Through Milestones',
    desc: 'Track progress as the project moves forward through clearly defined stages.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    connector: 'bg-emerald-200',
  },
  {
    num: '04',
    icon: CreditCard,
    title: 'Approve & Pay',
    desc: 'Approve completed work and release payment. Straightforward and secure.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    connector: '',
  },
];

export default function HowItWorksSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} id="how-it-works" className="py-20 bg-[#F5F9FF]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div
          className="text-center mb-14 transition-all duration-500"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Process</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#07152F] tracking-tight">
            How it works
          </h2>
          <p className="text-slate-500 mt-3 max-w-md mx-auto text-sm">
            From idea to delivery — four simple steps.
          </p>
        </div>

        {/* Steps — horizontal on desktop, vertical on mobile */}
        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">

          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-[28px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/20 via-violet-200 to-amber-200 z-0" />

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative z-10 flex flex-col items-center text-center gap-4"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${i * 100}ms`,
                  transition: 'all 0.5s ease',
                }}
              >
                {/* Step number badge */}
                <div className={`relative w-14 h-14 rounded-2xl ${step.bg} flex items-center justify-center shadow-sm border border-white`}>
                  <Icon size={24} className={step.color} strokeWidth={1.8} />
                  <span className={`absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white border-2 ${step.color.replace('text-', 'border-')} text-[9px] font-extrabold flex items-center justify-center text-[#07152F]`}>
                    {step.num}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-[#07152F] text-base mb-1.5">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-[180px] mx-auto">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
