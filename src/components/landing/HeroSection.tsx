import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Star } from 'lucide-react';
import { cn } from '../../lib/utils';

/* ── Phrases for the typing animation ── */
const TYPING_PHRASES = [
  'Connect Smarter.',
  'Scale Software Faster.',
  'Hire Top Local Talent.',
  'Build Milestones Safely.',
];

/* ── Testimonials list for auto-cycling card ── */
const TESTIMONIALS = [
  {
    quote: 'A game-changer for Kenyan startups. PataDev Ke helped us hire a senior React developer and complete our milestone in 2 weeks.',
    author: 'Duncan Kingangi',
    company: 'Solby',
    rating: 5,
  },
  {
    quote: "Finding vetted tech talent in Nairobi used to take months. With PataDev's escrow system, we launched our core app seamlessly.",
    author: 'Sarah Kimani',
    company: 'CareSync',
    rating: 5,
  },
  {
    quote: 'The milestone escrow protection gives both clients and developers total peace of mind. Delivered ahead of deadline!',
    author: 'Alex Otieno',
    company: 'DigiHer',
    rating: 5,
  },
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
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Auto-rotate testimonials every 4.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        setFade(true);
      }, 300);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = TESTIMONIALS[testimonialIndex];
  const marqueePartners = [...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <section className="relative w-full overflow-hidden" aria-labelledby="hero-heading">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 sm:pt-32 pb-16">
        
        {/* Main Grid: Left text content, Right auto-cycling testimonial card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ─────────── LEFT COLUMN (7/12) ─────────── */}
          <div className="lg:col-span-7 flex flex-col gap-6 animate-fade-up">

            {/* Monospace Eyebrow Text */}
            <div className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold text-primary">
              PATADEV KE MARKETPLACE
            </div>

            {/* Main Headline with Typewriter animation */}
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

            {/* Subtitle in Serif Italic */}
            <p className="text-[#07152F] text-[18px] sm:text-[20px] font-serif-italic opacity-85 -mt-2">
              Connect software projects with Kenya&apos;s finest vetted tech talent.
            </p>

            {/* Pillar Keywords Row with Vertical Dividers */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-sm font-semibold text-[#475569] pt-1">
              <span>Post Projects</span>
              <span className="text-slate-300">|</span>
              <span>Vetted Devs</span>
              <span className="text-slate-300">|</span>
              <span>Escrow Secured</span>
              <span className="text-slate-300">|</span>
              <span>Fast Bidding</span>
              <span className="text-slate-300">|</span>
              <span>Guaranteed Quality</span>
            </div>

            {/* CTA Buttons Row */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                to="/register"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-white shadow-xl shadow-primary/30 transition-all duration-200 hover:bg-primary/90 text-sm"
                style={{ background: '#1769FF' }}
              >
                <span>Post a Project</span>
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>

              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-[#07152F] bg-white/80 backdrop-blur-md border border-white shadow-md hover:bg-white transition-all duration-200 text-sm"
              >
                <span>Register as Dev</span>
                <SparklesIcon />
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-[#475569] hover:text-[#07152F] transition-colors text-sm"
              >
                <span>Explore Platform</span>
                <Search size={14} strokeWidth={2} />
              </Link>
            </div>

          </div>

          {/* ─────────── RIGHT COLUMN (5/12) — Floating Auto-Rotating Testimonial Card ─────────── */}
          <div className="lg:col-span-5 relative flex flex-col items-center lg:items-end justify-center animate-fade-up-200 pt-6 lg:pt-0">

            {/* Testimonial Glass Card */}
            <div className="relative w-full max-w-[390px] rounded-3xl bg-white/95 backdrop-blur-xl p-7 sm:p-8 shadow-2xl border border-white/90 transition-all duration-300">
              
              {/* Star Rating Row */}
              <div className="flex items-center gap-1 text-amber-500 mb-4">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote Text with Smooth Fade Transition */}
              <div
                className={cn(
                  'transition-opacity duration-300 min-h-[100px] flex items-center',
                  fade ? 'opacity-100' : 'opacity-0',
                )}
              >
                <p className="text-[#1E293B] text-[15px] sm:text-[16px] leading-relaxed font-normal">
                  &ldquo;{currentTestimonial.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div
                className={cn(
                  'mt-6 pt-4 border-t border-slate-100 transition-opacity duration-300 flex items-center justify-between',
                  fade ? 'opacity-100' : 'opacity-0',
                )}
              >
                <div>
                  <span className="font-bold text-[#07152F] text-sm">
                    {currentTestimonial.author}
                  </span>
                  <span className="text-slate-400 mx-2">|</span>
                  <span className="text-slate-600 text-sm font-medium">
                    {currentTestimonial.company}
                  </span>
                </div>

                {/* Card index dots */}
                <div className="flex items-center gap-1.5">
                  {TESTIMONIALS.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setFade(false);
                        setTimeout(() => {
                          setTestimonialIndex(idx);
                          setFade(true);
                        }, 200);
                      }}
                      className={cn(
                        'w-2 h-2 rounded-full transition-all duration-300',
                        testimonialIndex === idx ? 'bg-primary w-5' : 'bg-slate-300',
                      )}
                      aria-label={`Go to testimonial ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

            </div>

            {/* Reviewed on Google Subtext (Reference matching) */}
            <div className="mt-5 flex items-center gap-3 text-xs text-[#64748B] font-medium pr-2">
              <span className="uppercase tracking-widest text-[10px] text-slate-400 font-bold">
                Reviewed on
              </span>
              <span className="font-bold text-[#07152F] flex items-center gap-1">
                Google
              </span>
              <div className="flex items-center text-amber-500 text-[11px]">
                <Star size={12} className="fill-amber-400 text-amber-400 ml-1" />
                <span className="font-bold text-[#07152F] ml-1">5.0 Rating</span>
              </div>
            </div>

          </div>

        </div>

        {/* ─────────── BOTTOM PARTNERS MARQUEE TICKER ─────────── */}
        <div className="mt-20 sm:mt-24 pt-8 animate-fade-up">
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

function SparklesIcon() {
  return (
    <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 7.92c0 .13 0 .261 0 .393a7.5 7.5 0 0 0-7.92 7.92c-.13 0-.261 0-.393 0a7.5 7.5 0 0 0-7.92-7.92c0-.132 0-.263 0-.393A7.5 7.5 0 0 0 12 3z" />
    </svg>
  );
}
