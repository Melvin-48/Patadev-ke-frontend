import { Users, FolderKanban, Star, BadgeCheck } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const STATS = [
  { icon: <Users size={20} className="text-primary" />, value: '500+', label: 'Developers', bg: 'bg-primary/8' },
  { icon: <FolderKanban size={20} className="text-emerald-600" />, value: '100+', label: 'Projects Posted', bg: 'bg-emerald-50' },
  { icon: <Star size={20} className="text-amber-500" />, value: '98%', label: 'Client Satisfaction', bg: 'bg-amber-50' },
  { icon: <BadgeCheck size={20} className="text-violet-500" />, value: '6%', label: 'Platform Fee', bg: 'bg-violet-50' },
];

export default function TrustStats() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="relative bg-white py-10 border-y border-slate-100/80">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col sm:flex-row sm:items-center gap-3 transition-all duration-500"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
                {s.icon}
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[#07152F] leading-none">{s.value}</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
