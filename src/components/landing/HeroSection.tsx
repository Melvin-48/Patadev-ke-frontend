import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const [query, setQuery] = useState('');

  return (
    <section
      id="home"
      className="relative pt-24 pb-12 sm:pb-16 overflow-hidden bg-gradient-to-b from-[#EFF6FF] via-[#F8FAFC] to-white"
    >
      {/* ── Soft ambient background glow ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-24 right-0 w-[600px] h-[600px] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(23,105,255,0.12) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <div
          className="absolute top-1/3 -left-36 w-[450px] h-[450px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%)', filter: 'blur(75px)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* ── LEFT COLUMN: Text & Search ── */}
          <div className="lg:col-span-7 max-w-2xl">

            {/* Contextual Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-5 border border-primary/15">
              <Sparkles size={13} className="text-primary animate-pulse" />
              <span>Kenya's Developer-Business Marketplace</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#07152F] leading-[1.12] tracking-tight mb-5">
              Build Better.<br />
              <span className="text-primary">Connect Smarter.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
              Connect Kenyan businesses with skilled developers to build,
              launch, and grow better digital products — milestone by milestone.
            </p>

            {/* Search Input */}
            <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200/80 p-2 flex items-center gap-2 mb-6 max-w-xl">
              <div className="flex-1 flex items-center gap-2.5 px-3">
                <Search size={18} className="text-slate-400 flex-shrink-0" />
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
                className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-600 transition-colors shadow-xs"
              >
                Search
              </Link>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-3.5">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-600 transition-all shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
              >
                Post a Project
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#07152F] font-bold text-sm border border-slate-200 hover:border-primary/40 hover:bg-primary/5 transition-all shadow-xs"
              >
                Find Projects
              </Link>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Hero Image ── */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-lg lg:max-w-none">
              {/* Soft glow background container */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary/10 via-sky-100/50 to-indigo-100/40 blur-xl -z-10" />
              <img
                src="/assets/images/landing/patadev-hero.png"
                alt="PataDev Ke — Developer and Client Collaboration"
                className="w-full h-auto rounded-3xl shadow-xl shadow-slate-300/40 border border-white object-cover"
                loading="eager"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
