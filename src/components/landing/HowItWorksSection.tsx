import { useScrollReveal } from '../../hooks/useScrollReveal';

const STEPS = [
  { num: '01', title: 'Post a Project',           desc: 'Describe what you need.' },
  { num: '02', title: 'Find the Right Developer', desc: 'Get matched with experts.' },
  { num: '03', title: 'Review Proposals',         desc: 'Compare bids and timelines.' },
  { num: '04', title: 'Build Through Milestones', desc: 'Track progress step-by-step.' },
  { num: '05', title: 'Complete & Pay',           desc: 'Release funds when approved.' },
];

export default function HowItWorksSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} id="how-it-works" className="py-24 bg-white border-t border-slate-200">
      <div
        className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 600ms cubic-bezier(0.22, 1, 0.36, 1), transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[#2563EB] mb-3">Workflow</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            How it works
          </h2>
        </div>

        {/* Horizontal Steps */}
        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-6 left-[10%] right-[10%] h-0.5 bg-slate-100">
            <div className="absolute top-0 left-0 h-full bg-[#2563EB] transition-all duration-1000 ease-in-out" style={{ width: isVisible ? '100%' : '0%' }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-6">
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className="relative flex flex-col items-center text-center group"
                style={{
                  transitionDelay: isVisible ? `${Math.min(i * 150, 600)}ms` : '0ms',
                }}
              >
                {/* Node */}
                <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 text-slate-400 font-bold flex items-center justify-center mb-6 relative z-10 transition-colors duration-500 group-hover:border-[#2563EB] group-hover:text-[#2563EB]">
                  {step.num}
                </div>
                
                {/* Content */}
                <h3 className="font-bold text-[#0F172A] text-[15px] mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-[200px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
