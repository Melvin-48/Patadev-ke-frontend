import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, SlidersHorizontal, ChevronDown, CheckCircle2, 
  Clock3, MessageSquare, MapPin, Globe2, ShoppingCart, 
  Smartphone, Bot, Database, BarChart3, LayoutDashboard, 
  Activity, Truck, Stethoscope, GraduationCap, Building2
} from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { cn } from '../../lib/utils';

const CATEGORIES = [
  'All', 'Web Development', 'Mobile Apps', 'E-commerce', 'Backend', 
  'AI & Machine Learning', 'Data & Analytics', 'UI/UX', 'DevOps'
];

interface RealProjectCardData {
  id: string;
  title: string;
  category: string;
  categoryIcon: React.ElementType;
  filter: string;
  description: string;
  clientName: string;
  clientInitial: string;
  verified: boolean;
  budgetLabel: string;
  timeline: string;
  proposals: number;
  location: string;
  tags: string[];
  mockupType: 'pos' | 'inventory' | 'school' | 'health' | 'ecom' | 'ai' | 'mobile' | 'data';
}

const PROJECTS_DATA: RealProjectCardData[] = [
  {
    id: 'proj-01',
    title: 'Build a retail POS and inventory management platform',
    category: 'WEB DEVELOPMENT',
    categoryIcon: Globe2,
    filter: 'Web Development',
    description: 'Looking for a developer to build a web-based POS system with inventory tracking, sales reporting, and staff management.',
    clientName: 'Nairobi Retail Co.',
    clientInitial: 'N',
    verified: true,
    budgetLabel: 'KES 80,000 - 120,000',
    timeline: '3 - 5 weeks',
    proposals: 12,
    location: 'Kenya',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    mockupType: 'pos',
  },
  {
    id: 'proj-02',
    title: 'Develop a logistics delivery tracking platform',
    category: 'BACKEND',
    categoryIcon: Database,
    filter: 'Backend',
    description: 'Need a backend API to track delivery drivers in real-time, calculate optimized routes, and notify customers.',
    clientName: 'FastTrack Logistics',
    clientInitial: 'F',
    verified: true,
    budgetLabel: 'KES 150,000 - 250,000',
    timeline: '6 - 8 weeks',
    proposals: 24,
    location: 'Nairobi',
    tags: ['Python', 'Django', 'PostgreSQL', 'Redis'],
    mockupType: 'inventory',
  },
  {
    id: 'proj-03',
    title: 'Develop a school management system with student and fee tracking',
    category: 'WEB DEVELOPMENT',
    categoryIcon: Globe2,
    filter: 'Web Development',
    description: 'Require a comprehensive dashboard for school admins to manage student records, term fees, and exam results.',
    clientName: 'Elimu Academies',
    clientInitial: 'E',
    verified: true,
    budgetLabel: 'KES 300,000 - 450,000',
    timeline: '10 - 12 weeks',
    proposals: 35,
    location: 'Kenya',
    tags: ['Next.js', 'TypeScript', 'Prisma'],
    mockupType: 'school',
  },
  {
    id: 'proj-04',
    title: 'Build a clinic appointment and patient management system',
    category: 'WEB DEVELOPMENT',
    categoryIcon: Globe2,
    filter: 'Web Development',
    description: 'Looking to digitize our clinic. We need patient records, appointment scheduling, and automated SMS reminders.',
    clientName: 'Afya Care Clinic',
    clientInitial: 'A',
    verified: true,
    budgetLabel: 'KES 100,000 - 180,000',
    timeline: '4 - 6 weeks',
    proposals: 18,
    location: 'Mombasa',
    tags: ['Vue.js', 'Laravel', 'MySQL'],
    mockupType: 'health',
  },
  {
    id: 'proj-05',
    title: 'Create an e-commerce marketplace for local retailers',
    category: 'E-COMMERCE',
    categoryIcon: ShoppingCart,
    filter: 'E-commerce',
    description: 'Building a multi-vendor platform where small local shops can upload products and accept M-Pesa payments.',
    clientName: 'Soko Digital',
    clientInitial: 'S',
    verified: true,
    budgetLabel: 'KES 250,000 - 400,000',
    timeline: '8 - 10 weeks',
    proposals: 42,
    location: 'Kenya',
    tags: ['React', 'Node.js', 'MongoDB'],
    mockupType: 'ecom',
  },
  {
    id: 'proj-06',
    title: 'Create an AI-powered customer support assistant',
    category: 'AI & MACHINE LEARNING',
    categoryIcon: Bot,
    filter: 'AI & Machine Learning',
    description: 'We want to train an LLM on our company documentation to automatically answer standard customer support tickets.',
    clientName: 'TechSolve Ltd.',
    clientInitial: 'T',
    verified: true,
    budgetLabel: 'KES 90,000 - 150,000',
    timeline: '2 - 4 weeks',
    proposals: 28,
    location: 'Remote',
    tags: ['Python', 'LangChain', 'OpenAI API'],
    mockupType: 'ai',
  },
  {
    id: 'proj-07',
    title: 'Mobile app for field agriculture agents',
    category: 'MOBILE APPS',
    categoryIcon: Smartphone,
    filter: 'Mobile Apps',
    description: 'Need an offline-first mobile application for field agents to collect crop data and sync when internet is available.',
    clientName: 'AgriCorp Kenya',
    clientInitial: 'A',
    verified: false,
    budgetLabel: 'KES 180,000 - 280,000',
    timeline: '6 - 8 weeks',
    proposals: 15,
    location: 'Nakuru',
    tags: ['React Native', 'SQLite', 'Firebase'],
    mockupType: 'mobile',
  },
  {
    id: 'proj-08',
    title: 'Business intelligence dashboard for real estate',
    category: 'DATA & ANALYTICS',
    categoryIcon: BarChart3,
    filter: 'Data & Analytics',
    description: 'Seeking a data engineer to build an interactive dashboard visualizing property trends, yields, and occupancy rates.',
    clientName: 'Prime Properties',
    clientInitial: 'P',
    verified: true,
    budgetLabel: 'KES 120,000 - 200,000',
    timeline: '4 - 5 weeks',
    proposals: 9,
    location: 'Nairobi',
    tags: ['Power BI', 'SQL', 'Python'],
    mockupType: 'data',
  },
];

