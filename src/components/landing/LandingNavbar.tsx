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
        'fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-out flex justify-center',
        scrolled ? 'pt-3 px-4' : 'pt-0 px-0',
      )}
    >
      <div
        className={cn(
          'w-full bg-white transition-all duration-300 ease-out flex items-center justify-between gap-4',
          scrolled
            ? 'max-w-5xl h-14 px-6 rounded-full border border-slate-200 shadow-md shadow-slate-200/50'
            : 'max-w-7xl h-16 px-5 sm:px-8 rounded-none border-none shadow-none',
        )}
      >
        {/* ── Brand Logo ── */}
        <Link
          to="/"
          className="flex items-center gap-2 flex-shrink-0 group"
          aria-label="PataDev Ke Home"
        >
          <span className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white shadow-2xs group-hover:bg-primary-600 transition-colors">
            <Code2 size={16} strokeWidth={2.5} />
          </span>
          <span className="font-extrabold text-base text-[#07152F] tracking-tight leading-none">
            PataDev<span className="text-primary"> Ke</span>
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
                  'px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer',
                  isActive
                    ? 'bg-blue-50 text-primary font-semibold'
                    : 'text-slate-600 hover:text-primary hover:bg-slate-100/70',
                )}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* ── Right Action Buttons ── */}
        <div className="hidden lg:flex items-center gap-2.5">
          <Link
            to="/login"
            className="px-4 py-2 rounded-full text-xs font-semibold text-[#07152F] bg-white border border-slate-200 hover:bg-slate-50 hover:text-primary transition-colors shadow-2xs"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-primary hover:bg-primary-600 transition-colors shadow-xs"
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
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
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
                  'w-full text-left px-4 py-2.5 rounded-full text-sm font-medium transition-all',
                  isActive
                    ? 'bg-blue-50 text-primary font-semibold'
                    : 'text-slate-700 hover:text-primary hover:bg-slate-50',
                )}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-full text-sm font-semibold text-[#07152F] bg-white border border-slate-200 hover:bg-slate-50 transition-all"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-full text-sm font-semibold text-white bg-primary hover:bg-primary-600 transition-all shadow-xs"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
