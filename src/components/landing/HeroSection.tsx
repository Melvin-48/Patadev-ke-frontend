import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function HeroSection() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollReveal();

  const handleSearch = (e?: FormEvent) => {
    if (e) e.preventDefault();
    const targetQuery = query.trim();
    if (targetQuery) {
      navigate(`/projects?search=${encodeURIComponent(targetQuery)}`);
    } else {
      navigate('/projects');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    navigate(`/projects?search=${encodeURIComponent(suggestion)}`);
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 bg-[#F8FAFC]"
    >
      <div
        className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 600ms cubic-bezier(0.22, 1, 0.36, 1), transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div className="max-w-3xl">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-100/50 text-[#2563EB] text-xs font-bold mb-8 border border-blue-200 uppercase tracking-widest">
            KENYA'S DEVELOPER-BUSINESS MARKETPLACE
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-[#0F172A] leading-[1.1] tracking-tight mb-6">
            Build Better.<br />
            <span className="text-[#2563EB]">Connect Smarter.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl">
            Connect businesses with skilled developers to build, launch, and grow better digital products.
          </p>

          {/* Marketplace Search Bar */}
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-full border border-slate-300 p-2 flex items-center gap-2 mb-6 max-w-2xl shadow-sm focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-blue-100 transition-all"
          >
            <div className="flex-1 flex items-center gap-3 px-4">
              <Search size={22} className="text-slate-400 flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What are you looking to build?"
                className="flex-1 bg-transparent text-[16px] text-[#0F172A] placeholder-slate-400 outline-none font-medium py-3"
              />
            </div>
            <button
              type="submit"
              className="flex-shrink-0 px-8 py-3.5 rounded-full bg-[#1D4ED8] text-white text-[15px] font-bold hover:bg-[#1e3a8a] transition-colors cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Search Intent Suggestions */}
          <div className="flex flex-wrap items-center gap-2 mb-12 max-w-2xl">
            <span className="text-[13px] font-medium text-slate-500 mr-2">Popular:</span>
            {['Web development', 'Mobile app', 'E-commerce', 'AI & Machine Learning', 'Backend development'].map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-[13px] font-medium text-slate-600 bg-white border border-slate-200 hover:bg-blue-50 hover:text-[#2563EB] hover:border-blue-200 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#2563EB] text-white font-bold text-[15px] hover:bg-[#1D4ED8] transition-colors shadow-md"
            >
              Post a Project
              <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-[#0F172A] font-bold text-[15px] border border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-colors"
            >
              Find Projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
