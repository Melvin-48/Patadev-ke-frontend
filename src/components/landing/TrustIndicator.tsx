import { useState, useEffect, useRef } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface TestimonialItem {
  id: string;
  text: string;
  clientName: string;
  businessRole: string;
  initials: string;
  color: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    text: 'Working with the right developer used to take weeks. PataDev made the process much easier.',
    clientName: 'David Mwangi',
    businessRole: 'Founder, RetailPay Kenya',
    initials: 'DM',
    color: 'bg-blue-50 text-primary',
  },
  {
    id: 't2',
    text: 'PataDev connected our startup directly with skilled engineers. Milestones kept execution on budget.',
    clientName: 'Amina Omondi',
    businessRole: 'Product Director, CareSync',
    initials: 'AO',
    color: 'bg-emerald-50 text-emerald-700',
  },
  {
    id: 't3',
    text: 'We posted our POS system brief and received three solid proposals within 24 hours.',
    clientName: 'Brian Kipchumba',
    businessRole: 'CTO, AgriTech Solutions',
    initials: 'BK',
    color: 'bg-violet-50 text-violet-700',
  },
  {
    id: 't4',
    text: 'Clear milestones and milestone escrow payments gave us complete confidence throughout development.',
    clientName: 'Grace Wambui',
    businessRole: 'Operations Lead, Uniflow Kenya',
    initials: 'GW',
    color: 'bg-amber-50 text-amber-700',
  },
];

export default function TrustIndicator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { ref, isVisible } = useScrollReveal();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Autoplay (6 seconds, pauses on interaction)
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  return (
    <section ref={ref} className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        
        {/* Header */}
        <div
          className="text-center mb-12 transition-all duration-500"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <p className="text-xs font-extrabold uppercase tracking-widest text-primary mb-2">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#07152F] tracking-tight">
            Trusted by founders & teams
          </h2>
          <p className="text-slate-500 mt-2 text-sm">
            Hear from businesses building software with PataDev Ke.
          </p>
        </div>

        {/* Testimonial Carousel Solid Card Container */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative bg-[#F8FAFC] rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-2xs transition-all duration-500"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <Quote size={32} className="text-primary/20 mb-6" />

          {/* Testimonial Content Slide */}
          <div className="min-h-[120px] flex flex-col justify-between">
            <p className="text-lg sm:text-xl font-medium text-[#07152F] leading-relaxed italic mb-8">
              "{TESTIMONIALS[currentIndex].text}"
            </p>

            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-full ${TESTIMONIALS[currentIndex].color} font-extrabold text-sm flex items-center justify-center flex-shrink-0 border border-slate-200/60`}>
                {TESTIMONIALS[currentIndex].initials}
              </div>
              <div>
                <h3 className="font-bold text-[#07152F] text-base leading-tight">
                  {TESTIMONIALS[currentIndex].clientName}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {TESTIMONIALS[currentIndex].businessRole}
                </p>
              </div>
            </div>
          </div>

          {/* Carousel Controls (Prev/Next & Dots) */}
          <div className="flex items-center justify-between pt-8 mt-6 border-t border-slate-200/80">
            
            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx ? 'w-6 bg-primary' : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Previous & Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-700 hover:text-primary hover:border-primary/40 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-700 hover:text-primary hover:border-primary/40 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
