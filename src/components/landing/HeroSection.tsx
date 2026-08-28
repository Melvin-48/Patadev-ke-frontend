import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Code2, Layers, Smartphone } from 'lucide-react';

const PARTNER_LOGOS = [
  { name: 'DigiHer',                src: '/assets/images/partners/1772024539709-digiher.PNG' },
  { name: 'Solby',                  src: '/assets/images/partners/1772024540833-Solby_Logo_rzhueo.png' },
  { name: 'Uniflow',                src: '/assets/images/partners/1772024541161-uniflow-logo.png' },
  { name: 'The Cube',               src: '/assets/images/partners/1784708509633-cube-new-logo-removebg-preview_apzpfc.png' },
  { name: 'Lancola Institute',      src: '/assets/images/partners/1772107463559-lancola_institute.jpeg' },
  { name: 'Lancola Tech',           src: '/assets/images/partners/1772171598005-lancolatech_logo.png' },
  { name: 'CareSync',               src: '/assets/images/partners/1772024540231-caresync-png_1_osxcxq.png' },
  { name: 'Maziwa Tele',            src: '/assets/images/partners/1772024539812-maziwa_tele.png' },
];

/* Floating marketplace concept cards */
const FLOAT_CARDS = [
  {
    icon: <Code2 size={16} className="text-primary" />,
    label: 'Web Development',
    sub: '120+ developers',
    top: '18%', right: '-2%',
    delay: '0s',
  },
  {
    icon: <Smartphone size={16} className="text-emerald-500" />,
    label: 'Mobile Apps',
    sub: '48 open projects',
    top: '52%', right: '2%',
    delay: '1.2s',
  },
  {
    icon: <Layers size={16} className="text-violet-500" />,
    label: 'Backend & APIs',
    sub: 'KES 200k–2M budgets',
    top: '78%', right: '-4%',
    delay: '2.1s',
  },
];

export default function HeroSection() {
  const [query, setQuery] = useState('');

  return (
    <section
      id="home"
      className="relative pt-[100px] pb-20 overflow-hidden bg-gradient-to-b from-[#EFF6FF] via-[#F5F9FF] to-white"
    >
      {/* ── Soft background blobs ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-32 right-0 w-[700px] h-[700px] rounded-full opacity-50"
          style={{ background: 'radial-gradient(circle, rgba(23,105,255,0.10) 0%, transparent 65%)', filter: 'blur(80px)' }}
        />
        <div
          className="absolute top-1/2 -left-48 w-[500px] h-[500px] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 65%)', filter: 'blur(80px)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* ── LEFT: Copy ── */}
          <div className="max-w-xl animate-fade-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6 border border-primary/15">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Kenya's Developer-Business Marketplace
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-[#07152F] leading-[1.10] tracking-tight mb-5">
              Build Better.<br />
              <span className="text-primary">Connect Smarter.</span>
            </h1>

            {/* Sub-copy */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-md">
              Connect Kenyan businesses with skilled developers to build,
              launch, and grow better digital products — milestone by milestone.
            </p>

            {/* Search bar */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg shadow-slate-200/60 border border-white/80 p-2 flex items-center gap-2 mb-6 max-w-lg">
              <div className="flex-1 flex items-center gap-2.5 px-3">
                <Search size={16} className="text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="What are you looking to build?"
                  className="flex-1 bg-transparent text-sm text-[#07152F] placeholder-slate-400 outline-none font-medium py-2"
                />
              </div>
              <Link
                to={`/projects${query ? `?q=${encodeURIComponent(query)}` : ''}`}
                className="flex-shrink-0 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-600 transition-colors shadow-sm"
              >
                Search
              </Link>
            </div>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-600 transition-all shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30"
              >
                Post a Project
                <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#07152F] font-bold text-sm border border-slate-200 hover:border-primary/40 hover:bg-primary/5 transition-all shadow-sm"
              >
                Find Projects
              </Link>
            </div>
          </div>

          {/* ── RIGHT: Visual ── */}
          <div className="relative hidden lg:flex items-center justify-center animate-fade-up-200">
            {/* Hero image */}
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 to-violet-100/40 blur-2xl -z-10" />
              <img
                src="/assets/images/landing/patadev-hero.png"
                alt="PataDev Ke — Connect businesses with developers"
                className="w-full rounded-3xl shadow-2xl shadow-primary/10 object-cover border border-white/80"
              />

              {/* Floating cards */}
              {FLOAT_CARDS.map((card) => (
                <div
                  key={card.label}
                  className="absolute bg-white/90 backdrop-blur-md border border-white/80 shadow-lg shadow-slate-200/60 rounded-xl px-3.5 py-2.5 flex items-center gap-2.5 animate-float"
                  style={{ top: card.top, right: card.right, animationDelay: card.delay, animationDuration: '5s' }}
                >
                  <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0">
                    {card.icon}
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#07152F] leading-none">{card.label}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{card.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Partner logo strip ── */}
        <div className="mt-16 pt-8 border-t border-slate-100">
          <p className="text-center text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-6">
            Trusted by businesses across Kenya
          </p>
          <div className="overflow-hidden">
            <div className="flex gap-10 animate-marquee whitespace-nowrap">
              {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((p, i) => (
                <img
                  key={`${p.name}-${i}`}
                  src={p.src}
                  alt={p.name}
                  className="h-7 object-contain opacity-50 hover:opacity-80 transition-opacity grayscale hover:grayscale-0"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
