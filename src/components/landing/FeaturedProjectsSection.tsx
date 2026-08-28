import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock3, Users, ArrowRight, LayoutDashboard, Smartphone, ShoppingBag, Database, Bot, Activity } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const FILTERS = ['All', 'Web', 'Mobile', 'Backend', 'AI', 'E-commerce'];

interface RealProjectCardData {
  id: string;
  title: string;
  category: string;
  filter: string;
  description: string;
  budgetLabel: string;
  timeline: string;
  proposals: number;
  status: 'OPEN' | 'MATCHED' | 'IN PROGRESS';
  tags: string[];
  mockupType: 'pos' | 'inventory' | 'school' | 'health' | 'ecom' | 'ai';
}

const PROJECTS_DATA: RealProjectCardData[] = [
  {
    id: 'proj-01',
    title: 'Real POS System',
    category: 'Point of Sale · Web App',
    filter: 'Web',
    description: 'A modern multi-outlet point-of-sale system for retail teams with real-time stock sync.',
    budgetLabel: 'KES 480,000 – KES 720,000',
    timeline: '6 weeks',
    proposals: 8,
    status: 'OPEN',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    mockupType: 'pos',
  },
  {
    id: 'proj-02',
    title: 'Inventory Management Platform',
    category: 'Logistics · Web Application',
    filter: 'Backend',
    description: 'Centralize warehouse inventory, automated reordering, and supplier logistics tracking.',
    budgetLabel: 'KES 550,000 – KES 850,000',
    timeline: '8 weeks',
    proposals: 12,
    status: 'OPEN',
    tags: ['TypeScript', 'Node.js', 'Redis'],
    mockupType: 'inventory',
  },
  {
    id: 'proj-03',
    title: 'School Management System',
    category: 'EdTech · Enterprise App',
    filter: 'Web',
    description: 'Student records, fee payments via M-Pesa integration, exam grading, and parent portal.',
    budgetLabel: 'KES 750,000 – KES 1,200,000',
    timeline: '10 weeks',
    proposals: 14,
    status: 'OPEN',
    tags: ['React', 'Python', 'Django'],
    mockupType: 'school',
  },
  {
    id: 'proj-04',
    title: 'Healthcare Appointment Platform',
    category: 'Healthcare · Mobile App',
    filter: 'Mobile',
    description: 'Doctor discovery, video consultations, prescription history, and instant appointment booking.',
    budgetLabel: 'KES 600,000 – KES 950,000',
    timeline: '8 weeks',
    proposals: 9,
    status: 'OPEN',
    tags: ['Flutter', 'Firebase', 'Node.js'],
    mockupType: 'health',
  },
  {
    id: 'proj-05',
    title: 'E-commerce Marketplace',
    category: 'Retail · Mobile & Web',
    filter: 'E-commerce',
    description: 'Multi-vendor marketplace featuring product catalogs, M-Pesa checkout, and order tracking.',
    budgetLabel: 'KES 800,000 – KES 1,400,000',
    timeline: '12 weeks',
    proposals: 16,
    status: 'OPEN',
    tags: ['Next.js', 'Tailwind', 'Stripe/M-Pesa'],
    mockupType: 'ecom',
  },
  {
    id: 'proj-06',
    title: 'AI Customer Support Assistant',
    category: 'Artificial Intelligence · API',
    filter: 'AI',
    description: 'Custom AI agent trained on company documentation to handle customer inquiries 24/7.',
    budgetLabel: 'KES 420,000 – KES 680,000',
    timeline: '4 weeks',
    proposals: 11,
    status: 'OPEN',
    tags: ['Python', 'OpenAI API', 'FastAPI'],
    mockupType: 'ai',
  },
];

