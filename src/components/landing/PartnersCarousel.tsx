import { useScrollReveal } from '../../hooks/useScrollReveal';
import { cn } from '../../lib/utils';

const PARTNERS = [
  {
    name: 'DigiHer',
    src: '/assets/images/partners/1772024539709-digiher.PNG',
  },
  {
    name: 'Solby',
    src: '/assets/images/partners/1772024540833-Solby_Logo_rzhueo.png',
  },
  {
    name: 'Uniflow',
    src: '/assets/images/partners/1772024541161-uniflow-logo.png',
  },
  {
    name: 'The Cube Innovation Hub',
    src: '/assets/images/partners/1784708509633-cube-new-logo-removebg-preview_apzpfc.png',
  },
  {
    name: 'Lancola Institute',
    src: '/assets/images/partners/1772107463559-lancola_institute.jpeg',
  },
  {
    name: 'Lancola Tech',
    src: '/assets/images/partners/1772171598005-lancolatech_logo.png',
  },
  {
    name: 'CareSync',
    src: '/assets/images/partners/1772024540231-caresync-png_1_osxcxq.png',
  },
  {
    name: 'Maziwa Tele',
    src: '/assets/images/partners/1772024539812-maziwa_tele.png',
  },
];

export default function PartnersCarousel() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  // Triple partner list for ultra-smooth infinite loop marquee
  const marqueePartners = [...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <section className="relative w-full py-8 lg:py-12 overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section Title */}
        <div
          className={cn(
            'text-center mb-6 transition-all duration-700 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
          )}
        >
          <p className="text-xs uppercase tracking-widest text-[#64748B] font-bold">
            Trusted by fast-growing companies & innovation hubs in Kenya
          </p>
        </div>

        {/* Glass Container with Infinite Horizontal Scroll Ticker */}
        <div
          className={cn(
            'relative w-full rounded-3xl p-6 sm:p-8 backdrop-blur-xl border border-white/50 shadow-xl shadow-navy/5 overflow-hidden transition-all duration-700 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          )}
          style={{ background: 'rgba(255, 255, 255, 0.45)' }}
        >
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white/70 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white/70 to-transparent z-10 pointer-events-none" />

          {/* Marquee Track — Full original colors (no grayscale) */}
          <div className="animate-marquee-track items-center gap-12 sm:gap-16">
            {marqueePartners.map((partner, idx) => (
              <div
                key={`${partner.name}-${idx}`}
                className="flex items-center justify-center h-16 w-32 sm:w-40 flex-shrink-0 group transition-all duration-300"
              >
                <img
                  src={partner.src}
                  alt={`${partner.name} logo`}
                  className="max-h-12 max-w-[130px] object-contain opacity-90 hover:opacity-100 transition-all duration-300 transform group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
