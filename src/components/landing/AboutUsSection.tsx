import { Link } from 'react-router-dom';
import { Star, ArrowRight, BadgeCheck } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { mockDevelopers } from '../../data/mock';

const PROFILE_IMAGES = [
  '/assets/images/profiles/profile-1.jpg',
  '/assets/images/profiles/profile-2.jpg',
  '/assets/images/profiles/profile-3.jpg',
];

const COLOR_STYLES: Record<string, { bg: string; text: string }> = {
  blue:  { bg: 'bg-primary/10',    text: 'text-primary' },
  amber: { bg: 'bg-amber-100',     text: 'text-amber-700' },
  green: { bg: 'bg-emerald-100',   text: 'text-emerald-700' },
};

export default function AboutUsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} id="developers" className="py-20 bg-[#F5F9FF]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 transition-all duration-500"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Talent</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#07152F] tracking-tight">
              Find skilled developers
            </h2>
            <p className="text-slate-500 mt-2 text-sm">
              Work directly with verified Kenyan developers who deliver results.
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline flex-shrink-0"
          >
            Browse developers <ArrowRight size={14} />
          </Link>
        </div>

        {/* Developer cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mockDevelopers.map((dev, i) => {
            const colorStyle = COLOR_STYLES[dev.color] ?? COLOR_STYLES.blue;
            const profileImage = PROFILE_IMAGES[i];
            return (
              <div
                key={dev.name}
                className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200 p-5 flex flex-col gap-4"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                {/* Top row: avatar + name + verified */}
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    <img
                      src={profileImage}
                      alt={dev.name}
                      className="w-12 h-12 rounded-xl object-cover"
                      onError={(e) => {
                        const el = e.currentTarget as HTMLImageElement;
                        el.style.display = 'none';
                        const fallback = el.nextSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    {/* Initials fallback */}
                    <div
                      className={`w-12 h-12 rounded-xl ${colorStyle.bg} ${colorStyle.text} font-extrabold text-sm items-center justify-center hidden flex-shrink-0`}
                    >
                      {dev.initials}
                    </div>
                    {/* Online dot */}
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="font-bold text-[#07152F] text-sm truncate">{dev.name}</p>
                      <BadgeCheck size={13} className="text-primary flex-shrink-0" />
                    </div>
                    <p className="text-xs text-slate-500 truncate">{dev.role}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-[#07152F]">{dev.rating}</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5">
                  {dev.skills.split(', ').map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Availability + rate */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div>
                    <p className="text-sm font-bold text-[#07152F]">{dev.amount}</p>
                    <p className="text-[11px] text-slate-500">per project · {dev.time}</p>
                  </div>
                  <Link
                    to="/signup"
                    className="px-3.5 py-1.5 rounded-lg bg-primary/8 text-primary text-xs font-bold hover:bg-primary hover:text-white transition-all"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
