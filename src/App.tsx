import { useMemo, useState } from 'react';
import type * as React from 'react';
import {
  ArrowUpRight,
  Bell,
  Briefcase,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Code2,
  Compass,
  FileCheck2,
  Filter,
  Grid2X2,
  Headphones,
  LayoutDashboard,
  LifeBuoy,
  ListFilter,
  LockKeyhole,
  Menu,
  MessageSquare,
  MoreHorizontal,
  PencilLine,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  UserRound,
  UsersRound,
  WalletCards,
  X,
} from 'lucide-react';

type Role = 'client' | 'developer';
type View = 'overview' | 'projects' | 'browse' | 'bids' | 'engagement' | 'settings' | 'notifications' | 'new-project';
type ProjectStatus = 'DRAFT' | 'OPEN' | 'MATCHED' | 'COMPLETED';

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  budget: string;
  status: ProjectStatus;
  bids: number;
  updated: string;
  accent: string;
};

const projects: Project[] = [
  { id: 1, title: 'Real POS System', category: 'Web Application', description: 'A modern point-of-sale system for growing retail teams with real-time inventory.', budget: '$8,000 – $12,000', status: 'OPEN', bids: 8, updated: '2 hours ago', accent: 'coral' },
  { id: 2, title: 'Customer Management CRM', category: 'SaaS Platform', description: 'Centralize customer data, sales activity, and follow-ups in one simple workspace.', budget: '$12,000 – $18,000', status: 'MATCHED', bids: 12, updated: 'Yesterday', accent: 'sky' },
  { id: 3, title: 'Business Operations Platform', category: 'Business Software', description: 'Connect projects, team workflows, approvals, and reporting across the business.', budget: '$20,000 – $28,000', status: 'COMPLETED', bids: 16, updated: 'May 16, 2024', accent: 'gold' },
  { id: 4, title: 'Inventory Management', category: 'Web Application', description: 'Keep stock levels accurate and teams aligned with a focused inventory system.', budget: '$7,000 – $10,000', status: 'DRAFT', bids: 0, updated: 'May 14, 2024', accent: 'mint' },
];

const developers = [
  { name: 'Alex Morgan', role: 'Full-stack engineer', initials: 'AM', color: 'blue', rating: '4.9', skills: 'React, Node.js, PostgreSQL', amount: '$10,500', time: '12 weeks' },
  { name: 'Jordan Lee', role: 'Product designer & developer', initials: 'JL', color: 'amber', rating: '5.0', skills: 'Figma, Next.js, Tailwind', amount: '$11,800', time: '14 weeks' },
  { name: 'Sam Rivera', role: 'Senior software engineer', initials: 'SR', color: 'green', rating: '4.8', skills: 'TypeScript, AWS, Python', amount: '$9,600', time: '10 weeks' },
];

const navItems: { label: string; view: View; icon: typeof LayoutDashboard; roles?: Role[] }[] = [
  { label: 'Overview', view: 'overview', icon: LayoutDashboard },
  { label: 'My Projects', view: 'projects', icon: Briefcase, roles: ['client'] },
  { label: 'Browse Projects', view: 'browse', icon: Compass, roles: ['developer'] },
  { label: 'My Bids', view: 'bids', icon: FileCheck2, roles: ['developer'] },
  { label: 'Engagements', view: 'engagement', icon: UsersRound },
];

function StatusBadge({ status }: { status: ProjectStatus }) {
  const styles: Record<ProjectStatus, string> = {
    DRAFT: 'badge badge-draft', OPEN: 'badge badge-open', MATCHED: 'badge badge-matched', COMPLETED: 'badge badge-completed',
  };
  return <span className={styles[status]}><span className="badge-dot" />{status}</span>;
}

function Avatar({ initials, color = 'blue', small = false }: { initials: string; color?: string; small?: boolean }) {
  return <span className={`avatar avatar-${color} ${small ? 'avatar-small' : ''}`}>{initials}</span>;
}

