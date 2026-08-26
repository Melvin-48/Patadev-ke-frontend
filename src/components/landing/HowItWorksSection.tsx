import { useState } from 'react';
import { FilePlus2, Users, ShieldCheck, CheckCircle2, Search, Send, Code2, Wallet } from 'lucide-react';
import { cn } from '../../lib/utils';

type Role = 'clients' | 'developers';

const CLIENT_STEPS = [
  {
    step: '01',
    icon: FilePlus2,
    title: 'Post Your Requirement',
    description: 'Specify project scope, tech stack requirements, timeline, and estimated budget.',
    highlight: 'No upfront posting fees',
  },
  {
    step: '02',
    icon: Users,
    title: 'Compare & Select Talent',
    description: 'Receive competitive bids from verified developers across Kenya. Review portfolios & ratings.',
    highlight: 'Vetted dev profiles',
  },
  {
    step: '03',
    icon: ShieldCheck,
    title: 'Fund Escrow Safe',
    description: 'Deposit milestone payments into secure escrow. Money is only held, never paid until approved.',
    highlight: '100% Escrow Protection',
  },
  {
    step: '04',
    icon: CheckCircle2,
    title: 'Approve & Release',
    description: 'Review submitted code & milestone deliverables. Approve to release payment instantly.',
    highlight: 'Milestone-based control',
  },
];

const DEV_STEPS = [
  {
    step: '01',
    icon: Search,
    title: 'Find Open Projects',
    description: 'Filter verified client opportunities by technology, budget, and project complexity.',
    highlight: 'Real business projects',
  },
  {
    step: '02',
    icon: Send,
    title: 'Submit Tailored Bids',
    description: 'Propose milestone breakdowns, estimated hours, and competitive pricing for the project.',
    highlight: 'Direct client communication',
  },
  {
    step: '03',
    icon: Code2,
    title: 'Build with Confidence',
    description: 'Start developing knowing the milestone funds are locked in escrow prior to your work.',
    highlight: 'Guaranteed payment backing',
  },
  {
    step: '04',
    icon: Wallet,
    title: 'Get Paid Instantly',
    description: 'Receive payouts directly to your local bank account or M-Pesa upon milestone sign-off.',
    highlight: 'Fast & transparent payouts',
  },
];

export default function HowItWorksSection() {
  const [activeRole, setActiveRole] = useState<Role>('clients');

  const steps = activeRole === 'clients' ? CLIENT_STEPS : DEV_STEPS;

  return (
    <section id="how-it-works" className="relative w-full py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
            Simple & Transparent
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#07152F] tracking-tight">
            How PataDev Works
          </h2>
          <p className="text-[#64748B] text-base lg:text-lg max-w-2xl">
            A milestone-driven software marketplace engineered for trust, speed, and seamless execution.
          </p>

          {/* Persona Switcher Tabs */}
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-sm mt-4">
            <button
              onClick={() => setActiveRole('clients')}
              className={cn(
                'px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200',
                activeRole === 'clients'
                  ? 'bg-primary text-white shadow-md shadow-primary/25'
                  : 'text-[#64748B] hover:text-[#07152F]',
              )}
            >
              For Businesses / Clients
            </button>
            <button
              onClick={() => setActiveRole('developers')}
              className={cn(
                'px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200',
                activeRole === 'developers'
                  ? 'bg-primary text-white shadow-md shadow-primary/25'
                  : 'text-[#64748B] hover:text-[#07152F]',
              )}
            >
              For Developers
            </button>
          </div>
        </div>

        {/* Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative flex flex-col justify-between p-6 rounded-3xl backdrop-blur-xl border border-white/50 shadow-xl shadow-navy/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-white/80 group"
                style={{ background: 'rgba(255, 255, 255, 0.45)' }}
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Icon size={24} strokeWidth={2} />
                    </div>
                    <span className="text-3xl font-black text-[#07152F]/15 group-hover:text-primary/30 transition-colors duration-300">
                      {item.step}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-[#07152F] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#64748B] leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Highlight Badge */}
                <div className="pt-4 border-t border-slate-200/50">
                  <span className="inline-block text-xs font-semibold text-primary bg-primary/8 px-2.5 py-1 rounded-lg">
                    ✓ {item.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
