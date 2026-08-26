import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { cn } from '../../lib/utils';

/* ── Trust indicator avatars (initials only, no real photos) ── */
const TRUST_AVATARS = [
  { initials: 'AK', bg: 'rgba(219,234,254,0.85)', fg: '#1769FF' },
  { initials: 'LM', bg: 'rgba(254,243,199,0.85)', fg: '#D97706' },
  { initials: 'PO', bg: 'rgba(209,250,229,0.85)', fg: '#059669' },
  { initials: 'TN', bg: 'rgba(224,231,255,0.85)', fg: '#4338CA' },
];

export default function HeroSection() {
  return (
    /*
     * Fully transparent — the gradient canvas in LandingPage provides
     * all background depth. Nothing here creates a separate card/frame.
     */
    <section
      className="relative w-full"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-8 sm:py-10 lg:py-12">

          {/* ─────────── LEFT — Text, floating directly on gradient ─────────── */}
          <div className="flex flex-col gap-6 animate-fade-up">

            {/* Headline */}
            <h1
              id="hero-heading"
              className={cn(
                'font-bold leading-[1.05] tracking-tight text-[#07152F]',
                'text-[44px] sm:text-[52px] lg:text-[58px] xl:text-[64px]',
                'max-w-[520px]',
              )}
            >
              Build Better.
              <br />
              Connect Smarter.
            </h1>

            {/* Description */}
            <p className="text-[#334155] text-[16px] lg:text-[17px] leading-relaxed max-w-[480px]">
              Connect with skilled developers, post projects, and build software
              that moves your business forward.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {/* Primary */}
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-opacity"
                style={{ background: '#1769FF' }}
              >
                Post a Project
                <ArrowRight size={15} strokeWidth={2.5} />
              </Link>

              {/* Secondary — no card, just a minimal outlined pill */}
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-[#07152F] border border-[#07152F]/20 transition-opacity"
              >
                <Search size={14} strokeWidth={2} />
                Find Projects
              </Link>
            </div>

            {/* Trust indicator */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex -space-x-2">
                {TRUST_AVATARS.map(({ initials, bg, fg }) => (
                  <span
                    key={initials}
                    className="w-7 h-7 rounded-full border-2 border-white/60 flex items-center justify-center text-[9px] font-bold"
                    style={{ background: bg, color: fg }}
                  >
                    {initials}
                  </span>
                ))}
              </div>
              <p className="text-[12px] text-[#475569]">
                Connecting businesses with{' '}
                <span className="font-semibold text-[#07152F]">skilled developers</span>{' '}
                across Kenya
              </p>
            </div>

          </div>

          {/* ─────────── RIGHT — Image, no frame/card, just shape + shadow ─────────── */}
          <div className="relative flex items-center justify-center lg:justify-end animate-fade-up-200">
            <div
              className="relative w-full max-w-[560px] lg:max-w-none rounded-3xl overflow-hidden"
              style={{
                aspectRatio: '4 / 3',
                boxShadow: '0 20px 50px -8px rgba(7,21,47,0.20)',
              }}
            >
              <img
                src="/assets/images/landing/patadev-hero.png"
                alt="Two professionals reviewing project documents — PataDev Ke marketplace"
                className="w-full h-full object-cover object-center"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
