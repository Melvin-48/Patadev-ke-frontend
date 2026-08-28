import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const NAV_LINKS = [
  { label: 'Home',            href: '/' },
  { label: 'Find Developers', href: '/projects' },
  { label: 'Find Projects',   href: '/projects' },
  { label: 'How It Works',    href: '#how-it-works' },
];

export default function LandingNavbar() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleAnchor = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(href);
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/85 backdrop-blur-xl shadow-sm shadow-slate-200/60'
          : 'bg-white/60 backdrop-blur-md',
      )}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[60px] flex items-center justify-between gap-4">

        {/* ── Logo ── */}
        <Link
          to="/"
          className="flex items-center gap-2 flex-shrink-0 group"
          aria-label="PataDev Ke home"
        >
          <span className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white shadow-sm group-hover:bg-primary-600 transition-colors">
            <Code2 size={14} strokeWidth={2.5} />
          </span>
          <span className="font-bold text-[15px] text-[#07152F] tracking-tight leading-none">
            PataDev<span className="text-primary"> Ke</span>
          </span>
        </Link>

        {/* ── Center Nav (desktop) ── */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((item) => (
            <button
              key={item.label}
              onClick={() => handleAnchor(item.href)}
              className="px-3.5 py-1.5 rounded-lg text-[13.5px] font-medium text-slate-600 hover:text-primary hover:bg-primary/5 transition-all"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* ── Right Actions (desktop) ── */}
        <div className="hidden lg:flex items-center gap-2">
          <Link
            to="/login"
            className="px-4 py-1.5 rounded-lg text-[13.5px] font-semibold text-slate-700 hover:text-primary hover:bg-slate-100 transition-all"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="px-4 py-1.5 rounded-lg text-[13.5px] font-bold text-white bg-primary hover:bg-primary-600 transition-all shadow-sm shadow-primary/20"
          >
            Sign Up
          </Link>
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          className="lg:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ── Mobile Drawer ── */}
      {menuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 px-5 py-4 space-y-1">
          {NAV_LINKS.map((item) => (
            <button
              key={item.label}
              onClick={() => handleAnchor(item.href)}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-primary hover:bg-primary/5 transition-all"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl text-sm font-semibold text-slate-700 border border-slate-200 hover:bg-slate-50 transition-all"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl text-sm font-bold text-white bg-primary hover:bg-primary-600 transition-all shadow-sm"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
