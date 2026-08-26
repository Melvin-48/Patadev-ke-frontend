import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ShieldCheck } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { cn } from '../../lib/utils';

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="pricing" className="relative w-full py-16 lg:py-24 overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div
          className={cn(
            'flex flex-col items-center text-center gap-3 mb-10 transition-all duration-700 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          )}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#07152F] tracking-tight">
            Choose Your Plan
          </h2>
          <p className="text-[#64748B] text-base lg:text-lg max-w-2xl">
            Affordable and adaptable pricing to suit your goals.
          </p>

          {/* Billing Cycle Pill Switcher */}
          <div className="inline-flex items-center p-1.5 rounded-full bg-blue-50/80 border border-blue-100/90 shadow-sm mt-4">
            <button
              type="button"
              onClick={() => setBillingCycle('annual')}
              className={cn(
                'flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200',
                billingCycle === 'annual'
                  ? 'bg-white text-[#07152F] shadow-sm'
                  : 'text-[#64748B] hover:text-[#07152F]',
              )}
            >
              <span>Bill annually</span>
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-primary text-[10px] font-extrabold uppercase">
                10% OFF
              </span>
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={cn(
                'px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200',
                billingCycle === 'monthly'
                  ? 'bg-white text-[#07152F] shadow-sm'
                  : 'text-[#64748B] hover:text-[#07152F]',
              )}
            >
              Bill monthly
            </button>
          </div>
        </div>

        {/* 3-Card Grid (Basic, Pro / Recommended, Enterprise) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto pt-4">
          
          {/* ────── CARD 1: BASIC ────── */}
          <div
            className={cn(
              'p-8 rounded-3xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-xl flex flex-col justify-between transition-all duration-700 ease-out hover:-translate-y-1.5',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
            )}
          >
            <div>
              <h3 className="text-xl font-bold text-[#07152F] mb-1">
                Basic
              </h3>
              <p className="text-xs text-[#64748B] mb-6 leading-relaxed">
                For individuals and small startups getting started with local devs.
              </p>

              <div className="flex items-baseline gap-1 pb-6 mb-6 border-b border-slate-100">
                <span className="text-4xl font-extrabold text-[#07152F] tracking-tight">
                  {billingCycle === 'annual' ? 'KES 0' : 'KES 0'}
                </span>
                <span className="text-xs font-semibold text-[#64748B]">
                  /month
                </span>
              </div>

              <div className="text-xs font-bold uppercase tracking-wider text-[#07152F] mb-4">
                What&apos;s included:
              </div>

              <ul className="flex flex-col gap-3 text-xs text-[#475569] font-medium mb-8">
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-primary shrink-0 mt-0.5" />
                  <span>Post up to 2 active projects</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-primary shrink-0 mt-0.5" />
                  <span>Standard developer proposals</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-primary shrink-0 mt-0.5" />
                  <span>Basic milestone escrow holding</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-primary shrink-0 mt-0.5" />
                  <span>Direct client messaging</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-primary shrink-0 mt-0.5" />
                  <span>Email support</span>
                </li>
              </ul>
            </div>

            <Link
              to="/register"
              className="w-full inline-flex items-center justify-center py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-[#07152F] text-xs font-bold transition-colors"
            >
              Get started
            </Link>
          </div>

          {/* ────── CARD 2: PRO (RECOMMENDED / FEATURED) ────── */}
          <div
            className={cn(
              'relative p-8 rounded-3xl bg-white backdrop-blur-xl border-2 border-primary shadow-2xl shadow-primary/20 flex flex-col justify-between transition-all duration-700 ease-out md:-mt-4 md:mb-[-16px]',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
            )}
            style={{ transitionDelay: isVisible ? '120ms' : '0ms' }}
          >
            {/* Recommended Pill Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-100 border border-blue-200 text-primary text-[11px] font-extrabold uppercase tracking-wider shadow-xs">
              Recommended for you
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#07152F] mb-1 pt-2">
                Pro
              </h3>
              <p className="text-xs text-[#64748B] mb-6 leading-relaxed">
                For growing teams that need vetted talent and milestone protection.
              </p>

              <div className="flex items-baseline gap-1 pb-6 mb-6 border-b border-slate-100">
                <span className="text-4xl font-extrabold text-[#07152F] tracking-tight">
                  {billingCycle === 'annual' ? 'KES 2,500' : 'KES 2,900'}
                </span>
                <span className="text-xs font-semibold text-[#64748B]">
                  /month
                </span>
              </div>

              <div className="text-xs font-bold uppercase tracking-wider text-[#07152F] mb-4">
                What&apos;s included:
              </div>

              <ul className="flex flex-col gap-3 text-xs text-[#475569] font-medium mb-8">
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-primary shrink-0 mt-0.5" />
                  <span>Unlimited project postings</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-primary shrink-0 mt-0.5" />
                  <span>Vetted senior developer matching</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-primary shrink-0 mt-0.5" />
                  <span>Full milestone escrow protection</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-primary shrink-0 mt-0.5" />
                  <span>Instant M-Pesa & Bank transfers</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-primary shrink-0 mt-0.5" />
                  <span>Dispute shield & code verification</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-primary shrink-0 mt-0.5" />
                  <span>Priority 24/7 support</span>
                </li>
              </ul>
            </div>

            <Link
              to="/register"
              className="w-full inline-flex items-center justify-center py-3.5 rounded-2xl text-white text-xs font-bold transition-all shadow-lg hover:shadow-xl"
              style={{ background: '#07152F' }}
            >
              Start with Pro
            </Link>
          </div>

          {/* ────── CARD 3: ENTERPRISE ────── */}
          <div
            className={cn(
              'p-8 rounded-3xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-xl flex flex-col justify-between transition-all duration-700 ease-out hover:-translate-y-1.5',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
            )}
            style={{ transitionDelay: isVisible ? '240ms' : '0ms' }}
          >
            <div>
              <h3 className="text-xl font-bold text-[#07152F] mb-1">
                Enterprise
              </h3>
              <p className="text-xs text-[#64748B] mb-6 leading-relaxed">
                For large organizations with custom dev squads and SLA needs.
              </p>

              <div className="flex items-baseline gap-1 pb-6 mb-6 border-b border-slate-100">
                <span className="text-4xl font-extrabold text-[#07152F] tracking-tight">
                  Custom
                </span>
                <span className="text-xs font-semibold text-[#64748B]">
                  /quote
                </span>
              </div>

              <div className="text-xs font-bold uppercase tracking-wider text-[#07152F] mb-4">
                What&apos;s included:
              </div>

              <ul className="flex flex-col gap-3 text-xs text-[#475569] font-medium mb-8">
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-primary shrink-0 mt-0.5" />
                  <span>Dedicated account & project manager</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-primary shrink-0 mt-0.5" />
                  <span>Custom API integrations & SLA guarantee</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-primary shrink-0 mt-0.5" />
                  <span>Dedicated dev squad allocation</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-primary shrink-0 mt-0.5" />
                  <span>Corporate invoicing & custom billing</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-primary shrink-0 mt-0.5" />
                  <span>Security audit & onboarding support</span>
                </li>
              </ul>
            </div>

            <Link
              to="/register"
              className="w-full inline-flex items-center justify-center py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-[#07152F] text-xs font-bold transition-colors"
            >
              Contact Sales
            </Link>
          </div>

        </div>

        {/* Security Guarantee Note */}
        <div className="mt-14 text-center flex items-center justify-center gap-2 text-xs font-semibold text-[#64748B]">
          <ShieldCheck size={16} className="text-emerald-500" />
          <span>All plans backed by 100% PataDev Escrow Vault Guarantee</span>
        </div>

      </div>
    </section>
  );
}
