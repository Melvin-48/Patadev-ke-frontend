import { useNavigate } from 'react-router-dom';
import {
  ArrowUpRight,
  Bell,
  Briefcase,
  ChevronRight,
  CircleDollarSign,
  FileCheck2,
  MessageSquare,
  Plus,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import MetricCard from '../../../components/dashboard/MetricCard';
import Activity from '../../../components/dashboard/Activity';
import ProjectRow from '../../../components/dashboard/ProjectRow';
import Avatar from '../../../components/dashboard/Avatar';
import { useToast, Toast } from '../../../components/dashboard/useToast';
import { selectedBidId, mockDevelopers, mockProjects } from '../../../data/mock';

// Dashboard landing - role-aware overview. Client sees their projects and
// incoming bids; developer sees opportunities matched to their profile.
// TODO: replace mock arrays with projectsService.list / bidsService.listMine.
export default function DashboardOverviewPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast, notify } = useToast();
  const isClient = user?.role === 'CLIENT';
  const today = new Date().toLocaleDateString('en-KE', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  function openProject(project: (typeof mockProjects)[number]) {
    if (project.status === 'DRAFT') return navigate('/dashboard/projects/new');
    if (project.status === 'OPEN') return navigate(`/dashboard/projects/${project.id}/bids`);
    return navigate(`/dashboard/engagements/${selectedBidId}`);
  }

  const opportunities = [
    { title: 'Fintech dashboard redesign', skills: 'React, Node.js, PostgreSQL', price: 'KES 840K – KES 1.2M', bids: 6 },
    { title: 'Inventory management app', skills: 'TypeScript, AWS, Python', price: 'KES 500K – KES 720K', bids: 9 },
    { title: 'B2B customer portal', skills: 'Figma, Next.js, Tailwind', price: 'KES 1.1M – KES 1.4M', bids: 3 },
  ];

  return (
    <>
      <div className="welcome-row">
        <div>
          <p className="greeting">{today}</p>
          <h1>Good morning <span className="wave">✦</span></h1>
          <p className="welcome-sub">
            {isClient
              ? 'Here’s the latest on your projects and the people building them.'
              : 'Your next great project is closer than you think.'}
          </p>
        </div>
        <button
          className="button button-primary"
          onClick={() => navigate(isClient ? '/dashboard/projects/new' : '/dashboard/browse')}
        >
          <Plus size={17} />
          {isClient ? 'Create a project' : 'Browse projects'}
        </button>
      </div>

      <div className="metric-grid">
        <MetricCard
          label={isClient ? 'Active projects' : 'Active bids'}
          value={isClient ? '3' : '7'}
          trend="+2 this month"
          icon={<Briefcase size={18} />}
          tone="blue"
        />
        <MetricCard
          label={isClient ? 'Bids received' : 'Matched projects'}
          value={isClient ? '24' : '4'}
          trend={isClient ? '+8 this month' : '+1 this month'}
          icon={<TrendingUp size={18} />}
          tone="green"
        />
        <MetricCard
          label={isClient ? 'Total invested' : 'Total earned'}
          value={isClient ? 'KES 2.4M' : 'KES 1.9M'}
          trend="Across all projects"
          icon={<CircleDollarSign size={18} />}
          tone="gold"
        />
        <MetricCard
          label="Unread updates"
          value="3"
          trend="Needs your attention"
          icon={<Bell size={18} />}
          tone="coral"
        />
      </div>

      <div className="content-grid main-grid">
        <section className="panel project-panel">
          <div className="panel-header">
            <div>
              <span className="eyebrow">{isClient ? 'YOUR PROJECTS' : 'RECENT OPPORTUNITIES'}</span>
              <h2>{isClient ? 'Keep your work moving' : 'Projects made for your skills'}</h2>
            </div>
            <button className="text-button" onClick={() => navigate(isClient ? '/dashboard/projects' : '/dashboard/browse')}>
              View all <ChevronRight size={15} />
            </button>
          </div>
          {isClient ? (
            <div className="project-list">
              {mockProjects.slice(0, 3).map((project) => (
                <ProjectRow key={project.id} project={project} onClick={() => openProject(project)} />
              ))}
            </div>
          ) : (
            <div className="opportunity-list">
              {opportunities.map((opportunity, index) => (
                <div className="opportunity" key={opportunity.title}>
                  <Avatar initials={mockDevelopers[index].initials} color={mockDevelopers[index].color} />
                  <div className="opportunity-copy">
                    <strong>{opportunity.title}</strong>
                    <span>{opportunity.skills}</span>
                  </div>
                  <div className="opportunity-price">
                    <strong>{opportunity.price}</strong>
                    <span>{opportunity.bids} bids</span>
                  </div>
                  <ChevronRight size={16} className="muted-icon" />
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="panel activity-panel">
          <div className="panel-header">
            <div>
              <span className="eyebrow">ACTIVITY</span>
              <h2>Recent updates</h2>
            </div>
          </div>
          <div className="activity-list">
            <Activity
              icon={<MessageSquare size={15} />}
              title={isClient ? 'Alex Morgan sent a message' : 'Your bid was viewed'}
              detail={isClient ? 'Real POS System' : 'Customer Management CRM'}
              time="12 min ago"
              color="blue"
            />
            <Activity
              icon={<FileCheck2 size={15} />}
              title={isClient ? 'New bid received' : 'New project match'}
              detail={isClient ? 'Real POS System · 8 bids' : 'Inventory Management'}
              time="2 hrs ago"
              color="green"
            />
            <Activity
              icon={<ShieldCheck size={15} />}
              title="Payment released"
              detail={isClient ? 'Milestone · KES 228,000' : 'Milestone · KES 60,000'}
              time="Yesterday"
              color="coral"
            />
          </div>
        </section>
      </div>

      <section className="tip-banner">
        <div className="tip-art"><Sparkles size={23} /></div>
        <div>
          <span className="eyebrow">A LITTLE SOMETHING EXTRA</span>
          <h3>{isClient ? 'Great projects start with great briefs.' : 'Your profile is looking good.'}</h3>
          <p>
            {isClient
              ? 'A clear brief helps the right developers understand your vision and submit stronger proposals.'
              : 'Add one more portfolio piece to stand out to clients looking for your exact skill set.'}
          </p>
        </div>
        <button className="button button-light" onClick={() => navigate(isClient ? '/dashboard/projects/new' : '/dashboard/settings')}>
          {isClient ? 'Create a brief' : 'Update profile'} <ArrowUpRight size={15} />
        </button>
      </section>

      <Toast message={toast} />
    </>
  );
}