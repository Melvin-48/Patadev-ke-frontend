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
    <section className="py-12 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-8 text-center">
        <p className="text-sm font-extrabold uppercase tracking-widest text-slate-500">
          TRUSTED BY BUSINESSES ACROSS KENYA
        </p>
      </div>

      <div className="relative w-full overflow-hidden flex items-center">
        {/* We use 2 copies to make 0 -> -50% translation shift exactly 1 copy width */}
        <div className="flex gap-12 sm:gap-16 items-center w-max animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
          {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((p, i) => (
            <div
              key={`${p.name}-${i}`}
              className="flex items-center justify-center flex-shrink-0 h-12 px-4"
            >
              <img
                src={p.src}
                alt={p.name}
                className="h-10 sm:h-12 max-w-[160px] w-auto object-contain transition-transform duration-200"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