/* Minimal CSS/SVG Product UI Mockup Thumbnail Components */
function ProjectUiMockup({ type }: { type: RealProjectCardData['mockupType'] }) {
  const images = {
    pos: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=600&h=400',
    inventory: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c508b0?auto=format&fit=crop&q=80&w=600&h=400',
    school: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600&h=400',
    health: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600&h=400',
    ecom: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=600&h=400',
    ai: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600&h=400',
    mobile: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600&h=400',
    data: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=400'
  };

  return (
    <div className="w-full h-40 bg-slate-100 overflow-hidden">
      <img 
        src={images[type] || images.pos} 
        alt="Project Mockup" 
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />
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
      <div
        className="max-w-7xl mx-auto px-5 sm:px-8"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 500ms ease-out, transform 500ms ease-out',
        }}
      >

        {/* Header */}
        <div className="mb-6">
          <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">EXPLORE PROJECTS</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-3">
            Projects worth building
          </h2>
          <p className="text-slate-600 text-lg">
            Discover software projects posted by businesses across Kenya.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex overflow-x-auto custom-scrollbar pb-3 mb-6 -mx-5 px-5 sm:mx-0 sm:px-0 gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={cn(
                'whitespace-nowrap px-4 py-2 rounded-full text-[14px] font-semibold transition-all duration-200 cursor-pointer shrink-0',
                activeFilter === cat
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-blue-50/50'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Marketplace Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 py-3 border-y border-slate-100">
          <p className="text-sm font-semibold text-slate-500">
            Showing <span className="text-[#0F172A]">{filteredProjects.length}</span> projects
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-500 font-medium">Sort:</span>
              <button className="flex items-center gap-1 font-bold text-[#0F172A] hover:text-[#2563EB] transition-colors">
                Newest <ChevronDown size={14} />
              </button>
            </div>
            <div className="w-px h-4 bg-slate-200" />
            <button className="flex items-center gap-1.5 text-sm font-bold text-[#0F172A] hover:text-[#2563EB] transition-colors">
              <SlidersHorizontal size={14} /> Filters
            </button>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-4 -mx-5 px-5 sm:mx-0 sm:px-0 sm:pb-0 custom-scrollbar">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-white rounded-[16px] border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-[2px] transition-all duration-300 overflow-hidden flex flex-col shrink-0 w-[85vw] sm:w-auto snap-center"
              style={{
                animation: isVisible ? `fade-up 500ms ease-out ${index * 60}ms both` : 'none'
              }}
            >
              {/* Product Visual UI Mockup */}
              <div className="w-full relative overflow-hidden">
                <div className="group-hover:scale-[1.02] transition-transform duration-300 ease-out origin-bottom">
                  <ProjectUiMockup type={project.mockupType} />
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                {/* Category & Status */}
                <div className="flex items-center gap-1.5 mb-3">
                  <project.categoryIcon size={12} className="text-slate-400" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {project.category}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="font-bold text-[#0F172A] text-[17px] leading-snug mb-2 line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-[14px] text-slate-600 leading-relaxed line-clamp-2 mb-4 flex-1">
                  {project.description}
                </p>

                {/* Client Info */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                    {project.clientInitial}
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{project.clientName}</span>
                  {project.verified && <CheckCircle2 size={14} className="text-emerald-500" />}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded bg-slate-50 border border-slate-100 text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded bg-slate-50 border border-slate-100 text-slate-500">
                      +{project.tags.length - 3} more
                    </span>
                  )}
                </div>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-5">
                  <span className="flex items-center gap-1.5 text-[12px] text-slate-500 font-medium">
                    <Clock3 size={14} /> {project.timeline}
                  </span>
                  <span className="flex items-center gap-1.5 text-[12px] text-slate-500 font-medium">
                    <MessageSquare size={14} /> {project.proposals} proposals
                  </span>
                  <span className="flex items-center gap-1.5 text-[12px] text-slate-500 font-medium">
                    <MapPin size={14} /> {project.location}
                  </span>
                </div>

                {/* CTA / Budget Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Budget</p>
                    <p className="text-[15px] font-extrabold text-[#0F172A]">{project.budgetLabel}</p>
                  </div>
                  <Link
                    to={`/projects?id=${project.id}`}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-slate-200 text-[#2563EB] text-sm font-bold group-hover:bg-[#2563EB] group-hover:border-[#2563EB] group-hover:text-white transition-colors"
                  >
                    View Project <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section Bottom */}
        <div className="flex justify-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-[15px] font-bold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
          >
            View all projects <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
}