function MockDashboard() {
  const [role, setRole] = useState<Role>('client');
  const [view, setView] = useState<View>('overview');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [projectItems, setProjectItems] = useState(projects);
  const [toast, setToast] = useState('');

  const activeProject = projectItems[0];
  const visibleNav = navItems.filter((item) => !item.roles || item.roles.includes(role));

  const go = (nextView: View) => {
    setView(nextView);
    setMobileOpen(false);
    setShowNotifications(false);
  };

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2800);
  };

  const switchRole = (nextRole: Role) => {
    setRole(nextRole);
    setView('overview');
    setShowRoleMenu(false);
    notify(`Switched to ${nextRole === 'client' ? 'Client' : 'Developer'} workspace`);
  };

  const createProject = (title: string, description: string, budget: string) => {
    setProjectItems((current) => [{ id: Date.now(), title, category: 'Web Application', description, budget, status: 'DRAFT', bids: 0, updated: 'Just now', accent: 'sky' }, ...current]);
    go('projects');
    notify('Project saved as draft');
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="mobile-menu" onClick={() => setMobileOpen((open) => !open)} aria-label="Open menu"><Menu size={20} /></button>
        <button className="brand" onClick={() => go('overview')}><span className="brand-mark"><Sparkles size={17} /></span><span>PataDev<span className="brand-dot">.</span>Ke</span></button>
        <div className="topbar-links"><button onClick={() => go('browse')}>Find a developer</button><button onClick={() => go('projects')}>Join the team as a Dev</button><button onClick={() => go('engagement')}>How it works</button></div>
        <div className="topbar-actions">
          <button className="icon-button" onClick={() => setShowNotifications((open) => !open)} aria-label="Notifications"><Bell size={18} /><span className="notification-dot" /></button>
          <div className="profile-menu-wrap">
            <button className="profile-button" onClick={() => setShowRoleMenu((open) => !open)}><Avatar initials="JD" small /><span>Jordan Davis</span><ChevronDown size={15} /></button>
            {showRoleMenu && <div className="popover role-popover"><div className="popover-label">Workspace</div><button onClick={() => switchRole('client')} className={role === 'client' ? 'selected' : ''}><Building2 size={16} /> Client <Check size={15} /></button><button onClick={() => switchRole('developer')} className={role === 'developer' ? 'selected' : ''}><Code2 size={16} /> Developer <Check size={15} /></button><div className="popover-divider" /><button onClick={() => go('settings')}><Settings size={16} /> Settings</button></div>}
          </div>
        </div>
      </header>

      <div className="workspace">
        <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
          <div className="sidebar-role"><span className="eyebrow">CURRENT WORKSPACE</span><button onClick={() => setShowRoleMenu((open) => !open)}><span className={`role-icon ${role}`}><Building2 size={16} /></span><span><strong>{role === 'client' ? 'Client workspace' : 'Developer workspace'}</strong><small>{role === 'client' ? 'Hiring talent' : 'Finding great work'}</small></span><ChevronDown size={15} /></button></div>
          <nav className="main-nav"><span className="nav-label">WORKSPACE</span>{visibleNav.map((item) => { const Icon = item.icon; return <button key={item.view} className={view === item.view ? 'active' : ''} onClick={() => go(item.view)}><Icon size={17} />{item.label}{item.view === 'engagement' && <span className="nav-count">1</span>}</button>; })}</nav>
          <nav className="main-nav secondary-nav"><span className="nav-label">MANAGE</span><button className={view === 'notifications' ? 'active' : ''} onClick={() => go('notifications')}><Bell size={17} />Notifications<span className="nav-count alert">3</span></button><button className={view === 'settings' ? 'active' : ''} onClick={() => go('settings')}><Settings size={17} />Settings</button></nav>
          <div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><Headphones size={16} /></div><strong>Need a hand?</strong><p>Our team is here to help you build better.</p><button onClick={() => notify('Support request started')}>Visit help center <ArrowUpRight size={13} /></button></div><div className="sidebar-footer"><span>© 2026 PataDev.Ke</span><button>Privacy</button><button>Terms</button></div></div>
        </aside>

        <main className="main-content">
          {view === 'overview' && <Overview role={role} go={go} projects={projectItems} notify={notify} />}
          {view === 'projects' && <ProjectsPage projects={projectItems} go={go} notify={notify} />}
          {view === 'new-project' && <NewProject onCancel={() => go('projects')} onCreate={createProject} />}
          {view === 'browse' && <BrowsePage go={go} notify={notify} />}
          {view === 'bids' && <BidsPage go={go} notify={notify} />}
          {view === 'engagement' && <EngagementPage notify={notify} />}
          {view === 'settings' && <SettingsPage role={role} notify={notify} />}
          {view === 'notifications' && <NotificationsPage notify={notify} />}
        </main>
      </div>
      <Footer go={go} notify={notify} />
      {showNotifications && <div className="notification-popover popover"><div className="popover-heading"><strong>Notifications</strong><button onClick={() => setShowNotifications(false)}><X size={15} /></button></div><NotificationItem title="New bid received" detail="Alex Morgan bid on Real POS System" time="12 min ago" /><NotificationItem title="Milestone approved" detail="The design milestone was approved" time="Yesterday" /><button className="view-all" onClick={() => go('notifications')}>View all notifications <ChevronRight size={15} /></button></div>}
      {toast && <div className="toast"><Check size={16} />{toast}</div>}
    </div>
  );
}

function PageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description?: string; action?: React.ReactNode }) { return <div className="page-header"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1>{description && <p>{description}</p>}</div>{action}</div>; }

function Overview({ role, go, projects, notify }: { role: Role; go: (view: View) => void; projects: Project[]; notify: (message: string) => void }) {
  const isClient = role === 'client';
  return <>
    <div className="welcome-row"><div><p className="greeting">Tuesday, May 21, 2024</p><h1>Good morning, Jordan <span className="wave">✦</span></h1><p className="welcome-sub">{isClient ? 'Here’s the latest on your projects and the people building them.' : 'Your next great project is closer than you think.'}</p></div><button className="button button-primary" onClick={() => go(isClient ? 'new-project' : 'browse')}><Plus size={17} />{isClient ? 'Create a project' : 'Browse projects'}</button></div>
    <div className="metric-grid"><MetricCard label={isClient ? 'Active projects' : 'Active bids'} value={isClient ? '3' : '7'} trend="+2 this month" icon={<Briefcase size={18} />} tone="blue" /><MetricCard label={isClient ? 'Bids received' : 'Matched projects'} value={isClient ? '24' : '4'} trend={isClient ? '+8 this month' : '+1 this month'} icon={<TrendingUp size={18} />} tone="green" /><MetricCard label="Total invested" value={isClient ? '$42.8k' : '$68.4k'} trend="Across all projects" icon={<CircleDollarSign size={18} />} tone="gold" /><MetricCard label="Unread updates" value="3" trend="Needs your attention" icon={<Bell size={18} />} tone="coral" /> </div>
    <div className="content-grid main-grid"><section className="panel project-panel"><div className="panel-header"><div><span className="eyebrow">{isClient ? 'YOUR PROJECTS' : 'RECENT OPPORTUNITIES'}</span><h2>{isClient ? 'Keep your work moving' : 'Projects made for your skills'}</h2></div><button className="text-button" onClick={() => go(isClient ? 'projects' : 'browse')}>View all <ChevronRight size={15} /></button></div>{isClient ? <div className="project-list">{projects.slice(0, 3).map((project) => <ProjectRow key={project.id} project={project} onClick={() => project.status === 'OPEN' ? notify('Project bids opened') : go('engagement')} />)}</div> : <div className="opportunity-list">{developers.map((developer, index) => <div className="opportunity" key={developer.name}><Avatar initials={developer.initials} color={developer.color} /><div className="opportunity-copy"><strong>{['Fintech dashboard redesign', 'Inventory management app', 'B2B customer portal'][index]}</strong><span>{developer.skills}</span></div><div className="opportunity-price"><strong>{['$14k – $20k', '$8k – $12k', '$18k – $24k'][index]}</strong><span>{[6, 9, 3][index]} bids</span></div><ChevronRight size={16} className="muted-icon" /></div>)}</div>}</section><section className="panel activity-panel"><div className="panel-header"><div><span className="eyebrow">ACTIVITY</span><h2>Recent updates</h2></div><button className="more-button"><MoreHorizontal size={18} /></button></div><div className="activity-list"><Activity icon={<MessageSquare size={15} />} title={isClient ? 'Alex Morgan sent a message' : 'Your bid was viewed'} detail={isClient ? 'Real POS System' : 'Customer Management CRM'} time="12 min ago" color="blue" /><Activity icon={<FileCheck2 size={15} />} title={isClient ? 'New bid received' : 'New project match'} detail={isClient ? 'Real POS System · 8 bids' : 'Inventory Management'} time="2 hrs ago" color="green" /><Activity icon={<ShieldCheck size={15} />} title="Payment released" detail="Business Operations Platform" time="Yesterday" color="gold" /><Activity icon={<CalendarDays size={15} />} title="Milestone due tomorrow" detail="Customer Management CRM" time="Yesterday" color="coral" /></div><button className="activity-link" onClick={() => go('notifications')}>See all activity <ArrowUpRight size={14} /></button></section></div>
    <section className="tip-banner"><div className="tip-art"><Sparkles size={23} /></div><div><span className="eyebrow">A LITTLE SOMETHING EXTRA</span><h3>{isClient ? 'Great projects start with great briefs.' : 'Your profile is looking good.'}</h3><p>{isClient ? 'A clear brief helps the right developers understand your vision and submit stronger proposals.' : 'Add one more portfolio piece to stand out to clients looking for your exact skill set.'}</p></div><button className="button button-light" onClick={() => go(isClient ? 'new-project' : 'settings')}>{isClient ? 'Create a brief' : 'Update profile'} <ArrowUpRight size={15} /></button></section>
  </>;
}

