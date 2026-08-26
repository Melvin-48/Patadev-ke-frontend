import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

/* ── Phrases for the typing animation ── */
const TYPING_PHRASES = [
  'Connect Smarter.',
  'Scale Software Faster.',
  'Hire Top Local Talent.',
  'Build Milestones Safely.',
];

/* ── Real Profile images ── */
const PROFILE_IMAGES = [
  '/assets/images/profiles/profile-1.jpg',
  '/assets/images/profiles/profile-2.jpg',
  '/assets/images/profiles/profile-3.jpg',
];

/* ── Partner Logos ── */
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
    <section className="relative w-full overflow-hidden" aria-labelledby="hero-heading">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 sm:pt-32 pb-16">
        
        {/* Main Split Grid (Left Text, Right Photo) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ─────────── LEFT COLUMN (6/12) ─────────── */}
          <div className="lg:col-span-6 flex flex-col gap-6 animate-fade-up">

            {/* Clean Monospace Company Name Eyebrow (No Card/Background) */}
            <div className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold text-primary">
              PATADEV KE MARKETPLACE
            </div>

            {/* Main Headline with Typewriter Animation */}
            <h1
              id="hero-heading"
              className={cn(
                'font-bold leading-[1.08] tracking-tight text-[#07152F]',
                'text-[40px] sm:text-[50px] lg:text-[54px] xl:text-[60px]',
              )}
            >
              <div>Build Better.</div>
              <TypewriterEffect />
            </h1>

            {/* Subtitle Description */}
            <p className="text-[#64748B] text-[16px] lg:text-[17px] leading-relaxed max-w-[480px]">
              Connect with vetted Kenyan software developers, post custom projects, and fund work safely with milestone escrow protection.
            </p>

            {/* Action Row: Primary Button + Inline Avatars & Metric */}
            <div className="flex flex-wrap items-center gap-6 pt-3">
              {/* Primary CTA */}
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-semibold text-white shadow-md transition-all duration-200 hover:bg-navy-800 text-sm"
                style={{ background: '#07152F' }}
              >
                Post a Project
              </Link>

              {/* Inline Trust Metric & Profile Avatars */}
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-extrabold text-[#07152F] tracking-tight">
                    1,200+
                  </span>
                  <div className="flex -space-x-2">
                    {PROFILE_IMAGES.map((imgSrc, idx) => (
                      <img
                        key={idx}
                        src={imgSrc}
                        alt={`Profile avatar ${idx + 1}`}
                        className="w-7 h-7 rounded-full object-cover border-2 border-white shadow-xs"
                      />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-[#64748B] font-medium mt-0.5">
                  Trusted by hundreds of satisfied users.
                </span>
              </div>
            </div>

          </div>

          {/* ─────────── RIGHT COLUMN (6/12) — Large Clean Rounded Hero Photo ─────────── */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end animate-fade-up-200">
            <div
              className="relative w-full max-w-[480px] sm:max-w-[520px] rounded-[32px] overflow-hidden border-4 border-white shadow-2xl bg-white"
              style={{ aspectRatio: '4 / 3.6' }}
            >
              <img
                src="/assets/images/landing/patadev-hero.png"
                alt="Developer team working together"
                className="w-full h-full object-cover object-center"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>

        </div>

        {/* ─────────── BOTTOM PARTNERS BAR (Clean transparent marquee, no text heading) ─────────── */}
        <div className="mt-20 sm:mt-24 pt-8 animate-fade-up">
          {/* Transparent marquee ticker */}
          <div className="relative w-full overflow-hidden py-3 bg-transparent border-none">
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
