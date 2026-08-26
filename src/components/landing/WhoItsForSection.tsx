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
          <div className="font-mono text-xs uppercase tracking-[0.25em] font-semibold text-amber-600 dark:text-amber-400">
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
              'relative rounded-3xl overflow-hidden p-8 sm:p-10 flex flex-col justify-between border border-slate-800 shadow-2xl transition-all duration-700 ease-out group',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
            )}
            style={{
              background: 'linear-gradient(145deg, #07152F 0%, #0F2347 100%)',
            }}
          >
            {/* Background image overlay with soft gradient blend */}
            <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-25 group-hover:opacity-35 transition-opacity pointer-events-none overflow-hidden">
              <img
                src="/assets/images/landing/patadev-hero.png"
                alt="Business owner using laptop"
                className="w-full h-full object-cover object-left"
              />
            </div>

            <div className="relative z-10 max-w-xs sm:max-w-sm">
              <div className="font-mono text-xs uppercase tracking-wider font-bold text-amber-400 mb-4">
                FOR BUSINESSES
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-6">
                Find the right developer for your business
              </h3>

              <ul className="flex flex-col gap-3.5 mb-8">
                {BUSINESS_BENEFITS.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-200 font-medium">
                    <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative z-10 pt-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-[#07152F] bg-amber-400 hover:bg-amber-300 transition-all duration-200 shadow-lg text-sm"
              >
                <span>Post a Project</span>
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
            </div>
          </div>

          {/* ─────────── CARD 2: FOR DEVELOPERS ─────────── */}
          <div
            className={cn(
              'relative rounded-3xl overflow-hidden p-8 sm:p-10 flex flex-col justify-between border border-slate-800 shadow-2xl transition-all duration-700 ease-out group',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
            )}
            style={{
              background: 'linear-gradient(145deg, #07152F 0%, #0F2347 100%)',
              transitionDelay: isVisible ? '150ms' : '0ms',
            }}
          >
            {/* Background image overlay with soft gradient blend */}
            <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-25 group-hover:opacity-35 transition-opacity pointer-events-none overflow-hidden">
              <img
                src="/assets/images/profiles/profile-2.jpg"
                alt="Developer coding on laptop"
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="relative z-10 max-w-xs sm:max-w-sm">
              <div className="font-mono text-xs uppercase tracking-wider font-bold text-amber-400 mb-4">
                FOR DEVELOPERS
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-6">
                Find great projects that match your skills
              </h3>

              <ul className="flex flex-col gap-3.5 mb-8">
                {DEV_BENEFITS.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-200 font-medium">
                    <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative z-10 pt-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-[#07152F] bg-amber-400 hover:bg-amber-300 transition-all duration-200 shadow-lg text-sm"
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