function MetricCard({ label, value, trend, icon, tone }: { label: string; value: string; trend: string; icon: React.ReactNode; tone: string }) { return <div className="metric-card"><div className={`metric-icon ${tone}`}>{icon}</div><span className="metric-label">{label}</span><strong className="metric-value">{value}</strong><span className="metric-trend">{trend}</span></div>; }
function Activity({ icon, title, detail, time, color }: { icon: React.ReactNode; title: string; detail: string; time: string; color: string }) { return <div className="activity"><div className={`activity-icon ${color}`}>{icon}</div><div><strong>{title}</strong><span>{detail}</span></div><time>{time}</time></div>; }
function ProjectRow({ project, onClick }: { project: Project; onClick: () => void }) { return <button className="project-row" onClick={onClick}><span className={`project-symbol ${project.accent}`}><Building2 size={17} /></span><span className="project-row-copy"><strong>{project.title}</strong><span>{project.category} · Updated {project.updated}</span></span><span className="project-row-meta"><StatusBadge status={project.status} /><small>{project.bids} bids</small></span><ChevronRight size={16} className="muted-icon" /></button>; }
function ProjectsPage({ projects, go, notify }: { projects: Project[]; go: (view: View) => void; notify: (message: string) => void }) { const [filter, setFilter] = useState('All projects'); const filtered = filter === 'All projects' ? projects : projects.filter((project) => project.status === filter); return <><PageHeader eyebrow="CLIENT WORKSPACE" title="My projects" description="Manage your projects, compare bids, and keep work moving forward." action={<button className="button button-primary" onClick={() => go('new-project')}><Plus size={17} /> New project</button>} /><div className="filter-bar"><div className="segmented">{['All projects', 'OPEN', 'MATCHED', 'COMPLETED', 'DRAFT'].map((item) => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item === 'All projects' ? item : <><span className="filter-dot" />{item}</>}</button>)}</div><button className="button button-outline"><Filter size={15} /> Filters</button></div><div className="projects-table panel"><div className="table-head"><span>PROJECT</span><span>STATUS</span><span>BIDS</span><span>BUDGET</span><span>LAST UPDATED</span><span /></div>{filtered.map((project) => <div className="table-row" key={project.id}><div className="table-project"><span className={`project-symbol ${project.accent}`}><Building2 size={17} /></span><span><strong>{project.title}</strong><small>{project.category}</small></span></div><StatusBadge status={project.status} /><span>{project.bids || '—'}</span><span>{project.budget}</span><span>{project.updated}</span><button className="row-action" onClick={() => project.status === 'DRAFT' ? go('new-project') : notify(`${project.title} selected`)}><MoreHorizontal size={18} /></button></div>)}{filtered.length === 0 && <div className="empty-state"><Briefcase size={25} /><strong>No projects here yet</strong><span>Try a different filter to see more projects.</span></div>}</div></>; }

