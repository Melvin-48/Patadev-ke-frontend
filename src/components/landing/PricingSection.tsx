import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const CLIENT_BENEFITS = [
  'Post projects easily — no technical jargon needed',
  'Review developer proposals side-by-side',
  'Track project milestones in real time',
  'Release payments only when work is approved',
];

const DEV_BENEFITS = [
  'Build a developer profile showcasing your work',
  'Browse projects matched to your skills',
  'Submit proposals with custom pricing',
  'Manage active engagements in one place',
];

export default function PricingSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-6">

          {/* ── FOR BUSINESSES ── */}
          <div
            className="bg-[#F8FAFC] border border-blue-100 rounded-3xl p-8 flex flex-col gap-6 transition-all duration-500 shadow-2xs"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '0ms',
            }}
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">For Businesses</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07152F] mt-2 tracking-tight">
                Have a project in mind?
              </h2>
              <p className="text-slate-500 mt-2 text-sm leading-relaxed">
                Find the right developer and turn your idea into a working product.
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {CLIENT_BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-slate-700 font-medium">
                  <CheckCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-2">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary-600 transition-colors shadow-xs"
              >
                Post a Project <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
            </div>
          </div>

          {/* ── FOR DEVELOPERS ── */}
          <div
            className="bg-[#F8FAFC] border border-violet-100 rounded-3xl p-8 flex flex-col gap-6 transition-all duration-500 shadow-2xs"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '150ms',
            }}
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-violet-600">For Developers</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07152F] mt-2 tracking-tight">
                Ready for your next project?
              </h2>
              <p className="text-slate-500 mt-2 text-sm leading-relaxed">
                Showcase your skills, discover opportunities, and work directly with Kenyan businesses.
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {DEV_BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-slate-700 font-medium">
                  <CheckCircle size={16} className="text-violet-600 mt-0.5 flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-2">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-violet-600 text-white font-bold text-sm hover:bg-violet-700 transition-colors shadow-xs"
              >
                Find Projects <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
