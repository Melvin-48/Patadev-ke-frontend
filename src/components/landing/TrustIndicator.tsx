import { useState, useEffect, useRef } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface TestimonialItem {
  id: string;
  text: string;
  clientName: string;
  businessRole: string;
  initials: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    text: 'Working with the right developer used to take weeks. PataDev made the process much easier. We found exactly what we needed.',
    clientName: 'David Mwangi',
    businessRole: 'Founder, RetailPay Kenya',
    initials: 'DM',
  },
  {
    id: 't2',
    text: 'PataDev connected our startup directly with skilled engineers. Milestones kept execution on budget and delivery on time.',
    clientName: 'Amina Omondi',
    businessRole: 'Product Director, CareSync',
    initials: 'AO',
  },
  {
    id: 't3',
    text: 'We posted our POS system brief and received three solid proposals within 24 hours. Execution was flawless.',
    clientName: 'Brian Kipchumba',
    businessRole: 'CTO, AgriTech Solutions',
    initials: 'BK',
  },
  {
    id: 't4',
    text: 'Clear milestones and escrow payments gave us complete confidence throughout development.',
    clientName: 'Grace Wambui',
    businessRole: 'Operations Lead, Uniflow Kenya',
    initials: 'GW',
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
    <section ref={ref} className="py-20 bg-[#F8FAFC]">
      <div
        className="max-w-4xl mx-auto px-5 sm:px-8"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 600ms cubic-bezier(0.22, 1, 0.36, 1), transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Trusted by founders & teams
          </h2>
          <p className="text-slate-600 mt-2 text-base">
            Hear from businesses building software with PataDev Ke.
          </p>
        </div>

        {/* Centered Testimonial Carousel Card */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative bg-white rounded-3xl border border-slate-200 p-10 sm:p-14 shadow-sm text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-1 text-[#2563eb]">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <Quote size={40} className="text-[#2563eb]/20" />
          </div>

          {/* Testimonial Content Slide */}
          <div className="min-h-[160px] flex flex-col justify-center transition-opacity duration-500 ease-in-out">
            <p className="text-xl sm:text-2xl font-medium text-[#0F172A] leading-relaxed mb-10 max-w-2xl mx-auto">
              "{TESTIMONIALS[currentIndex].text}"
            </p>

            <div className="flex flex-col items-center justify-center gap-2">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-[#2563eb] font-bold text-sm flex items-center justify-center border border-blue-100">
                {TESTIMONIALS[currentIndex].initials}
              </div>
              <div>
                <h3 className="font-bold text-[#0F172A] text-sm">
                  {TESTIMONIALS[currentIndex].clientName}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {TESTIMONIALS[currentIndex].businessRole}
                </p>
              </div>
            </div>
          </div>

          {/* Carousel Controls (Prev/Next & Dots) */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-700 hover:text-[#2563eb] hover:border-[#2563eb]/40 flex items-center justify-center transition-colors cursor-pointer shadow-sm"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx ? 'w-6 bg-[#2563eb]' : 'w-2 bg-slate-200 hover:bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-700 hover:text-[#2563eb] hover:border-[#2563eb]/40 flex items-center justify-center transition-colors cursor-pointer shadow-sm"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
