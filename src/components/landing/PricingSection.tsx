import { Link } from 'react-router-dom';
import { CheckCircle, Briefcase, Award, Clock } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function PricingSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24 bg-[#F8FAFC]">
      <div
        className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 600ms cubic-bezier(0.22, 1, 0.36, 1), transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* UI Mockup (Developer Dashboard) */}
          <div className="order-2 lg:order-1">
            <div className="bg-white border border-slate-200 shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden relative p-6">
              
              <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold border border-blue-100">
                    JD
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-sm">John Developer</h3>
                    <p className="text-xs text-slate-500">Full-Stack Engineer</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span className="text-[10px] font-bold">Available</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm font-bold text-[#0F172A] mb-2">
                  <span>Recommended Projects</span>
                  <span className="text-[#2563EB] text-xs cursor-pointer">View all</span>
                </div>

                {[
                  { title: 'Fintech Dashboard UI', budget: 'KES 250k', icon: Briefcase },
                  { title: 'React Native Delivery App', budget: 'KES 400k', icon: Clock },
                  { title: 'Node.js API Integration', budget: 'KES 150k', icon: Award },
                ].map((p, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] border border-slate-200 flex items-center justify-center flex-shrink-0 text-slate-500">
                      <p.icon size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#0F172A]">{p.title}</p>
                      <p className="text-xs text-slate-500 mt-1">{p.budget}</p>
                    </div>
                    <button className="text-xs font-bold text-[#2563EB] bg-white border border-slate-200 px-3 py-1.5 rounded-lg">Match</button>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Content (For Developers) */}
          <div className="order-1 lg:order-2">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-[#2563EB] text-xs font-bold uppercase tracking-widest mb-6 border border-blue-100">
              For Developers
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight mb-6">
              Find projects worth building.
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-10 max-w-lg">
              Discover opportunities that match your skills, submit proposals, and work directly with businesses.
            </p>

            <ul className="space-y-5 mb-10">
              {[
                'Discover projects matched to your skills',
                'Showcase your profile and portfolio',
                'Submit proposals directly',
                'Get paid through milestone-based projects',
              ].map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-base text-[#0F172A] font-medium">
                  <CheckCircle size={22} className="text-[#2563EB] flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/projects"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#2563EB] text-white font-bold text-[15px] hover:bg-[#1D4ED8] transition-colors shadow-sm"
            >
              Find Projects
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
