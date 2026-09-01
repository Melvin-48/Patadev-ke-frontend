import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  Bell,
  Building2,
  ChevronDown,
  Code2,
  Compass,
  FileCheck2,
  Headphones,
  LayoutDashboard,
  LockKeyhole,
  Menu,
  ArrowUpRight,
  Settings,
  Sparkles,
  UsersRound,
  X,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Avatar from '../dashboard/Avatar';
import NotificationItem from '../dashboard/NotificationItem';
import { selectedBidId } from '../../data/mock';

// Role-aware dashboard shell - the topbar + sidebar from the mock dashboard,
// adapted so the workspace reflects the authenticated account's role instead
// of a manual switcher (a user is a CLIENT or a DEVELOPER, never both).
export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const isClient = user?.role === 'CLIENT';
  const isDeveloper = user?.role === 'DEVELOPER';
  const emailLocal = user?.email?.split('@')[0] ?? '';
  const initials = (emailLocal.slice(0, 1) + (emailLocal.slice(1, 2) ?? '')).toUpperCase();

  const engagementTo = `/dashboard/engagements/${selectedBidId}`;

  const navItems: {
    label: string;
    to: string;
    icon: typeof LayoutDashboard;
    end?: boolean;
    count?: number;
  }[] = [
    { label: 'Overview', to: '/dashboard', icon: LayoutDashboard, end: true },
    ...(isClient ? [{ label: 'My Projects', to: '/dashboard/projects', icon: Building2 }] : []),
    ...(isDeveloper ? [{ label: 'Browse Projects', to: '/dashboard/browse', icon: Compass }] : []),
    ...(isDeveloper ? [{ label: 'My Bids', to: '/dashboard/bids', icon: FileCheck2 }] : []),
    { label: 'Engagements', to: engagementTo, icon: UsersRound, count: 1 },
  ];

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="mobile-menu" onClick={() => setMobileOpen((open) => !open)} aria-label="Open menu">
          <Menu size={20} />
        </button>
        <Link to="/dashboard" className="brand">
          <span className="brand-mark"><Sparkles size={17} /></span>
          <span>PataDev<span className="brand-dot">.</span>Ke</span>
        </Link>
        <div className="topbar-links">
          {isDeveloper ? (
            <>
              <Link to="/dashboard/browse">Find a project</Link>
              <Link to="/dashboard/bids">My bids</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard/browse">Find a developer</Link>
              <Link to="/dashboard/projects/new">Post a project</Link>
            </>
          )}
        </div>
        <div className="topbar-actions">
          <button className="icon-button" onClick={() => setShowNotifications((open) => !open)} aria-label="Notifications">
            <Bell size={18} />
            <span className="notification-dot" />
          </button>
          <div className="profile-menu-wrap">
            <button className="profile-button" onClick={() => setShowProfileMenu((open) => !open)}>
              <Avatar initials={initials} small />
              <span>{user?.email?.split('@')[0]}</span>
              <ChevronDown size={15} />
            </button>
            {showProfileMenu && (
              <div className="popover role-popover">
                <div className="popover-label">ACCOUNT</div>
                <Link to="/dashboard/settings" onClick={() => setShowProfileMenu(false)}>
                  <Settings size={16} /> Settings
                </Link>
                <div className="popover-divider" />
                <button onClick={handleLogout}><LockKeyhole size={16} /> Log out</button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="workspace">
        <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
          <div className="sidebar-role">
            <span className="eyebrow">CURRENT WORKSPACE</span>
            <button>
              <span className={`role-icon ${isClient ? 'client' : 'developer'}`}>
                {isClient ? <Building2 size={16} /> : <Code2 size={16} />}
              </span>
              <span>
                <strong>{isClient ? 'Client workspace' : 'Developer workspace'}</strong>
                <small>{isClient ? 'Hiring developers' : 'Finding great work'}</small>
              </span>
            </button>
          </div>

          <nav className="main-nav">
            <span className="nav-label">WORKSPACE</span>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon size={17} />
                  {item.label}
                  {item.count !== undefined && <span className="nav-count">{item.count}</span>}
                </NavLink>
              );
            })}
          </nav>

          <nav className="main-nav secondary-nav">
            <span className="nav-label">MANAGE</span>
            <NavLink
              to="/dashboard/notifications"
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={() => setMobileOpen(false)}
            >
              <Bell size={17} /> Notifications
              <span className="nav-count alert">3</span>
            </NavLink>
            <NavLink
              to="/dashboard/settings"
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={() => setMobileOpen(false)}
            >
              <Settings size={17} /> Settings
            </NavLink>
          </nav>

          <div className="sidebar-bottom">
            <div className="help-card">
              <div className="help-icon"><Headphones size={16} /></div>
              <strong>Need a hand?</strong>
              <p>Our team is here to help you build better.</p>
              <Link to="/dashboard/settings">Get support <ArrowUpRight size={13} /></Link>
            </div>
            <div className="sidebar-footer">
              <span>© 2026 PataDev Ke</span>
              <button type="button">Privacy</button>
              <button type="button">Terms</button>
            </div>
          </div>
        </aside>

        <main className="main-content">
          <Outlet />
        </main>
      </div>

      {showNotifications && (
        <div className="notification-popover popover">
          <div className="popover-heading">
            <strong>Notifications</strong>
            <button onClick={() => setShowNotifications(false)}><X size={15} /></button>
          </div>
          <NotificationItem title="New bid received" detail="Alex Morgan bid on Real POS System" time="12 min ago" unread />
          <NotificationItem title="Milestone approved" detail="The design milestone was approved" time="Yesterday" />
          <Link to="/dashboard/notifications" className="view-all" onClick={() => setShowNotifications(false)}>
            View all notifications
          </Link>
        </div>
      )}
    </div>
  );
}