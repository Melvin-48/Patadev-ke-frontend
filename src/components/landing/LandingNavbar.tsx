import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface NavItem {
  label: string;
  to: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home',         to: '/#home',         id: 'home' },
  { label: 'About',        to: '/#about',        id: 'about' },
  { label: 'Services',     to: '/#services',     id: 'services' },
  { label: 'How It Works', to: '/#how-it-works', id: 'how-it-works' },
  { label: 'Pricing',      to: '/#pricing',      id: 'pricing' },
  { label: 'FAQs',         to: '/#faqs',         id: 'faqs' },
  { label: 'Contacts',     to: '/#contacts',     id: 'contacts' },
];

export default function LandingNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  // Track page scroll position for sticky glass navbar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track window resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Dynamic Scroll Active Section Detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220; // Navbar offset
      const sectionIds = NAV_ITEMS.map((item) => item.id);

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300 pointer-events-none">
      <div
        className={cn(
          'mx-auto transition-all duration-300 ease-out pointer-events-auto',
          scrolled
            ? 'max-w-5xl mt-3 px-4 sm:px-6'
            : 'max-w-7xl mt-0 px-6 lg:px-8',
        )}
      >
        {/* Floating Glass Pill Navbar Card */}
        <div
          className={cn(
            'flex items-center justify-between transition-all duration-300 ease-out',
            scrolled
              ? 'bg-white/85 backdrop-blur-xl border border-white/70 rounded-full shadow-2xl shadow-navy/15 px-6 py-2'
              : 'bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl shadow-sm px-6 py-3 mt-3',
          )}
        >

          {/* ── Logo ── */}
          <Link
            to="/"
            className="flex items-center gap-2 flex-shrink-0 group"
            aria-label="PataDev Ke — home"
          >
            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-200">
              <Code2 size={16} className="text-primary group-hover:text-white transition-colors duration-200" strokeWidth={2.5} />
            </span>
            <span className="font-semibold text-[#07152F] text-[15px] tracking-tight">
              PataDev <span className="text-primary">Ke</span>
            </span>
          </Link>

          {/* ── Desktop nav with Active Section Highlight ── */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main navigation">
            {NAV_ITEMS.map(({ label, to, id }) => {
              const isActive = activeSection === id;
              return (
                <a
                  key={label}
                  href={to}
                  className={cn(
                    'text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200',
                    isActive
                      ? 'bg-primary text-white shadow-md shadow-primary/25 font-bold'
                      : 'text-[#64748B] hover:text-[#07152F] hover:bg-slate-100/60',
                  )}
                >
                  {label}
                </a>
              );
            })}
          </nav>

          {/* ── Desktop auth buttons ── */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className="text-xs font-bold text-[#64748B] hover:text-[#07152F] px-3 py-1.5 transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white shadow-md shadow-primary/20 hover:bg-primary/90 transition-all duration-200"
              style={{ background: '#1769FF' }}
            >
              Sign Up
              <ArrowRight size={13} strokeWidth={2.5} />
            </Link>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="lg:hidden p-2 rounded-full text-[#64748B] hover:text-[#07152F] transition-colors"
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* ── Mobile menu dropdown ── */}
        <div
          id="mobile-menu"
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300 ease-in-out mt-2',
            menuOpen ? 'max-h-[440px] opacity-100' : 'max-h-0 opacity-0',
          )}
        >
          <nav
            className="px-6 py-4 flex flex-col gap-1 bg-white/95 backdrop-blur-xl border border-white/70 rounded-3xl shadow-xl shadow-navy/10"
            aria-label="Mobile navigation"
          >
            {NAV_ITEMS.map(({ label, to, id }) => {
              const isActive = activeSection === id;
              return (
                <a
                  key={label}
                  href={to}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'py-2 px-4 rounded-xl text-xs font-semibold transition-all duration-200',
                    isActive
                      ? 'bg-primary text-white font-bold shadow-sm'
                      : 'text-[#64748B] hover:text-[#07152F] hover:bg-slate-100/60',
                  )}
                >
                  {label}
                </a>
              );
            })}

            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="py-2 px-4 text-xs font-bold text-[#64748B] hover:text-[#07152F] transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold text-white shadow-md"
                style={{ background: '#1769FF' }}
              >
                Sign Up
                <ArrowRight size={13} strokeWidth={2.5} />
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
