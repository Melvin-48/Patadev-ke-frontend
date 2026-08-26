import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { cn } from '../../lib/utils';

const FEATURED_PROJECTS = [
  {
    id: 'proj-1',
    category: 'Full-Stack Web App',
    title: 'E-Commerce Marketplace with M-Pesa Express Integration',
    clientName: 'Maziwa Tele Logistics',
    description: 'Looking for a senior React & Node.js developer to build a multi-vendor distribution portal with automated STK push escrow payouts.',
    techStack: ['React', 'Node.js', 'M-Pesa API', 'PostgreSQL'],
    budget: 'KES 180,000',
    milestones: '3 Milestones',
    bidsCount: 12,
    daysLeft: '4 days left',
    verified: true,
  },
  {
    id: 'proj-2',
    category: 'Mobile Application',
    title: 'Telehealth Patient Consultation & Appointment Portal',
    clientName: 'CareSync Health',
    description: 'Cross-platform mobile application for remote doctor consultations, video calls, and encrypted patient health records.',
    techStack: ['Flutter', 'Firebase', 'Tailwind', 'Python'],
    budget: 'KES 250,000',
    milestones: '4 Milestones',
    bidsCount: 8,
    daysLeft: '6 days left',
    verified: true,
  },
  {
    id: 'proj-3',
    category: 'AI & Data Analytics',
    title: 'Agricultural Yield Prediction & Real-Time Dashboard',
    clientName: 'Solby Tech',
    description: 'AI model integration and dashboard for predictive crop analytics, sensor telemetry data, and automated PDF report generation.',
    techStack: ['Python', 'TensorFlow', 'React', 'FastAPI'],
    budget: 'KES 320,000',
    milestones: '5 Milestones',
    bidsCount: 15,
    daysLeft: '2 days left',
    verified: true,
  },
];

export default function FeaturedProjectsSection() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="featured-projects" className="relative w-full py-16 lg:py-24">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div
          className={cn(
            'flex flex-col items-center text-center gap-3 mb-12 transition-all duration-700 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          )}
        >
          <div className="font-mono text-xs uppercase tracking-[0.25em] font-semibold text-primary">
            LIVE MARKETPLACE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#07152F] tracking-tight">
            Explore Active Software Projects
          </h2>
          <p className="text-[#64748B] text-base lg:text-lg max-w-2xl">
            Real opportunities posted by verified Kenyan businesses with funded milestone escrow.
          </p>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              className={cn(
                'flex flex-col justify-between p-7 rounded-3xl backdrop-blur-xl border border-white/60 shadow-xl shadow-navy/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-white group',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
              )}
              style={{
                background: 'rgba(255, 255, 255, 0.70)',
                transitionDelay: isVisible ? `${idx * 150}ms` : '0ms',
              }}
            >
              <div>
                {/* Category & Days Left Header */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    {project.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                    <Clock size={13} />
                    {project.daysLeft}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-lg font-bold text-[#07152F] leading-snug group-hover:text-primary transition-colors mb-2">
                  {project.title}
                </h3>

                {/* Client Subtitle */}
                <p className="text-xs font-medium text-slate-500 mb-3">
                  Posted by <strong className="text-slate-700">{project.clientName}</strong>
                </p>

                {/* Project Description */}
                <p className="text-xs text-[#64748B] leading-relaxed line-clamp-3 mb-5">
                  {project.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-slate-100/80 text-slate-700 text-[11px] font-medium border border-slate-200/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Meta & CTA */}
              <div className="pt-4 border-t border-slate-200/60">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                      Budget
                    </span>
                    <span className="text-lg font-extrabold text-[#07152F]">
                      {project.budget}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                      Status
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                      <Users size={13} />
                      {project.bidsCount} Bids
                    </span>
                  </div>
                </div>

                <Link
                  to={`/projects/${project.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#07152F] text-white text-xs font-semibold hover:bg-primary transition-colors duration-200 shadow-sm"
                >
                  <span>View Project Details</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-white shadow-md text-sm font-bold text-[#07152F] hover:bg-white hover:shadow-lg transition-all duration-200"
          >
            <span>Explore All 40+ Open Projects</span>
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
}
