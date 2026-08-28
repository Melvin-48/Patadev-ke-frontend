import { Link } from 'react-router-dom';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function FinalCTA() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-20 bg-white">
      <div
        className="max-w-7xl mx-auto px-5 sm:px-8"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 600ms cubic-bezier(0.22, 1, 0.36, 1), transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div
          className="rounded-3xl bg-gradient-to-br from-[#0F2A5F] via-[#1D4ED8] to-[#1e3a8a] p-10 sm:p-16 text-center shadow-lg overflow-hidden relative"
        >
          {/* Subtle background pattern/texture to make it professional */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Ready to build your next project?
            </h2>
            <p className="text-blue-100 text-base sm:text-lg leading-relaxed font-medium">
              Connect with skilled developers and turn your idea into a working product.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-[#1D4ED8] font-bold text-[15px] hover:bg-slate-50 hover:shadow-lg transition-all"
              >
                Post a Project
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-transparent text-white font-bold text-[15px] border-2 border-white/80 hover:bg-white/10 hover:border-white transition-all"
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
