import { Users, FolderKanban, Star, BadgeCheck } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const METRICS = [
  {
    icon: Users,
    value: '500+',
    label: 'Developers',
    iconColor: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: FolderKanban,
    value: '100+',
    label: 'Projects Posted',
    iconColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    icon: Star,
    value: '98%',
    label: 'Client Satisfaction',
    iconColor: 'text-amber-500',
    bgColor: 'bg-amber-50',
  },
  {
    icon: BadgeCheck,
    value: '6%',
    label: 'Platform Fee',
    iconColor: 'text-violet-600',
    bgColor: 'bg-violet-50',
  },
];

export default function StatsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-10 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-center">
          {METRICS.map((m, i) => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                className="flex items-center gap-4 transition-all duration-500"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <div className={`w-12 h-12 rounded-2xl ${m.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={22} className={m.iconColor} strokeWidth={2} />
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#07152F] leading-none tracking-tight">
                    {m.value}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                    {m.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