function NewProject({ onCancel, onCreate }: { onCancel: () => void; onCreate: (title: string, description: string, budget: string) => void }) { const [title, setTitle] = useState(''); const [description, setDescription] = useState(''); const [budget, setBudget] = useState('$8,000 – $12,000'); const canSubmit = title.trim().length > 3 && description.trim().length > 20; return <><PageHeader eyebrow="NEW PROJECT" title="Tell us what you’re building" description="Give great developers the context they need to bring your idea to life." action={<button className="button button-quiet" onClick={onCancel}>Cancel</button>} /><div className="form-layout"><section className="panel project-form"><div className="form-step"><span className="step-number active">01</span><div><span className="eyebrow">PROJECT BASICS</span><h2>Start with the big picture</h2><p>Keep it clear and specific. You can always add more detail later.</p></div></div><label>Project title <span>Required</span><input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Build a customer management platform" /></label><label>What are you looking to build? <span>Required</span><textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Share the problem you want to solve, the key features, and what success looks like..." rows={6} /><small className="field-helper">{description.length}/500 characters</small></label><div className="form-two-col"><label>System type<select><option>Web application</option><option>Mobile application</option><option>SaaS platform</option><option>Business software</option></select></label><label>Estimated budget<select value={budget} onChange={(event) => setBudget(event.target.value)}><option>$5,000 – $8,000</option><option>$8,000 – $12,000</option><option>$12,000 – $18,000</option><option>$20,000+</option></select></label></div><div className="form-footer"><span><LockKeyhole size={14} />Your project is private until you publish it.</span><button className="button button-primary" disabled={!canSubmit} onClick={() => onCreate(title, description, budget)}>Save as draft <ArrowUpRight size={15} /></button></div></section><aside className="form-aside"><div className="aside-illustration"><Sparkles size={28} /></div><h3>Make it easy to say yes.</h3><p>Projects with a clear goal, budget, and timeline get better proposals from the right people.</p><ul><li><Check size={15} />Start with the outcome you want</li><li><Check size={15} />Mention must-have features</li><li><Check size={15} />Share your ideal timeline</li></ul></aside></div></>; }

