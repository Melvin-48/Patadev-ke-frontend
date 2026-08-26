import { ShieldCheck, Users, Code, Award } from 'lucide-react';

const STATS = [
  {
    icon: ShieldCheck,
    value: 'KES 50M+',
    label: 'Escrow Funds Protected',
    subtext: 'Safe milestone payouts',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    icon: Users,
    value: '1,200+',
    label: 'Vetted Developers',
    subtext: 'Across Kenya',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Code,
    value: '3,500+',
    label: 'Milestones Completed',
    subtext: 'On-time delivery',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
  },
  {
    icon: Award,
    value: '98.8%',
    label: 'Client Satisfaction',
    subtext: 'Verified reviews',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
];

export default function StatsSection() {
  return (
    <section className="relative w-full py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Glass container blending seamlessly into the ambient background */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 lg:p-8 rounded-3xl backdrop-blur-xl border border-white/50 shadow-xl shadow-navy/5"
          style={{ background: 'rgba(255, 255, 255, 0.45)' }}
        >
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-start gap-2.5 p-3 sm:p-4 rounded-2xl transition-all duration-300 hover:bg-white/40"
              >
                <div className={`p-2.5 rounded-xl ${stat.bgColor} ${stat.color} flex items-center justify-center`}>
                  <Icon size={20} strokeWidth={2.2} />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#07152F] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-[#1E293B] mt-0.5">
                    {stat.label}
                  </div>
                  <div className="text-xs text-[#64748B] font-medium">
                    {stat.subtext}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
