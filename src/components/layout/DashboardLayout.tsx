import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  ArrowUpRight,
  Bell,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronDown,
  ChevronRight,
  Code2,
  Compass,
  FileCheck2,
  Headphones,
  LayoutDashboard,
  Menu,
  Settings,
  Sparkles,
  UsersRound,
  X,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Avatar from '../dashboard/Avatar';
import NotificationItem from '../dashboard/NotificationItem';
import { useToast, Toast } from '../dashboard/useToast';
import { selectedBidId } from '../../data/mock';

export default function DashboardLayout() {
  const { user, switchRole } = useAuth();
  const navigate = useNavigate();
  const { toast, notify } = useToast();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const isClient = user.role === 'CLIENT';
  const roleName = isClient ? 'client' : 'developer';

  const navItems = [
    { label: 'Overview', to: '/dashboard', icon: LayoutDashboard, end: true },
    ...(isClient ? [{ label: 'My Projects', to: '/dashboard/projects', icon: BriefcaseBusiness }] : []),
    ...(!isClient ? [{ label: 'Browse Projects', to: '/dashboard/browse', icon: Compass }] : []),
    ...(!isClient ? [{ label: 'My Bids', to: '/dashboard/bids', icon: FileCheck2 }] : []),
    { label: 'Engagements', to: `/dashboard/engagements/${selectedBidId}`, icon: UsersRound, count: 1 },
  ];

  function handleSwitchRole(nextRole: 'CLIENT' | 'DEVELOPER') {
    switchRole(nextRole);
    setShowRoleMenu(false);
    notify(`Switched to ${nextRole === 'CLIENT' ? 'Client' : 'Developer'} workspace`);
    navigate('/dashboard');
  }

  function handleNav(path: string) {
    setMobileOpen(false);
    setShowNotifications(false);
    setShowRoleMenu(false);
    navigate(path);
  }

  return (
    <div className="app-shell">
      {/* Topbar */}
      <header className="topbar">
        <button className="mobile-menu" onClick={() => setMobileOpen((open) => !open)} aria-label="Open menu">
          <Menu size={20} />
        </button>

        <button className="brand" onClick={() => handleNav('/dashboard')}>
          <span className="brand-mark"><Sparkles size={17} /></span>
          <span>PataDev<span className="brand-dot">.</span>Ke</span>
        </button>

        <div className="topbar-links">
          <button onClick={() => handleNav('/dashboard/browse')}>Find a developer</button>
          <button onClick={() => handleNav('/dashboard/projects')}>Join the team as a Dev</button>
          <button onClick={() => handleNav(`/dashboard/engagements/${selectedBidId}`)}>How it works</button>
        </div>

        <div className="topbar-actions">
          <button
            className="icon-button"
            onClick={() => setShowNotifications((open) => !open)}
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="notification-dot" />
          </button>

          <div className="profile-menu-wrap">
            <button className="profile-button" onClick={() => setShowRoleMenu((open) => !open)}>
              <Avatar initials="JD" small />
              <span>{user.name || 'Jordan Davis'}</span>
              <ChevronDown size={15} />
            </button>

            {showRoleMenu && (
              <div className="popover role-popover">
                <div className="popover-label">Workspace</div>
                <button
                  onClick={() => handleSwitchRole('CLIENT')}
                  className={isClient ? 'selected' : ''}
                >
                  <Building2 size={16} /> Client {isClient && <Check size={15} />}
                </button>
                <button
                  onClick={() => handleSwitchRole('DEVELOPER')}
                  className={!isClient ? 'selected' : ''}
                >
                  <Code2 size={16} /> Developer {!isClient && <Check size={15} />}
                </button>
                <div className="popover-divider" />
                <button onClick={() => handleNav('/dashboard/settings')}>
                  <Settings size={16} /> Settings
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Workspace Body */}
      <div className="workspace">
        <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
          <div className="sidebar-role">
            <span className="eyebrow">CURRENT WORKSPACE</span>
            <button onClick={() => setShowRoleMenu((open) => !open)}>
              <span className={`role-icon ${roleName}`}>
                {isClient ? <Building2 size={16} /> : <Code2 size={16} />}
              </span>
              <span>
                <strong>{isClient ? 'Client workspace' : 'Developer workspace'}</strong>
                <small>{isClient ? 'Hiring talent' : 'Finding great work'}</small>
              </span>
              <ChevronDown size={15} />
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
              <button onClick={() => notify('Support request started')}>
                Visit help center <ArrowUpRight size={13} />
              </button>
            </div>
            <div className="sidebar-footer">
              <span>© 2026 PataDev.Ke</span>
              <button onClick={() => notify('Privacy policy opened')}>Privacy</button>
              <button onClick={() => notify('Terms of service opened')}>Terms</button>
            </div>
          </div>
        </aside>

        <main className="main-content">
          <Outlet context={{ notify }} />
        </main>
      </div>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="brand">
              <span className="brand-mark"><Sparkles size={17} /></span>
              <span>PataDev<span className="brand-dot">.</span>Ke</span>
            </span>
            <p className="footer-tagline">
              Connecting Kenyan clients with talented developers to build real software, milestone by milestone.
            </p>
          </div>
          <div>
            <span className="footer-col-title">Platform</span>
            <nav className="footer-links">
              <button onClick={() => handleNav('/dashboard/browse')}>Find a developer</button>
              <button onClick={() => handleNav('/dashboard/projects')}>Find a project</button>
              <button onClick={() => handleNav('/dashboard/projects/new')}>Post a project</button>
              <button onClick={() => handleNav('/dashboard/bids')}>Place a bid</button>
              <button onClick={() => handleNav(`/dashboard/engagements/${selectedBidId}`)}>How it works</button>
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
              <button onClick={() => notify('Terms of service opened')}>Terms of service</button>
              <button onClick={() => notify('Privacy policy opened')}>Privacy policy</button>
              <button onClick={() => notify('Cookie policy opened')}>Cookie policy</button>
            </nav>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 PataDev.Ke. All rights reserved.</span>
          <span>Made in Kenya</span>
        </div>
      </footer>

      {/* Notifications Popover */}
      {showNotifications && (
        <div className="notification-popover popover">
          <div className="popover-heading">
            <strong>Notifications</strong>
            <button onClick={() => setShowNotifications(false)}><X size={15} /></button>
          </div>
          <NotificationItem title="New bid received" detail="Alex Morgan bid on Real POS System" time="12 min ago" unread />
          <NotificationItem title="Milestone approved" detail="The design milestone was approved" time="Yesterday" />
          <button className="view-all" onClick={() => handleNav('/dashboard/notifications')}>
            View all notifications <ChevronRight size={15} />
          </button>
        </div>
      )}

      {/* Global Toast */}
      <Toast message={toast} />
    </div>
  );
}