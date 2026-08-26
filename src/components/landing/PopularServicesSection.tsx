import { Link } from 'react-router-dom';
import { ArrowRight, Check, Code2, Layers, ShieldCheck, Globe, Database, Smartphone, Zap } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { cn } from '../../lib/utils';

export default function PopularServicesSection() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="services" className="relative w-full py-16 lg:py-24">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Outer Translucent Glass Card Container */}
        <div
          className={cn(
            'relative rounded-[36px] backdrop-blur-2xl border border-white/70 shadow-2xl p-8 sm:p-12 lg:p-16 transition-all duration-700 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          )}
          style={{
            background: 'rgba(255, 255, 255, 0.40)',
            boxShadow: '0 20px 50px rgba(7, 21, 47, 0.06)',
          }}
        >
          {/* Section Header */}
          <div className="flex flex-col items-center text-center gap-3 mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#07152F] tracking-tight max-w-3xl leading-tight">
              <span className="text-primary underline decoration-primary/30 underline-offset-8">
                Our Dedicated Approach
              </span>{' '}
              to Providing Exceptional Software Services
            </h2>
            <p className="text-[#64748B] text-base lg:text-lg max-w-xl font-medium mt-1">
              Tailored Strategies and Dedicated Support for Your Business Success.
            </p>
          </div>

          {/* 3 Showcase Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* ────── CARD 1: Custom Web & Mobile Apps ────── */}
            <div
              className={cn(
                'rounded-3xl overflow-hidden bg-white/90 backdrop-blur-xl border border-white shadow-xl flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
              )}
            >
              {/* Top Visual Diagram Canvas */}
              <div className="p-6 h-52 bg-slate-50/80 border-b border-slate-100 flex items-center justify-center relative overflow-hidden">
                <div className="flex flex-col items-center gap-3 w-full max-w-[260px]">
                  {/* Top nodes */}
                  <div className="flex items-center justify-between w-full">
                    <span className="px-3 py-1 rounded-lg bg-white shadow-xs border border-slate-200 text-[11px] font-semibold text-slate-600">
                      Frontend
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-white shadow-xs border border-slate-200 text-[11px] font-semibold text-slate-600">
                      Backend
                    </span>
                  </div>

                  {/* Connecting lines & Active central node */}
                  <div className="w-full flex items-center justify-center my-1 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-px border-t border-dashed border-primary/30" />
                    </div>
                    <span className="relative z-10 px-4 py-1.5 rounded-xl bg-primary text-white shadow-md text-xs font-bold flex items-center gap-1.5">
                      <Code2 size={13} />
                      <span>Web & Mobile App</span>
                    </span>
                  </div>

                  {/* Bottom nodes */}
                  <div className="flex items-center justify-between w-full">
                    <span className="px-3 py-1 rounded-lg bg-white shadow-xs border border-slate-200 text-[11px] font-semibold text-slate-600">
                      REST API
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-white shadow-xs border border-slate-200 text-[11px] font-semibold text-slate-600">
                      PostgreSQL
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Content */}
              <div className="p-7 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl font-bold text-[#07152F] mb-2 group-hover:text-primary transition-colors">
                    Custom Web & Mobile Apps
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-6">
                    Transforming your brand&apos;s digital presence through full-stack web applications and responsive mobile apps that drive engagement.
                  </p>
                </div>

                <Link
                  to="/register"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors"
                >
                  <span>Explore Web Services</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* ────── CARD 2: Milestone Escrow Security ────── */}
            <div
              className={cn(
                'rounded-3xl overflow-hidden bg-white/90 backdrop-blur-xl border border-white shadow-xl flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
              )}
              style={{ transitionDelay: isVisible ? '120ms' : '0ms' }}
            >
              {/* Top Visual Checklist Canvas */}
              <div className="p-6 h-52 bg-slate-50/80 border-b border-slate-100 flex items-center justify-center relative overflow-hidden">
                <div className="flex flex-col gap-2.5 w-full max-w-[250px]">
                  {/* Item 1 */}
                  <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                    <span className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span className="text-[11px] font-semibold text-slate-700">Project Requirements Set</span>
                  </div>

                  {/* Active Highlight Item 2 */}
                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-blue-50 border border-primary/40 shadow-sm">
                    <span className="w-5 h-5 rounded-md bg-primary text-white flex items-center justify-center shrink-0">
                      <ShieldCheck size={12} strokeWidth={2.5} />
                    </span>
                    <span className="text-[11px] font-bold text-[#07152F]">Milestone Escrow Funded</span>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                    <span className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span className="text-[11px] font-semibold text-slate-700">Instant M-Pesa Payout</span>
                  </div>
                </div>
              </div>

              {/* Bottom Content */}
              <div className="p-7 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl font-bold text-[#07152F] mb-2 group-hover:text-primary transition-colors">
                    Milestone Escrow Security
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-6">
                    Escrow protection involves locking funds safely in escrow vaults until milestone deliverables meet full technical approval.
                  </p>
                </div>

                <Link
                  to="/register"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors"
                >
                  <span>Learn About Escrow</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* ────── CARD 3: Vetted Developer Squads ────── */}
            <div
              className={cn(
                'rounded-3xl overflow-hidden bg-white/90 backdrop-blur-xl border border-white shadow-xl flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
              )}
              style={{ transitionDelay: isVisible ? '240ms' : '0ms' }}
            >
              {/* Top Visual Radial Canvas */}
              <div className="p-6 h-52 bg-slate-50/80 border-b border-slate-100 flex items-center justify-center relative overflow-hidden">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  {/* Central Node */}
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg z-10">
                    <Zap size={22} strokeWidth={2.5} />
                  </div>

                  {/* Satellite Tech Icons */}
                  <div className="absolute top-2 left-6 p-2 rounded-full bg-white shadow-xs border border-slate-200 text-slate-600">
                    <Globe size={14} />
                  </div>
                  <div className="absolute top-2 right-6 p-2 rounded-full bg-white shadow-xs border border-slate-200 text-slate-600">
                    <Layers size={14} />
                  </div>
                  <div className="absolute bottom-2 left-6 p-2 rounded-full bg-white shadow-xs border border-slate-200 text-slate-600">
                    <Smartphone size={14} />
                  </div>
                  <div className="absolute bottom-2 right-6 p-2 rounded-full bg-white shadow-xs border border-slate-200 text-slate-600">
                    <Database size={14} />
                  </div>
                </div>
              </div>

              {/* Bottom Content */}
              <div className="p-7 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl font-bold text-[#07152F] mb-2 group-hover:text-primary transition-colors">
                    Vetted Developer Squads
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-6">
                    Leverage cutting-edge Kenyan tech talent to enhance your engineering bandwidth and accelerate software milestones.
                  </p>
                </div>

                <Link
                  to="/register"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors"
                >
                  <span>Hire Vetted Devs</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