/* Minimal CSS/SVG Product UI Mockup Thumbnail Components */
function ProjectUiMockup({ type }: { type: RealProjectCardData['mockupType'] }) {
  if (type === 'pos') {
    return (
      <div className="w-full h-24 bg-gradient-to-br from-blue-50 to-indigo-50/60 rounded-xl p-2.5 flex flex-col justify-between border border-blue-100/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <LayoutDashboard size={13} className="text-primary" />
            <span className="text-[10px] font-bold text-[#07152F]">Nairobi Terminal #1</span>
          </div>
          <span className="text-[9px] font-extrabold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">ONLINE</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <div className="bg-white p-1.5 rounded-lg border border-slate-100 text-center">
            <p className="text-[8px] text-slate-400">Sales</p>
            <p className="text-[10px] font-extrabold text-[#07152F]">KES 45.2k</p>
          </div>
          <div className="bg-white p-1.5 rounded-lg border border-slate-100 text-center">
            <p className="text-[8px] text-slate-400">Orders</p>
            <p className="text-[10px] font-extrabold text-primary">128</p>
          </div>
          <div className="bg-white p-1.5 rounded-lg border border-slate-100 text-center">
            <p className="text-[8px] text-slate-400">Items</p>
            <p className="text-[10px] font-extrabold text-violet-600">340</p>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'health') {
    return (
      <div className="w-full h-24 bg-gradient-to-br from-emerald-50 to-teal-50/60 rounded-xl p-2.5 flex items-center justify-between border border-emerald-100/60">
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <Smartphone size={13} className="text-emerald-600" />
            <span className="text-[10px] font-bold text-[#07152F]">Doctor Connect App</span>
          </div>
          <p className="text-[9px] text-slate-500">Dr. Sarah K. · Cardiology</p>
          <span className="inline-block text-[8px] font-bold text-white bg-emerald-600 px-2 py-0.5 rounded-md">Booked 10:30 AM</span>
        </div>
        <div className="w-10 h-16 bg-white rounded-lg border border-slate-200 p-1 flex flex-col justify-between shadow-2xs">
          <div className="w-full h-1.5 bg-emerald-400 rounded-full" />
          <div className="space-y-1">
            <div className="w-full h-1 bg-slate-200 rounded" />
            <div className="w-2/3 h-1 bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'ecom') {
    return (
      <div className="w-full h-24 bg-gradient-to-br from-cyan-50 to-sky-50/60 rounded-xl p-2.5 flex flex-col justify-between border border-cyan-100/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ShoppingBag size={13} className="text-cyan-600" />
            <span className="text-[10px] font-bold text-[#07152F]">Store Checkout UI</span>
          </div>
          <span className="text-[9px] font-bold text-cyan-700 bg-cyan-100 px-1.5 py-0.5 rounded">M-PESA READY</span>
        </div>
        <div className="bg-white p-2 rounded-lg border border-slate-100 flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-[9px] font-bold text-[#07152F]">Order #8492</p>
            <p className="text-[8px] text-slate-400">Total: KES 14,500</p>
          </div>
          <span className="text-[8px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Paid</span>
        </div>
      </div>
    );
  }

  if (type === 'ai') {
    return (
      <div className="w-full h-24 bg-gradient-to-br from-amber-50 to-orange-50/60 rounded-xl p-2.5 flex flex-col justify-between border border-amber-100/60">
        <div className="flex items-center gap-1.5">
          <Bot size={13} className="text-amber-600" />
          <span className="text-[10px] font-bold text-[#07152F]">AI Assistant Console</span>
        </div>
        <div className="bg-white p-1.5 rounded-lg border border-slate-100 space-y-1">
          <p className="text-[8px] text-slate-500 font-mono">&gt; Processing query: "API docs..."</p>
          <p className="text-[9px] font-bold text-amber-700 font-mono">Response generated in 120ms</p>
        </div>
      </div>
    );
  }

  // Fallback (Inventory / Backend / School)
  return (
    <div className="w-full h-24 bg-gradient-to-br from-violet-50 to-indigo-50/60 rounded-xl p-2.5 flex flex-col justify-between border border-violet-100/60">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Database size={13} className="text-violet-600" />
          <span className="text-[10px] font-bold text-[#07152F]">Database & Analytics</span>
        </div>
        <Activity size={12} className="text-violet-500" />
      </div>
      <div className="bg-white p-2 rounded-lg border border-slate-100 flex items-center justify-between">
        <div className="w-full space-y-1">
          <div className="flex justify-between items-center text-[8px] text-slate-500 font-bold">
            <span>Server Load</span>
            <span>24%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full w-[24%] bg-violet-600 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { ref, isVisible } = useScrollReveal();

  const filteredProjects = PROJECTS_DATA.filter((p) =>
    activeFilter === 'All' ? true : p.filter === activeFilter
  );

  return (
    <section ref={ref} id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 transition-all duration-500"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-primary mb-2">DISCOVER</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#07152F] tracking-tight">
              Explore projects
            </h2>
            <p className="text-slate-500 mt-2 text-sm">
              Opportunities from businesses looking for skilled developers.
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-600 transition-colors flex-shrink-0"
          >
            View all projects <ArrowRight size={15} />
          </Link>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeFilter === f
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-primary/10 hover:text-primary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, i) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-primary/30 transition-all duration-300 overflow-hidden flex flex-col p-5 gap-4"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${i * 70}ms`,
              }}
            >
              {/* Product Visual UI Mockup */}
              <ProjectUiMockup type={project.mockupType} />

              {/* Category & Status */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {project.category}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {project.status}
                </span>
              </div>

              {/* Title & Description */}
              <div className="flex-1">
                <h3 className="font-bold text-[#07152F] text-base leading-snug mb-1.5 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {project.description}
                </p>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Meta & CTA */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div>
                  <p className="text-xs font-extrabold text-[#07152F]">{project.budgetLabel}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                      <Clock3 size={11} /> {project.timeline}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                      <Users size={11} /> {project.proposals} proposals
                    </span>
                  </div>
                </div>
                <Link
                  to={`/projects?id=${project.id}`}
                  className="px-3.5 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-bold hover:bg-primary hover:text-white transition-all"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
