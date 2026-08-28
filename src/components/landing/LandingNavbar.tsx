import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface NavItem {
  label: string;
  href: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home',            href: '#home',         id: 'home' },
  { label: 'Find Developers', href: '#categories',   id: 'categories' },
  { label: 'Find Projects',   href: '#projects',     id: 'projects' },
  { label: 'How It Works',    href: '#how-it-works', id: 'how-it-works' },
];

export default function LandingNavbar() {
  const [menuOpen, setMenuOpen]           = useState(false);
  const [scrolled, setScrolled]           = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();

  // Handle scroll detection and section awareness
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const scrollPos = window.scrollY + 140;
      const sectionIds = ['home', 'categories', 'projects', 'how-it-works'];

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith('#')) {
      const targetId = href.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/projects');
      }
    } else {
      navigate(href);
    }
  };

  return (
    <header
      className={cn(
        'fixed left-0 right-0 z-50 transition-all duration-300 ease-in-out w-full',
        scrolled ? 'top-3 sm:top-4 px-4' : 'top-0 px-0'
      )}
    >
      <div
        className={cn(
          'w-full bg-white transition-all duration-300 ease-in-out flex items-center justify-between mx-auto',
          scrolled
            ? 'max-w-[1200px] h-14 px-6 rounded-full border border-slate-200 shadow-md'
            : 'max-w-none h-[72px] px-5 sm:px-8 rounded-none border-none shadow-none'
        )}
      >
        <div className="flex-1 max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
          {/* ── Brand Logo ── */}
          <Link
            to="/"
            className="flex items-center gap-2 flex-shrink-0 group"
            aria-label="PataDev Ke Home"
          >
            <span className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-700 transition-colors">
              <Code2 size={16} strokeWidth={2.5} />
            </span>
            <span className="font-extrabold text-base text-slate-900 tracking-tight leading-none">
              PataDev<span className="text-blue-600"> Ke</span>
            </span>
          </Link>

          {/* ── Centered Navigation Links ── */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer',
                    isActive
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* ── Right Action Buttons ── */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-slate-900 bg-white border border-[#dbe3f0] hover:bg-[#eff6ff] hover:text-blue-800 transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-blue-600 border-none hover:bg-blue-700 hover:shadow-sm hover:shadow-blue-500/25 transition-all"
            >
              Sign Up
            </Link>
          </div>

          {/* ── Mobile Menu Toggle ── */}
          <button
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      {menuOpen && (
        <div className="lg:hidden absolute top-full inset-x-4 mt-2 bg-white border border-slate-200 rounded-2xl p-4 space-y-1 shadow-lg">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  'w-full text-left px-4 py-3 rounded-full text-sm font-medium transition-all',
                  isActive
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
                )}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col gap-3">
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center py-3 rounded-full text-sm font-semibold text-slate-900 bg-white border border-slate-200 hover:bg-blue-50 hover:text-blue-800 transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center py-3 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
