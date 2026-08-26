import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { cn } from '../../lib/utils';

const ABOUT_METRICS = [
  {
    value: '1,200+',
    label: 'Vetted Developers',
  },
  {
    value: '50M+',
    prefix: 'KES ',
    label: 'Escrow Funds Protected',
  },
  {
    value: '98.8%',
    label: 'Satisfaction Rate',
  },
  {
    value: '3,500+',
    label: 'Milestones Completed',
  },
];

export default function AboutUsSection() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="about" className="relative w-full py-16 lg:py-24">
      <div ref={ref} className="max-w-6xl mx-auto px-6 lg:px-8">
        
        {/* Main Clean White Rounded Card Container */}
        <div
          className={cn(
            'relative rounded-[36px] bg-white/95 backdrop-blur-2xl border border-white p-8 sm:p-12 lg:p-16 shadow-2xl transition-all duration-700 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          )}
        >
          {/* Top Section: Left Text Content vs Right Layered Image Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left Text Column (7/12) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#07152F] tracking-tight">
                About Us
              </h2>

              <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-normal">
                At PataDev, we believe software development is more than writing code—it&apos;s about empowering Kenyan businesses with vetted local tech talent and guaranteed milestone escrow protection.
              </p>

              <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-normal">
                With expert developer matching, milestone-driven escrow vaults, and dedicated dispute resolution, we make software projects effortless, transparent, and completely risk-free.
              </p>

              {/* Orange Pill CTA Button (Reference Matching) */}
              <div className="pt-2">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white shadow-lg transition-all duration-200 hover:opacity-90 text-sm"
                  style={{ background: '#FF6525' }}
                >
                  <span>More about us</span>
                  <ArrowRight size={16} strokeWidth={2.5} />
                </Link>
              </div>
            </div>

            {/* Right Column: Layered Overlapping Image Cards (5/12) */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end items-center min-h-[300px] sm:min-h-[340px] pt-4 lg:pt-0">
              
              {/* Back Image Card */}
              <div className="w-56 h-56 sm:w-68 sm:h-68 rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-100">
                <img
                  src="/assets/images/landing/patadev-hero.png"
                  alt="Developer team in Kenya"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Front Overlapping Rotated Card */}
              <div className="absolute top-6 right-2 sm:right-6 w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 rotate-6 transition-transform duration-300 hover:rotate-3">
                <img
                  src="/assets/images/profiles/profile-2.jpg"
                  alt="Kenyan software engineer coding"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>

          </div>

          {/* Bottom Metrics Row (Divided by subtle top border) */}
          <div className="mt-14 sm:mt-16 pt-10 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {ABOUT_METRICS.map((metric, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center">
                <div className="text-3xl sm:text-4xl font-serif font-extrabold text-[#07152F] tracking-tight mb-1">
                  {metric.prefix && (
                    <span className="text-lg font-sans font-bold text-[#FF6525] mr-1">
                      {metric.prefix}
                    </span>
                  )}
                  <span>{metric.value}</span>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#64748B]">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
