import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { cn } from '../../lib/utils';

/* ── Phrases for the typing animation ── */
const TYPING_PHRASES = [
  'Connect Smarter.',
  'Scale Software Faster.',
  'Hire Top Local Talent.',
  'Build Milestones Safely.',
];

/* ── Real Partner Logos for bottom ticker ── */
const PARTNERS = [
  { name: 'DigiHer', src: '/assets/images/partners/1772024539709-digiher.PNG' },
  { name: 'Solby', src: '/assets/images/partners/1772024540833-Solby_Logo_rzhueo.png' },
  { name: 'Uniflow', src: '/assets/images/partners/1772024541161-uniflow-logo.png' },
  { name: 'The Cube Innovation Hub', src: '/assets/images/partners/1784708509633-cube-new-logo-removebg-preview_apzpfc.png' },
  { name: 'Lancola Institute', src: '/assets/images/partners/1772107463559-lancola_institute.jpeg' },
  { name: 'Lancola Tech', src: '/assets/images/partners/1772171598005-lancolatech_logo.png' },
  { name: 'CareSync', src: '/assets/images/partners/1772024540231-caresync-png_1_osxcxq.png' },
  { name: 'Maziwa Tele', src: '/assets/images/partners/1772024539812-maziwa_tele.png' },
];

function TypewriterEffect() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullPhrase = TYPING_PHRASES[phraseIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && currentText === fullPhrase) {
      timer = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % TYPING_PHRASES.length);
    } else {
      const speed = isDeleting ? 40 : 75;
      timer = setTimeout(() => {
        const nextText = isDeleting
          ? fullPhrase.substring(0, currentText.length - 1)
          : fullPhrase.substring(0, currentText.length + 1);
        setCurrentText(nextText);
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex]);

  return (
    <span className="inline-flex items-center text-primary font-serif-italic bg-gradient-to-r from-primary via-indigo-600 to-blue-700 bg-clip-text text-transparent font-normal whitespace-nowrap overflow-hidden max-w-full">
      <span className="whitespace-nowrap">{currentText}</span>
      <span className="animate-cursor text-primary ml-0.5 font-sans not-italic font-light">|</span>
    </span>
  );
}

export default function HeroSection() {
  const marqueePartners = [...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <section className="relative w-full overflow-hidden text-center" aria-labelledby="hero-heading">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 sm:pt-32 pb-16">
        
        {/* Centered Main Hero Block */}
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 animate-fade-up">

          {/* Monospace Eyebrow Text */}
          <div className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold text-primary">
            PATADEV KE MARKETPLACE
          </div>

          {/* Main Headline with Typewriter Animation */}
          <h1
            id="hero-heading"
            className={cn(
              'font-bold leading-[1.08] tracking-tight text-[#07152F]',
              'text-[42px] sm:text-[56px] lg:text-[66px] xl:text-[72px]',
            )}
          >
            <div>Build Better.</div>
            <TypewriterEffect />
          </h1>

          {/* Subtitle in Serif Italic */}
          <p className="text-[#07152F] text-[19px] sm:text-[22px] font-serif-italic opacity-85 max-w-[620px]">
            Connect software projects with Kenya&apos;s finest vetted tech talent.
          </p>

          {/* Two Centered Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-white shadow-xl shadow-primary/30 transition-all duration-200 hover:bg-primary/90 text-base"
              style={{ background: '#1769FF' }}
            >
              <span>Post a Project</span>
              <ArrowRight size={17} strokeWidth={2.5} />
            </Link>

            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-semibold text-[#07152F] bg-white/80 backdrop-blur-md border border-white shadow-md hover:bg-white transition-all duration-200 text-base"
            >
              <Search size={16} strokeWidth={2} />
              <span>Explore Projects</span>
            </Link>
          </div>

        </div>

        {/* ─────────── BOTTOM PARTNERS MARQUEE TICKER ─────────── */}
        <div className="mt-20 sm:mt-28 pt-8 border-t border-slate-200/50 animate-fade-up">
          <div className="relative w-full overflow-hidden py-3 bg-transparent">
            <div className="animate-marquee-track items-center gap-12 sm:gap-16">
              {marqueePartners.map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="flex items-center justify-center h-12 w-32 sm:w-40 flex-shrink-0 group transition-all duration-300"
                >
                  <img
                    src={partner.src}
                    alt={`${partner.name} logo`}
                    className="max-h-10 max-w-[130px] object-contain opacity-90 hover:opacity-100 transition-all duration-300 transform group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
