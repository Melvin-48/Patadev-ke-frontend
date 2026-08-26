import { Link } from 'react-router-dom';
import { ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { cn } from '../../lib/utils';

export default function PricingSection() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="pricing" className="relative w-full py-16 lg:py-24">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div
          className={cn(
            'flex flex-col items-center text-center gap-3 mb-12 transition-all duration-700 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          )}
        >
          <div className="font-mono text-xs uppercase tracking-[0.25em] font-semibold text-primary">
            TRANSPARENT FEES
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#07152F] tracking-tight">
            Simple & Fair Pricing
          </h2>
          <p className="text-[#64748B] text-base lg:text-lg max-w-2xl">
            No hidden subscription fees. Pay only when milestone deliverables are reviewed and approved.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Card 1: Businesses */}
          <div
            className={cn(
              'p-8 sm:p-10 rounded-3xl backdrop-blur-xl border border-white/70 shadow-2xl flex flex-col justify-between transition-all duration-700 ease-out hover:-translate-y-1.5',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
            )}
            style={{ background: 'rgba(255, 255, 255, 0.70)' }}
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
                For Businesses
              </div>

              <h3 className="text-2xl font-bold text-[#07152F] mb-2">
                Client Escrow
              </h3>
              <p className="text-xs text-[#64748B] mb-6">
                Post projects for free and hire verified Kenyan tech talent.
              </p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl sm:text-5xl font-extrabold text-[#07152F] tracking-tight">
                  0%
                </span>
                <span className="text-xs font-semibold text-[#64748B]">
                  Posting Fee (3% Escrow release)
                </span>
              </div>

              <ul className="flex flex-col gap-3 text-xs sm:text-sm text-[#475569] font-medium mb-8">
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-emerald-500 shrink-0" />
                  <span>Unlimited free project postings</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-emerald-500 shrink-0" />
                  <span>Free proposal & bid comparisons</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-emerald-500 shrink-0" />
                  <span>100% Escrow money-back guarantee</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-emerald-500 shrink-0" />
                  <span>Dedicated dispute resolution team</span>
                </li>
              </ul>
            </div>

            <Link
              to="/register"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#07152F] text-white text-sm font-semibold hover:bg-primary transition-colors shadow-md"
            >
              <span>Post a Project Free</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Card 2: Developers */}
          <div
            className={cn(
              'p-8 sm:p-10 rounded-3xl backdrop-blur-xl border border-white/70 shadow-2xl flex flex-col justify-between transition-all duration-700 ease-out hover:-translate-y-1.5',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
            )}
            style={{
              background: 'rgba(255, 255, 255, 0.70)',
              transitionDelay: isVisible ? '150ms' : '0ms',
            }}
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 text-xs font-semibold uppercase tracking-wider mb-4">
                For Developers
              </div>

              <h3 className="text-2xl font-bold text-[#07152F] mb-2">
                Developer Payouts
              </h3>
              <p className="text-xs text-[#64748B] mb-6">
                Submit bids for free and build with guaranteed milestone backing.
              </p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl sm:text-5xl font-extrabold text-[#07152F] tracking-tight">
                  5%
                </span>
                <span className="text-xs font-semibold text-[#64748B]">
                  Payout Commission
                </span>
              </div>

              <ul className="flex flex-col gap-3 text-xs sm:text-sm text-[#475569] font-medium mb-8">
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-emerald-500 shrink-0" />
                  <span>Free proposal & bid submissions</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-emerald-500 shrink-0" />
                  <span>Guaranteed escrow payout backing</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-emerald-500 shrink-0" />
                  <span>Instant M-Pesa & Bank transfers</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-emerald-500 shrink-0" />
                  <span>Verified developer profile badge</span>
                </li>
              </ul>
            </div>

            <Link
              to="/register"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors shadow-md"
            >
              <span>Join as Developer</span>
              <ArrowRight size={15} />
            </Link>
          </div>

        </div>

        {/* Security Assurance Banner */}
        <div className="mt-12 text-center flex items-center justify-center gap-2 text-xs font-semibold text-[#64748B]">
          <ShieldCheck size={16} className="text-emerald-500" />
          <span>All transactions protected by PataDev Escrow Vault</span>
        </div>

      </div>
    </section>
  );
}
