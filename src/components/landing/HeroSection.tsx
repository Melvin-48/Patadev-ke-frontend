import { useState, FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { cn } from '../../lib/utils';

const TYPING_PHRASES = [
  { text: 'Connect Smarter.', fontClass: 'font-sans' },
  { text: 'Build Faster.', fontClass: 'font-mono tracking-tighter' },
  { text: 'Scale Effortlessly.', fontClass: 'font-serif italic' },
  { text: 'Innovate Daily.', fontClass: 'font-sans font-black' },
];

export default function HeroSection() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollReveal();

  // Typing Effect State
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(TYPING_PHRASES[0].text.length);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = TYPING_PHRASES[phraseIndex].text;
    let timeoutId: ReturnType<typeof setTimeout>;    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at the end of the full word
      timeoutId = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex === 0) {
      // Move to next word when fully deleted
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % TYPING_PHRASES.length);
    } else {
      // Typing or deleting characters
      const delay = isDeleting ? 40 : 80;
      timeoutId = setTimeout(() => {
        setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
      }, delay);
    }

    return () => clearTimeout(timeoutId);
  }, [charIndex, isDeleting, phraseIndex]);

  const handleSearch = (e?: FormEvent) => {
    if (e) e.preventDefault();
    const targetQuery = query.trim();
    if (targetQuery) {
      navigate(`/projects?search=${encodeURIComponent(targetQuery)}`);
    } else {
      navigate('/projects');
    }
  };

  const currentPhraseObj = TYPING_PHRASES[phraseIndex];
  const displayedText = currentPhraseObj.text.substring(0, charIndex);

  return (
    <section
      id="home"
      ref={ref}
      className="relative pt-20 pb-20 sm:pt-28 sm:pb-28 bg-[#F8FAFC] overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/images/landing/patadev-hero.png')" }}
      />
      <div className="absolute inset-0 z-0 bg-white/90 sm:bg-white/80 backdrop-blur-[2px]" />

      <div
        className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 600ms cubic-bezier(0.22, 1, 0.36, 1), transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-[#0F172A] leading-[1.1] tracking-tight mb-6 min-h-[140px] sm:min-h-[160px]">
            Build Better.<br />
            <span className={cn("text-[#2563EB]", currentPhraseObj.fontClass)}>
              {displayedText}
              <span className="inline-block w-1 h-[1em] bg-[#2563EB] ml-1 animate-pulse align-middle" />
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-800 font-medium leading-relaxed mb-10 max-w-2xl">
            Connect businesses with skilled developers to build, launch, and grow better digital products.
          </p>

          {/* Marketplace Search Bar */}
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-full border border-slate-300 p-2 flex items-center gap-2 mb-10 max-w-2xl shadow-sm focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-blue-100 transition-all"
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
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-[#0F172A] font-bold text-[15px] border border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-colors shadow-sm"
            >
              Find Projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
