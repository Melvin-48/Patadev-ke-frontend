import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Smartphone, CreditCard, Cpu, Server, ShieldCheck } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { cn } from '../../lib/utils';

const SERVICES = [
  {
    icon: Code2,
    title: 'Custom Web Applications',
    description: 'High-performance web applications built with React, Next.js, TypeScript, and modern frontend frameworks.',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Cross-platform iOS and Android mobile apps engineered for speed, offline access, and fluid user experiences.',
    tags: ['Flutter', 'React Native', 'iOS', 'Android'],
  },
  {
    icon: CreditCard,
    title: 'M-Pesa & Payment Systems',
    description: 'Seamless integration of M-Pesa Express (Daraja API), STK push, automated B2C payouts, and custom escrow flows.',
    tags: ['M-Pesa API', 'STK Push', 'Paybill', 'Escrow'],
  },
  {
    icon: Cpu,
    title: 'AI & Data Intelligence',
    description: 'Predictive analytics, custom AI model integration, automated web scraping, and telemetry dashboards.',
    tags: ['Python', 'TensorFlow', 'FastAPI', 'Pandas'],
  },
  {
    icon: Server,
    title: 'Cloud & Backend Engineering',
    description: 'Scalable REST & GraphQL APIs, microservices, PostgreSQL databases, Docker containers, and cloud deployment.',
    tags: ['Node.js', 'PostgreSQL', 'Docker', 'AWS'],
  },
  {
    icon: ShieldCheck,
    title: 'Code Audits & Security',
    description: 'Comprehensive codebase reviews, performance profiling, security vulnerability fixes, and QA testing.',
    tags: ['Security Audit', 'Code Review', 'Jest', 'CI/CD'],
  },
];

export default function PopularServicesSection() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="services" className="relative w-full py-16 lg:py-24">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div
          className={cn(
            'flex flex-col items-center text-center gap-3 mb-12 transition-all duration-700 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          )}
        >
          <div className="font-mono text-xs uppercase tracking-[0.25em] font-semibold text-primary">
            POPULAR SERVICES
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#07152F] tracking-tight">
            Software Solutions Tailored for Growth
          </h2>
          <p className="text-[#64748B] text-base lg:text-lg max-w-2xl">
            Hire vetted Kenyan software engineers for your exact tech stack and project needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={cn(
                  'flex flex-col justify-between p-7 sm:p-8 rounded-3xl bg-white/85 backdrop-blur-xl border border-white shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
                )}
                style={{
                  transitionDelay: isVisible ? `${idx * 100}ms` : '0ms',
                }}
              >
                <div>
                  {/* Icon Header */}
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Icon size={24} strokeWidth={2} />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-[#07152F] mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Tech Stack Pills & Action */}
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-slate-100/90 text-slate-600 text-[11px] font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    to="/register"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors"
                  >
                    <span>Post a {service.title.split(' ')[0]} Project</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
