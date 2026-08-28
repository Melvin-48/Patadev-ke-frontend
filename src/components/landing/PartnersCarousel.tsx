const PARTNER_LOGOS = [
  { name: 'DigiHer',                src: '/assets/images/partners/1772024539709-digiher.PNG' },
  { name: 'Solby',                  src: '/assets/images/partners/1772024540833-Solby_Logo_rzhueo.png' },
  { name: 'Uniflow',                src: '/assets/images/partners/1772024541161-uniflow-logo.png' },
  { name: 'The Cube Innovation Hub', src: '/assets/images/partners/1784708509633-cube-new-logo-removebg-preview_apzpfc.png' },
  { name: 'Lancola Institute',      src: '/assets/images/partners/1772107463559-lancola_institute.jpeg' },
  { name: 'Lancola Tech',           src: '/assets/images/partners/1772171598005-lancolatech_logo.png' },
  { name: 'CareSync',               src: '/assets/images/partners/1772024540231-caresync-png_1_osxcxq.png' },
  { name: 'Maziwa Tele',            src: '/assets/images/partners/1772024539812-maziwa_tele.png' },
];

export default function PartnersCarousel() {
  return (
    <section className="py-8 bg-white border-b border-slate-100/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-6 text-center">
        <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
          TRUSTED BY BUSINESSES ACROSS KENYA
        </p>
      </div>

      {/* Marquee Container with subtle edge masks */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Left & Right gradient fade masks (subtle) */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Marquee Track */}
        <div className="flex gap-12 sm:gap-16 items-center animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
          {[...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS].map((p, i) => (
            <div
              key={`${p.name}-${i}`}
              className="flex items-center justify-center flex-shrink-0 h-10 px-2"
            >
              <img
                src={p.src}
                alt={p.name}
                className="h-8 sm:h-9 max-w-[140px] w-auto object-contain transition-transform duration-200 hover:scale-105"
                loading="eager"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
