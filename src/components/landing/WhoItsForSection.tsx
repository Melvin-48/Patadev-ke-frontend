import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { cn } from '../../lib/utils';

const BUSINESS_BENEFITS = [
  'Access vetted and skilled developers',
  'Get custom CRM, POS & web solutions',
  'Secure payments and milestone tracking',
  'Save time and reduce project risk',
];

const DEV_BENEFITS = [
  'Access quality projects from serious clients',
  'Showcase your skills and build reputation',
  'Get paid securely for your work',
  'Grow your portfolio and business',
];

export default function WhoItsForSection() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="for-developers" className="relative w-full py-16 lg:py-24">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div
          className={cn(
            'flex flex-col items-center text-center gap-3 mb-12 transition-all duration-700 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          )}
        >
          <div className="font-mono text-xs uppercase tracking-[0.25em] font-semibold text-primary">
            WHO IT&apos;S FOR
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#07152F] tracking-tight">
            Built for businesses and developers
          </h2>
        </div>

        {/* Dual Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* ─────────── CARD 1: FOR BUSINESSES ─────────── */}
          <div
            className={cn(
              'relative rounded-3xl overflow-hidden p-8 sm:p-10 flex flex-col justify-between bg-white/85 backdrop-blur-xl border border-white shadow-2xl transition-all duration-700 ease-out hover:-translate-y-1 group',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
            )}
          >
            {/* Soft background image overlay with fade gradient */}
            <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-20 group-hover:opacity-30 transition-opacity pointer-events-none overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
              <img
                src="/assets/images/landing/patadev-hero.png"
                alt="Business owner using laptop"
                className="w-full h-full object-cover object-left"
              />
            </div>

            <div className="relative z-10 max-w-sm sm:max-w-md">
              <div className="font-mono text-xs uppercase tracking-widest font-extrabold text-primary mb-3">
                FOR BUSINESSES
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#07152F] leading-tight mb-6">
                Find the right developer for your business
              </h3>

              <ul className="flex flex-col gap-3.5 mb-8">
                {BUSINESS_BENEFITS.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#334155] font-semibold">
                    <span className="w-5 h-5 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative z-10 pt-2">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-white shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all duration-200 text-sm"
                style={{ background: '#1769FF' }}
              >
                <span>Post a Project</span>
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
            </div>
          </div>

          {/* ─────────── CARD 2: FOR DEVELOPERS ─────────── */}
          <div
            className={cn(
              'relative rounded-3xl overflow-hidden p-8 sm:p-10 flex flex-col justify-between bg-white/85 backdrop-blur-xl border border-white shadow-2xl transition-all duration-700 ease-out hover:-translate-y-1 group',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
            )}
            style={{
              transitionDelay: isVisible ? '150ms' : '0ms',
            }}
          >
            {/* Soft background image overlay with fade gradient */}
            <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-20 group-hover:opacity-30 transition-opacity pointer-events-none overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
              <img
                src="/assets/images/profiles/profile-2.jpg"
                alt="Developer coding on laptop"
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="relative z-10 max-w-sm sm:max-w-md">
              <div className="font-mono text-xs uppercase tracking-widest font-extrabold text-indigo-600 mb-3">
                FOR DEVELOPERS
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#07152F] leading-tight mb-6">
                Find great projects that match your skills
              </h3>

              <ul className="flex flex-col gap-3.5 mb-8">
                {DEV_BENEFITS.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#334155] font-semibold">
                    <span className="w-5 h-5 rounded-full bg-indigo-500/15 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative z-10 pt-2">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-white shadow-lg hover:bg-navy-800 transition-all duration-200 text-sm"
                style={{ background: '#07152F' }}
              >
                <span>Join as Developer</span>
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
