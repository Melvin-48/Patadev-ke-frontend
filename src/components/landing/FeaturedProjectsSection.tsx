import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock3, Users, ArrowRight, Layers } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { mockProjects } from '../../data/mock';

const FILTERS = ['All', 'Web', 'Mobile', 'Backend', 'AI', 'E-commerce'];

const TAG_COLORS: Record<string, string> = {
  React:       'bg-blue-50 text-blue-700',
  'Node.js':   'bg-emerald-50 text-emerald-700',
  PostgreSQL:  'bg-indigo-50 text-indigo-700',
  Python:      'bg-yellow-50 text-yellow-700',
  TypeScript:  'bg-sky-50 text-sky-700',
  Flutter:     'bg-cyan-50 text-cyan-700',
  Django:      'bg-green-50 text-green-700',
  AWS:         'bg-orange-50 text-orange-700',
  MongoDB:     'bg-teal-50 text-teal-700',
};

const STATUS_STYLES: Record<string, { dot: string; text: string }> = {
  OPEN:      { dot: 'bg-emerald-400', text: 'text-emerald-700' },
  MATCHED:   { dot: 'bg-blue-400',    text: 'text-blue-700' },
  COMPLETED: { dot: 'bg-slate-300',   text: 'text-slate-600' },
  DRAFT:     { dot: 'bg-amber-400',   text: 'text-amber-700' },
};

// Map mock tags per project (real tags would come from backend)
const PROJECT_TAGS: Record<string, string[]> = {
  'proj-01': ['React', 'Node.js', 'PostgreSQL'],
  'proj-02': ['React', 'TypeScript', 'MongoDB'],
  'proj-03': ['Python', 'Django', 'AWS'],
  'proj-04': ['Node.js', 'PostgreSQL'],
};

export default function FeaturedProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { ref, isVisible } = useScrollReveal();

  // Show only OPEN projects for marketplace discovery
  const displayProjects = mockProjects.filter((p) => p.status === 'OPEN' || p.status === 'DRAFT');

  return (
    <section ref={ref} id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 transition-all duration-500"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Discover</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#07152F] tracking-tight">
              Explore projects
            </h2>
            <p className="text-slate-500 mt-2 text-sm">
              Opportunities from businesses looking for skilled developers.
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline flex-shrink-0"
          >
            View all projects <ArrowRight size={14} />
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                activeFilter === f
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-primary/10 hover:text-primary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Project cards */}
        {displayProjects.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <Layers size={32} className="mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500 font-medium">No projects yet. Be the first to post one!</p>
            <Link
              to="/signup"
              className="mt-4 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-600 transition-all"
            >
              Post a Project <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayProjects.map((project, i) => {
              const status = STATUS_STYLES[project.status] ?? STATUS_STYLES.DRAFT;
              const tags = PROJECT_TAGS[project.id] ?? [];
              return (
                <div
                  key={project.id}
                  className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200 overflow-hidden flex flex-col"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  {/* Card top accent */}
                  <div className="h-1 w-full bg-gradient-to-r from-primary/60 to-primary/20 group-hover:from-primary group-hover:to-primary/60 transition-all" />

                  <div className="p-5 flex flex-col flex-1 gap-4">
                    {/* Category + status */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        {project.category}
                      </span>
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold ${status.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                        {project.status}
                      </span>
                    </div>

                    {/* Title + desc */}
                    <div className="flex-1">
                      <h3 className="font-bold text-[#07152F] text-base leading-snug mb-1.5 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Tags */}
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${TAG_COLORS[tag] ?? 'bg-slate-100 text-slate-600'}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Meta row */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div>
                        <p className="text-sm font-bold text-[#07152F]">{project.budgetLabel}</p>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="flex items-center gap-1 text-[11px] text-slate-500">
                            <Clock3 size={11} /> 6–10 wks
                          </span>
                          <span className="flex items-center gap-1 text-[11px] text-slate-500">
                            <Users size={11} /> {project.bids} proposals
                          </span>
                        </div>
                      </div>
                      <Link
                        to="/projects"
                        className="px-3.5 py-1.5 rounded-lg bg-primary/8 text-primary text-xs font-bold hover:bg-primary hover:text-white transition-all"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
