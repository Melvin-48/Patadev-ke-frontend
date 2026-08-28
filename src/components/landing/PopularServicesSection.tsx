import { Link } from 'react-router-dom';
import {
  Globe, Smartphone, Server, Paintbrush, Bot,
  ShoppingCart, Plug, Database, ArrowRight,
} from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const CATEGORIES = [
  { icon: Globe,        label: 'Web Development',      color: 'text-primary',      bg: 'bg-primary/8' },
  { icon: Smartphone,   label: 'Mobile Apps',           color: 'text-emerald-600',  bg: 'bg-emerald-50' },
  { icon: Server,       label: 'Backend Development',   color: 'text-violet-600',   bg: 'bg-violet-50' },
  { icon: Paintbrush,   label: 'UI/UX Design',          color: 'text-rose-500',     bg: 'bg-rose-50' },
  { icon: Bot,          label: 'AI & Machine Learning',  color: 'text-orange-500',   bg: 'bg-orange-50' },
  { icon: ShoppingCart, label: 'E-commerce',             color: 'text-cyan-600',     bg: 'bg-cyan-50' },
  { icon: Plug,         label: 'APIs & Integrations',   color: 'text-indigo-500',   bg: 'bg-indigo-50' },
  { icon: Database,     label: 'Database Development',  color: 'text-teal-600',     bg: 'bg-teal-50' },
];

export default function PopularServicesSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} id="services" className="py-20 bg-[#F5F9FF]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div
          className="text-center mb-12 transition-all duration-500"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Categories</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#07152F] tracking-tight">
            Find the expertise you need
          </h2>
          <p className="text-slate-500 mt-3 max-w-md mx-auto text-sm leading-relaxed">
            Browse by category or search for the specific skills your project requires.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.label}
                to="/projects"
                className="group flex items-center gap-3 bg-white rounded-2xl border border-slate-100 px-4 py-4 shadow-sm hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-200"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                <div className={`w-9 h-9 rounded-xl ${cat.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={18} className={cat.color} strokeWidth={1.8} />
                </div>
                <span className="text-sm font-semibold text-[#07152F] group-hover:text-primary transition-colors leading-tight">
                  {cat.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Footer link */}
        <div className="text-center mt-10">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            Browse all categories <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
