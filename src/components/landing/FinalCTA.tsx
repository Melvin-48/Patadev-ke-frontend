import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function FinalCTA() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div
          className="relative rounded-3xl bg-gradient-to-br from-[#EFF6FF] via-[#F5F9FF] to-[#DBEAFE] border border-blue-100/80 p-10 sm:p-16 text-center overflow-hidden shadow-sm transition-all duration-500"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          {/* Subtle soft background glow */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-indigo-100/50 blur-3xl" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-[#07152F]">
              Ready to build something great?
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              Whether you're hiring or looking for your next opportunity, PataDev helps you move from idea to delivery.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-600 transition-all shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
              >
                Post a Project
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-[#07152F] font-bold text-sm border border-slate-200 hover:border-primary/40 hover:bg-slate-50 transition-all shadow-xs"
              >
                Find Developers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
