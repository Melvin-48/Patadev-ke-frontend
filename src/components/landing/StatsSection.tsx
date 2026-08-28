import { Users, FolderKanban, Star, BadgeCheck } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const METRICS = [
  {
    icon: Users,
    value: '500+',
    label: 'Developers',
  },
  {
    icon: FolderKanban,
    value: '100+',
    label: 'Projects Posted',
  },
  {
    icon: Star,
    value: '98%',
    label: 'Client Satisfaction',
  },
  {
    icon: BadgeCheck,
    value: '6%',
    label: 'Platform Fee',
  },
];

export default function StatsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-12 bg-white border-b border-slate-200">
      <div
        className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 600ms cubic-bezier(0.22, 1, 0.36, 1), transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 items-center">
          {METRICS.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.label} className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Icon size={24} className="text-[#2563EB]" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] leading-none tracking-tight mb-1">
                    {m.value}
                  </p>
                  <p className="text-sm text-slate-500 font-medium">
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
