import { BadgeCheck, ShieldCheck, Milestone, MessageCircle, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const FEATURES = [
  {
    icon: BadgeCheck,
    color: 'text-primary',
    bg: 'bg-primary/8',
    title: 'Verified Developers',
    desc: 'Find developers with clear profiles, skills, and portfolios. Every developer on the platform is reviewed.',
  },
  {
    icon: ShieldCheck,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    title: 'Secure Project Payments',
    desc: 'Keep project payments organized. Funds are held securely and released as milestones are approved.',
  },
  {
    icon: Milestone,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    title: 'Milestone-Based Work',
    desc: "Track progress through clearly defined project stages — no more ambiguity about what's done and what's next.",
  },
  {
    icon: MessageCircle,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    title: 'Direct Collaboration',
    desc: 'Communicate with your developer directly through the platform with built-in messaging.',
  },
];

export default function WhoItsForSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} id="why" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div
          className="text-center mb-14 transition-all duration-500"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Why PataDev Ke</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#07152F] tracking-tight">
            Everything you need to build with confidence
          </h2>
          <p className="text-slate-500 mt-3 max-w-lg mx-auto text-sm leading-relaxed">
            We built the infrastructure so you can focus on what matters — great software.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/20 p-6 transition-all duration-200 flex flex-col gap-4"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <div className={`w-11 h-11 rounded-2xl ${f.bg} flex items-center justify-center`}>
                  <Icon size={22} className={f.color} strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="font-bold text-[#07152F] text-base mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
                <div className="mt-auto flex items-center gap-1 text-primary text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight size={12} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
