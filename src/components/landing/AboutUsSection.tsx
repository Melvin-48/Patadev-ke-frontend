import { ShieldCheck, Users, Award } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { cn } from '../../lib/utils';

export default function AboutUsSection() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="about" className="relative w-full py-16 lg:py-24">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div
          className={cn(
            'flex flex-col items-center text-center gap-3 mb-12 transition-all duration-700 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          )}
        >
          <div className="font-mono text-xs uppercase tracking-[0.25em] font-semibold text-primary">
            ABOUT PATADEV KE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#07152F] tracking-tight">
            Empowering Kenya&apos;s Tech Ecosystem
          </h2>
          <p className="text-[#64748B] text-base lg:text-lg max-w-2xl">
            Bridging the gap between fast-growing businesses and top African developers through milestone-driven escrow protection.
          </p>
        </div>

        {/* Story & Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Pillar 1 */}
          <div
            className={cn(
              'p-8 rounded-3xl backdrop-blur-xl border border-white/60 shadow-xl flex flex-col gap-4 transition-all duration-700 ease-out',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
            )}
            style={{ background: 'rgba(255, 255, 255, 0.65)' }}
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#07152F]">
              Milestone Escrow Protection
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              We eliminate payment risk. Client funds are locked securely in escrow before any work begins, and released only when code deliverables meet approval.
            </p>
          </div>

          {/* Pillar 2 */}
          <div
            className={cn(
              'p-8 rounded-3xl backdrop-blur-xl border border-white/60 shadow-xl flex flex-col gap-4 transition-all duration-700 ease-out',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
            )}
            style={{
              background: 'rgba(255, 255, 255, 0.65)',
              transitionDelay: isVisible ? '120ms' : '0ms',
            }}
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#07152F]">
              Vetted Kenyan Tech Talent
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              Access software engineers skilled in React, Node.js, Python, Flutter, M-Pesa API integration, and cloud infrastructure across Nairobi, Mombasa, and Kisumu.
            </p>
          </div>

          {/* Pillar 3 */}
          <div
            className={cn(
              'p-8 rounded-3xl backdrop-blur-xl border border-white/60 shadow-xl flex flex-col gap-4 transition-all duration-700 ease-out',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
            )}
            style={{
              background: 'rgba(255, 255, 255, 0.65)',
              transitionDelay: isVisible ? '240ms' : '0ms',
            }}
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-bold">
              <Award size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#07152F]">
              Guaranteed Code Quality
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              Every project comes with code review standards, milestone tracking, and built-in dispute mediation to ensure production-grade software delivery.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
