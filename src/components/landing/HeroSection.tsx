import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';

const SEARCH_SUGGESTIONS = [
  'E-commerce website',
  'Mobile app',
  'POS system',
  'AI chatbot',
  'Backend API',
  'UI/UX design',
];

export default function HeroSection() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e?: FormEvent) => {
    if (e) e.preventDefault();
    const targetQuery = query.trim();
    if (targetQuery) {
      navigate(`/projects?q=${encodeURIComponent(targetQuery)}`);
    } else {
      navigate('/projects');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    navigate(`/projects?q=${encodeURIComponent(suggestion)}`);
  };

  return (
    <section
      id="home"
      className="relative pt-24 pb-14 sm:pb-20 bg-gradient-to-b from-[#EFF6FF] via-[#F8FAFC] to-white"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* ── LEFT COLUMN: Text & Search ── */}
          <div className="lg:col-span-7 max-w-2xl">

            {/* Contextual Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6 border border-primary/15">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
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

            {/* Meaningful Marketplace Search Bar */}
            <form
              onSubmit={handleSearch}
              className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200 p-2 flex items-center gap-2 mb-4 max-w-xl focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all"
            >
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
              <button
                type="submit"
                className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-600 transition-colors shadow-xs cursor-pointer"
              >
                Search
              </button>
            </form>

            {/* Search Intent Suggestions */}
            <div className="flex flex-wrap items-center gap-1.5 mb-8 max-w-xl">
              <span className="text-[11px] font-medium text-slate-400 mr-1">Popular:</span>
              {SEARCH_SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-[11px] font-semibold text-slate-600 bg-slate-100 hover:bg-primary/10 hover:text-primary px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                >
                  {suggestion}
                </button>
              ))}
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

          {/* ── RIGHT COLUMN: Clean Image ── */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-lg lg:max-w-none">
              <img
                src="/assets/images/landing/patadev-hero.png"
                alt="PataDev Ke — Business and Developer Collaboration"
                className="w-full h-auto rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 object-cover"
                loading="eager"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
