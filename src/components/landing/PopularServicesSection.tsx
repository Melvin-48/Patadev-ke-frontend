import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Globe, Smartphone, Server, Paintbrush, Bot,
  ShoppingCart, Plug, Database, ArrowRight,
} from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { cn } from '../../lib/utils';

const CATEGORIES = [
  { id: 'web',      icon: Globe,        label: 'Web Development',      color: 'text-[#2563eb]' },
  { id: 'mobile',   icon: Smartphone,   label: 'Mobile Apps',           color: 'text-emerald-600' },
  { id: 'backend',  icon: Server,       label: 'Backend Development',   color: 'text-violet-600' },
  { id: 'uiux',     icon: Paintbrush,   label: 'UI/UX Design',          color: 'text-rose-500' },
  { id: 'ai',       icon: Bot,          label: 'AI & Machine Learning',  color: 'text-amber-600' },
  { id: 'ecommerce',icon: ShoppingCart, label: 'E-commerce',             color: 'text-cyan-600' },
  { id: 'apis',     icon: Plug,         label: 'APIs & Integrations',   color: 'text-indigo-600' },
  { id: 'db',       icon: Database,     label: 'Database Development',  color: 'text-teal-600' },
];

export default function PopularServicesSection() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('web');
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollReveal();

  const handleCategorySelect = (catId: string, label: string) => {
    setActiveCategoryId(catId);
    navigate(`/projects?category=${encodeURIComponent(label)}`);
  };

  return (
    <section ref={ref} id="categories" className="py-20 bg-white border-t border-slate-200">
      <div
        className="max-w-7xl mx-auto px-5 sm:px-8"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 600ms cubic-bezier(0.22, 1, 0.36, 1), transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[#2563eb] mb-2">Categories</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Find the expertise you need
          </h2>
          <p className="text-slate-600 mt-2 max-w-md mx-auto text-base">
            Explore developer skills across core technology disciplines.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            const isActive = activeCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id, cat.label)}
                className={cn(
                  'group flex items-center gap-3.5 rounded-2xl p-4 transition-all duration-200 border text-left cursor-pointer',
                  isActive
                    ? 'bg-[#2563eb] text-white border-[#2563eb] shadow-md shadow-blue-500/20'
                    : 'bg-white text-[#0F172A] border-slate-200 shadow-sm hover:border-blue-400 hover:bg-blue-50/50'
                )}
                style={{
                  transitionDelay: isVisible ? `${Math.min(i * 40, 200)}ms` : '0ms',
                }}
              >
                <div
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors',
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700 group-hover:bg-blue-100 group-hover:text-blue-700'
                  )}
                >
                  <Icon size={20} strokeWidth={2} className={isActive ? 'text-white' : cat.color} />
                </div>
                <span className={cn('text-sm font-bold leading-tight', isActive ? 'text-white' : 'text-[#0F172A]')}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Footer Link */}
        <div className="text-center mt-10">
          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#2563eb] hover:text-blue-800 transition-colors cursor-pointer"
          >
            Browse all categories <ArrowRight size={15} />
          </button>
        </div>

      </div>
    </section>
  );
}