function BrowsePage({ go, notify }: { go: (view: View) => void; notify: (message: string) => void }) { const [search, setSearch] = useState(''); const browseProjects = projects.filter((project) => project.status === 'OPEN' || project.status === 'DRAFT'); const results = browseProjects.filter((project) => project.title.toLowerCase().includes(search.toLowerCase()) || project.category.toLowerCase().includes(search.toLowerCase())); return <><PageHeader eyebrow="DEVELOPER WORKSPACE" title="Find your next project" description="Explore work from thoughtful clients and build something meaningful." action={<button className="button button-outline" onClick={() => notify('Saved projects opened')}><Star size={16} /> Saved projects</button>} /><div className="browse-toolbar"><div className="search-input"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search projects or skills" /></div><button className="button button-outline"><ListFilter size={16} /> Sort: Newest <ChevronDown size={14} /></button></div><div className="browse-layout"><div className="browse-results"><div className="results-heading"><strong>{results.length} projects</strong><span>Showing opportunities matched to your profile</span></div>{results.map((project) => <button className="browse-card" key={project.id} onClick={() => go('bids')}><div className="browse-card-top"><span className={`project-symbol ${project.accent}`}><Building2 size={18} /></span><span className="saved-star"><Star size={17} /></span></div><span className="eyebrow">{project.category}</span><h2>{project.title}</h2><p>{project.description}</p><div className="browse-card-footer"><span><CircleDollarSign size={15} />{project.budget}</span><span><Clock3 size={15} />8–12 weeks</span><span><UsersRound size={15} />{project.bids + 4} proposals</span></div><div className="browse-card-action">View project <ArrowUpRight size={15} /></div></button>)}{results.length === 0 && <div className="empty-state panel"><Search size={25} /><strong>No matching projects</strong><span>Try another search.</span></div>}</div><aside className="browse-side panel"><span className="eyebrow">YOUR PROFILE</span><h3>Stand out to the right clients</h3><div className="profile-progress"><div><span>Profile completeness</span><strong>78%</strong></div><div className="progress"><span /></div></div><p>Add your portfolio URL and one more skill to get better matches.</p><button className="text-button" onClick={() => go('settings')}>Complete profile <ArrowUpRight size={14} /></button></aside></div></>; }

function BidsPage({ go, notify }: { go: (view: View) => void; notify: (message: string) => void }) { const [showForm, setShowForm] = useState(false); return <><PageHeader eyebrow="DEVELOPER WORKSPACE" title="My bids" description="Track proposals, conversations, and the work that’s moving forward." action={<button className="button button-primary" onClick={() => setShowForm((open) => !open)}><Plus size={17} /> Place a bid</button>} />{showForm && <div className="panel bid-form"><div><span className="eyebrow">NEW PROPOSAL</span><h2>Bid on Real POS System</h2></div><div className="form-two-col"><label>Your proposed amount<input defaultValue="$10,500" /></label><label>Estimated timeline<select><option>10–12 weeks</option><option>12–16 weeks</option></select></label></div><label>Message to the client<textarea rows={4} placeholder="Tell the client why you’re a strong fit..."></textarea></label><div className="form-footer"><button className="button button-quiet" onClick={() => setShowForm(false)}>Cancel</button><button className="button button-primary" onClick={() => { setShowForm(false); notify('Bid submitted successfully'); }}>Submit bid <ArrowUpRight size={15} /></button></div></div>}<div className="bids-table panel"><div className="table-head"><span>PROJECT</span><span>YOUR BID</span><span>STATUS</span><span>LAST ACTIVITY</span><span /></div>{[{ title: 'Customer Management CRM', category: 'SaaS Platform', amount: '$15,200', status: 'Under review', color: 'pending', time: '2 days ago' }, { title: 'Business Operations Platform', category: 'Business Software', amount: '$22,000', status: 'Matched', color: 'matched', time: 'May 18, 2024' }, { title: 'Real POS System', category: 'Web Application', amount: '$10,500', status: 'Declined', color: 'declined', time: 'May 10, 2024' }].map((bid) => <div className="table-row" key={bid.title}><div className="table-project"><span className="project-symbol sky"><Building2 size={17} /></span><span><strong>{bid.title}</strong><small>{bid.category}</small></span></div><strong>{bid.amount}</strong><span className={`status-text ${bid.color}`}><span />{bid.status}</span><span>{bid.time}</span><button className="row-action" onClick={() => bid.status === 'Matched' ? go('engagement') : notify('Bid details opened')}><ChevronRight size={17} /></button></div>)}</div></>; }

function EngagementPage({ notify }: { notify: (message: string) => void }) { const [tab, setTab] = useState('Overview'); const [message, setMessage] = useState(''); const timeline = ['Project kickoff', 'Design system & prototypes', 'Core application build', 'Launch & handoff']; return <><PageHeader eyebrow="ACTIVE ENGAGEMENT" title="Customer Management CRM" description="A shared space for you and Alex Morgan to build great work together." action={<button className="button button-outline" onClick={() => notify('Payment history opened')}><WalletCards size={16} /> Payment history</button>} /><div className="engagement-banner"><div className="engagement-client"><Avatar initials="AM" color="blue" /><div><strong>Alex Morgan</strong><span>Senior full-stack engineer · Matched May 18, 2024</span></div><span className="online-dot" /> Online</div><div className="engagement-meta"><span><CircleDollarSign size={15} />$15,200 agreed</span><span><CalendarDays size={15} />12 weeks</span></div></div><div className="tabs">{['Overview', 'Milestones', 'Chat', 'Payments'].map((item) => <button key={item} className={tab === item ? 'active' : ''} onClick={() => setTab(item)}>{item}{item === 'Chat' && <span className="tab-dot" />}</button>)}</div>{tab === 'Overview' && <div className="engagement-grid"><section className="panel timeline-panel"><div className="panel-header"><div><span className="eyebrow">PROJECT PLAN</span><h2>Milestones</h2></div><button className="text-button" onClick={() => setTab('Milestones')}>Manage <ArrowUpRight size={14} /></button></div><div className="timeline">{timeline.map((item, index) => <div className={`timeline-item ${index < 2 ? 'done' : index === 2 ? 'current' : ''}`} key={item}><span className="timeline-marker">{index < 2 ? <Check size={13} /> : index + 1}</span><div><strong>{item}</strong><span>{index === 0 ? 'Completed May 18' : index === 1 ? 'Approved · $3,800' : index === 2 ? 'Due Jun 10 · $8,200' : 'Due Jun 28 · $3,200'}</span></div><span className="timeline-status">{index < 2 ? 'Complete' : index === 2 ? 'In progress' : 'Upcoming'}</span></div>)}</div></section><section className="panel conversation-panel"><div className="panel-header"><div><span className="eyebrow">RECENT CHAT</span><h2>Stay in sync</h2></div><button className="more-button"><MoreHorizontal size={18} /></button></div><div className="conversation"><div className="message received"><Avatar initials="AM" color="blue" small /><div><p>I've uploaded the first set of dashboard concepts. Would love to get your thoughts.</p><time>10:42 AM</time></div></div><div className="message sent"><div><p>These look great. The activity view on option B feels like the right direction.</p><time>10:55 AM</time></div></div></div><div className="message-compose"><input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Write a message..." onKeyDown={(event) => { if (event.key === 'Enter' && message) { notify('Message sent'); setMessage(''); } }} /><button onClick={() => { if (message) { notify('Message sent'); setMessage(''); } }}><ArrowUpRight size={16} /></button></div></section></div>}{tab === 'Milestones' && <MilestonesPanel notify={notify} />}{tab === 'Chat' && <section className="panel full-chat"><div className="chat-heading"><Avatar initials="AM" color="blue" /><div><strong>Alex Morgan</strong><span>Usually replies within an hour</span></div><span className="online-dot" /></div><div className="chat-messages"><div className="message received"><Avatar initials="AM" color="blue" small /><div><p>Hey Jordan, quick update: the dashboard concepts are ready for your review.</p><time>10:42 AM</time></div></div><div className="message sent"><div><p>These look great. The activity view on option B feels like the right direction.</p><time>10:55 AM</time></div></div><div className="message received"><Avatar initials="AM" color="blue" small /><div><p>Perfect. I'll refine that direction and share the interactive prototype tomorrow.</p><time>11:02 AM</time></div></div></div><div className="full-compose"><input placeholder="Write a message..." /><button className="button button-primary">Send message <ArrowUpRight size={15} /></button></div></section>}{tab === 'Payments' && <PaymentsPanel />}</>; }
function MilestonesPanel({ notify }: { notify: (message: string) => void }) { return <section className="panel detail-panel"><div className="panel-header"><div><span className="eyebrow">PROJECT PLAN</span><h2>All milestones</h2></div><button className="button button-primary" onClick={() => notify('New milestone form opened')}><Plus size={16} /> Add milestone</button></div>{['Project kickoff', 'Design system & prototypes', 'Core application build', 'Launch & handoff'].map((item, index) => <div className="detail-row" key={item}><span className={`timeline-marker ${index < 2 ? 'complete' : ''}`}>{index < 2 ? <Check size={13} /> : index + 1}</span><div><strong>{item}</strong><span>{index < 2 ? 'Approved · Payment released' : index === 2 ? 'In progress · Due Jun 10' : 'Upcoming · Due Jun 28'}</span></div><strong>{['$1,000', '$3,800', '$8,200', '$3,200'][index]}</strong><button className="button button-outline small-button">{index === 2 ? 'Review' : 'Details'}</button></div>)}</section>; }
function PaymentsPanel() { return <section className="panel detail-panel"><div className="panel-header"><div><span className="eyebrow">FINANCIALS</span><h2>Payment history</h2></div><span className="balance-label">Total paid <strong>$4,800</strong></span></div>{[['May 18, 2024', 'Design system & prototypes', 'PAYOUT', '$3,800'], ['May 18, 2024', 'Platform fee', 'COMMISSION', '−$380'], ['May 15, 2024', 'Project deposit', 'HELD', '$1,000']].map((payment) => <div className="payment-row" key={payment[0] + payment[1]}><span className="payment-date">{payment[0]}</span><div><strong>{payment[1]}</strong><span>{payment[2]}</span></div><strong className={payment[2] === 'COMMISSION' ? 'negative' : ''}>{payment[3]}</strong></div>)}</section>; }

function SettingsPage({ role, notify }: { role: Role; notify: (message: string) => void }) { return <><PageHeader eyebrow="ACCOUNT SETTINGS" title="Your profile" description="Keep your details current so the right people can find you." action={<button className="button button-primary" onClick={() => notify('Profile changes saved')}><Check size={16} /> Save changes</button>} /><div className="settings-layout"><nav className="settings-nav"><button className="active"><UserRound size={16} /> Profile</button><button><LockKeyhole size={16} /> Security</button><button><Bell size={16} /> Notifications</button></nav><section className="panel settings-form"><div className="profile-cover"><div className="profile-large"><Avatar initials="JD" /></div><button className="button button-outline">Change photo</button></div><div className="settings-section"><span className="eyebrow">PERSONAL INFORMATION</span><h2>{role === 'client' ? 'Tell developers who you are' : 'Show clients what you can do'}</h2><div className="form-two-col"><label>First name<input defaultValue="Jordan" /></label><label>Last name<input defaultValue="Davis" /></label></div><label>Email address<input defaultValue="jordan@buildbetter.co" type="email" /></label>{role === 'developer' ? <><label>Professional headline<input defaultValue="Senior full-stack developer helping teams build better software" /></label><label>About you<textarea rows={5} defaultValue="I partner with ambitious teams to turn complex ideas into simple, useful products." /></label><label>Skills<input defaultValue="React, TypeScript, Node.js, PostgreSQL, AWS" /></label><label>Portfolio URL<input defaultValue="https://jordan.dev" /></label></> : <><label>Company name<input defaultValue="Davis & Co." /></label><label>About your company<textarea rows={5} defaultValue="We build tools that help independent businesses do their best work." /></label><label>Website URL<input defaultValue="https://davisandco.co" /></label></>}</div></section></div></>; }
function NotificationsPage({ notify }: { notify: (message: string) => void }) { return <><PageHeader eyebrow="INBOX" title="Notifications" description="Stay in the loop on your projects, bids, and conversations." action={<button className="button button-outline" onClick={() => notify('All notifications marked as read')}><Check size={16} /> Mark all read</button>} /><section className="panel notifications-list"><div className="notification-day">TODAY</div><NotificationItem title="New bid received" detail="Alex Morgan bid $10,500 on Real POS System" time="12 min ago" unread /><NotificationItem title="New message from Alex Morgan" detail="I've uploaded the first set of dashboard concepts." time="1 hour ago" unread /><div className="notification-day">YESTERDAY</div><NotificationItem title="Milestone approved" detail="Design system & prototypes was approved and payment released." time="Yesterday" /><NotificationItem title="Project deadline approaching" detail="Core application build is due in 20 days." time="Yesterday" /></section></>; }
function NotificationItem({ title, detail, time, unread = false }: { title: string; detail: string; time: string; unread?: boolean }) { return <div className={`notification-item ${unread ? 'unread' : ''}`}><div className="notification-icon"><Bell size={16} /></div><div><strong>{title}</strong><span>{detail}</span></div><time>{time}</time>{unread && <span className="unread-dot" />}</div>; }

function Footer({ go, notify }: { go: (view: View) => void; notify: (message: string) => void }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="brand"><span className="brand-mark"><Sparkles size={17} /></span><span>PataDev<span className="brand-dot">.</span>Ke</span></span>
          <p className="footer-tagline">Connecting Kenyan clients with talented developers to build real software, milestone by milestone.</p>
        </div>
        <div>
          <span className="footer-col-title">Platform</span>
          <nav className="footer-links">
            <button onClick={() => go('browse')}>Find a developer</button>
            <button onClick={() => go('projects')}>Find a project</button>
            <button onClick={() => go('new-project')}>Post a project</button>
            <button onClick={() => go('bids')}>Place a bid</button>
            <button onClick={() => go('engagement')}>How it works</button>
          </nav>
        </div>
        <div>
          <span className="footer-col-title">Company</span>
          <nav className="footer-links">
            <button onClick={() => notify('About us page coming soon')}>About us</button>
            <button onClick={() => notify('Careers page coming soon')}>Careers</button>
            <button onClick={() => notify('Blog page coming soon')}>Blog</button>
            <button onClick={() => notify('Help center page coming soon')}>Help center</button>
          </nav>
        </div>
        <div>
          <span className="footer-col-title">Contact &amp; legal</span>
          <nav className="footer-links">
            <button onClick={() => notify('Contact page coming soon')}>Contact us</button>
            <button onClick={() => notify('Terms of service')}>Terms of service</button>
            <button onClick={() => notify('Privacy policy')}>Privacy policy</button>
            <button onClick={() => notify('Cookie policy')}>Cookie policy</button>
          </nav>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 PataDev.Ke. All rights reserved.</span>
        <span>Made in Kenya</span>
      </div>
    </footer>
  );
}

export default MockDashboard;
