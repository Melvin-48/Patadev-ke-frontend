import { useEffect, useState } from 'react';
import { ShieldCheck, Users, Code, Award } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { cn } from '../../lib/utils';

interface StatItem {
  icon: typeof ShieldCheck;
  end: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  subtext: string;
  color: string;
  bgColor: string;
}

const STATS: StatItem[] = [
  {
    icon: ShieldCheck,
    end: 50,
    prefix: 'KES ',
    suffix: 'M+',
    label: 'Escrow Funds Protected',
    subtext: 'Safe milestone payouts',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    icon: Users,
    end: 1200,
    suffix: '+',
    label: 'Vetted Developers',
    subtext: 'Across Kenya',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Code,
    end: 3500,
    suffix: '+',
    label: 'Milestones Completed',
    subtext: 'On-time delivery',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
  },
  {
    icon: Award,
    end: 98.8,
    decimals: 1,
    suffix: '%',
    label: 'Client Satisfaction',
    subtext: 'Verified reviews',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
];

function CountUp({
  end,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1200,
  trigger,
}: {
  end: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  trigger: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Fast easeOutCubic curve
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(easeProgress * end);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration, trigger]);

  return (
    <span>
      {prefix}
      {count.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section className="relative w-full py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Glass container blending seamlessly into the ambient background */}
        <div
          ref={ref}
          className={cn(
            'grid grid-cols-2 md:grid-cols-4 gap-6 p-6 lg:p-8 rounded-3xl backdrop-blur-xl border border-white/50 shadow-xl shadow-navy/5 transition-all duration-700 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          )}
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
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#07152F] tracking-tight min-h-[36px] flex items-center">
                    <CountUp
                      end={stat.end}
                      decimals={stat.decimals}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      trigger={isVisible}
                    />
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
