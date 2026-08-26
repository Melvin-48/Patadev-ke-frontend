import { useState } from 'react';
import { ArrowRight, Code, Database, Globe, Smartphone, ShieldCheck, Cpu } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { cn } from '../../lib/utils';

const SERVICE_CARDS = [
  {
    id: 'web-dev',
    title: 'Custom Web & CRM Platforms',
    category: 'FULL-STACK DEVELOPMENT',
    icon: Globe,
    description:
      'Engineered React, Next.js, and Node.js solutions tailored for business operations, POS integration, and payment workflows.',
    visualType: 'diagram-crm',
  },
  {
    id: 'mobile-apps',
    title: 'Mobile App Development',
    category: 'CROSS-PLATFORM APPS',
    icon: Smartphone,
    description:
      'Native and Flutter mobile applications optimized for iOS and Android with M-Pesa STK push & real-time updates.',
    visualType: 'diagram-mobile',
  },
  {
    id: 'api-escrow',
    title: 'Escrow & Fintech Integrations',
    category: 'PAYMENTS & SECURITY',
    icon: ShieldCheck,
    description:
      'Secure milestone wallet architecture, M-Pesa API integration, identity verification, and financial transaction security.',
    visualType: 'diagram-fintech',
  },
];

export default function PopularServicesSection() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="services" className="relative w-full py-16 lg:py-24">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div
          className={cn(
            'flex flex-col items-center text-center gap-3 mb-14 transition-all duration-700 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          )}
        >
          <div className="font-mono text-xs uppercase tracking-[0.25em] font-semibold text-primary">
            WHAT WE BUILD
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#07152F] tracking-tight">
            Popular Software Services
          </h2>
          
          {/* Underlined Accent Line */}
          <div className="w-16 h-1 rounded-full bg-primary mt-1" />

          <p className="text-[#64748B] text-base lg:text-lg max-w-2xl mt-2">
            Vetted Kenyan tech talent specialized in high-impact software solutions for local and international clients.
          </p>
        </div>

        {/* 3 Showcase Glassmorphic Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SERVICE_CARDS.map((card, idx) => {
            const Icon = card.icon;
            const isHovered = hoveredCard === card.id;

            return (
              <div
                key={card.id}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={cn(
                  'flex flex-col justify-between rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-200/80 shadow-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
                )}
                style={{
                  transitionDelay: isVisible ? `${idx * 120}ms` : '0ms',
                }}
              >
                {/* Top Visual Showcase Box */}
                <div className="relative h-48 sm:h-52 w-full bg-gradient-to-br from-slate-100 to-slate-200/80 p-6 flex flex-col justify-between overflow-hidden border-b border-slate-200/80">
                  {/* Category Tag */}
                  <span className="inline-block self-start font-mono text-[10px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-lg bg-white/90 text-primary shadow-xs">
                    {card.category}
                  </span>

                  {/* Decorative Diagram Illustrations */}
                  {card.visualType === 'diagram-crm' && (
                    <div className="relative z-10 flex items-center justify-center gap-3 my-auto">
                      <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Globe size={26} />
                      </div>
                      <div className="h-0.5 w-10 bg-primary/40 border-t border-dashed border-primary" />
                      <div className="w-14 h-14 rounded-2xl bg-primary text-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Database size={26} />
                      </div>
                    </div>
                  )}

                  {card.visualType === 'diagram-mobile' && (
                    <div className="relative z-10 flex items-center justify-center gap-3 my-auto">
                      <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Smartphone size={26} />
                      </div>
                      <div className="h-0.5 w-10 bg-primary/40 border-t border-dashed border-primary" />
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Cpu size={26} />
                      </div>
                    </div>
                  )}

                  {card.visualType === 'diagram-fintech' && (
                    <div className="relative z-10 flex items-center justify-center gap-3 my-auto">
                      <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <ShieldCheck size={26} />
                      </div>
                      <div className="h-0.5 w-10 bg-primary/40 border-t border-dashed border-primary" />
                      <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Code size={26} />
                      </div>
                    </div>
                  )}

                  {/* Ambient Glow */}
                  <div
                    className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full pointer-events-none opacity-20 transition-opacity group-hover:opacity-40"
                    style={{ background: 'radial-gradient(circle, #1769FF 0%, transparent 70%)' }}
                  />
                </div>

                {/* Bottom Copy Content */}
                <div className="p-7 sm:p-8 flex flex-col justify-between flex-1 gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                        <Icon size={20} />
                      </div>
                      <h3 className="text-xl font-extrabold text-[#07152F]">
                        {card.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {/* Underlined Action Link */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-primary group-hover:text-blue-700">
                    <span className="underline underline-offset-4">Learn More & Request Bids</span>
                    <ArrowRight
                      size={15}
                      className={cn(
                        'transition-transform duration-300',
                        isHovered && 'translate-x-1.5',
                      )}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
