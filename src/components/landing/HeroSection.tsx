import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const SEARCH_SUGGESTIONS = [
  'E-commerce website',
  'POS system',
  'Mobile application',
  'AI chatbot',
  'Business dashboard',
];

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
      className="relative pt-[104px] pb-16 sm:pb-24 bg-white"
    >
      <div
        className="max-w-7xl mx-auto px-5 sm:px-8"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 600ms cubic-bezier(0.22, 1, 0.36, 1), transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* ── LEFT COLUMN: Text & Meaningful Search ── */}
          <div className="lg:col-span-7 max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#0F172A] leading-[1.12] tracking-tight mb-5">
              Build Better.<br />
              <span className="text-[#2563eb]">Connect Smarter.</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8 max-w-xl">
              Connect Kenyan businesses with skilled developers to build,
              launch, and grow better digital products — milestone by milestone.
            </p>

            <form
              onSubmit={handleSearch}
              className="bg-white rounded-full border border-slate-300 p-2 flex items-center gap-2 mb-4 max-w-xl shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all"
            >
              <div className="flex-1 flex items-center gap-3 px-4">
                <Search size={20} className="text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="What are you looking to build?"
                  className="flex-1 bg-transparent text-[15px] text-[#0F172A] placeholder-slate-400 outline-none font-medium py-2.5"
                />
              </div>
              <button
                type="submit"
                className="flex-shrink-0 px-6 py-3 rounded-full bg-[#1D4ED8] text-white text-[15px] font-semibold hover:bg-blue-800 transition-colors cursor-pointer"
              >
                Search
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-2 mb-10 max-w-xl">
              <span className="text-xs font-medium text-slate-500 mr-2">Popular:</span>
              {SEARCH_SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-xs font-medium text-slate-600 bg-[#F8FAFC] border border-slate-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#1D4ED8] text-white font-semibold text-[15px] hover:bg-blue-800 transition-colors shadow-sm"
              >
                Post a Project
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-[#0F172A] font-semibold text-[15px] border border-slate-300 hover:bg-[#F8FAFC] hover:border-slate-400 transition-colors"
              >
                Find Projects
              </Link>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Clean Image Card ── */}
          <div className="lg:col-span-5 relative flex items-center justify-center mt-8 lg:mt-0">
            <div className="relative w-full max-w-md lg:max-w-none">
              <img
                src="/assets/images/landing/patadev-hero.png"
                alt="PataDev Ke — Business and Developer Collaboration"
                className="w-full h-auto rounded-3xl shadow-lg border border-slate-200 object-cover bg-white"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
