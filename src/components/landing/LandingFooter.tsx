import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Code2, Heart } from 'lucide-react';

export default function LandingFooter() {
  return (
    <footer className="relative w-full pt-16 pb-12 overflow-hidden">
      
      {/* ── HIGH-CONVERSION CTA BANNER CARD ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
        <div
          className="relative rounded-3xl p-10 sm:p-14 text-center text-white overflow-hidden shadow-2xl"
          style={{ background: 'linear-gradient(135deg, #07152F 0%, #1769FF 100%)' }}
        >
          {/* Decorative background glow circle */}
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-20 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)' }}
          />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-md">
              <ShieldCheck size={14} className="text-emerald-400" />
              100% Milestone Escrow Protection
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Ready to Build Your Next Software Project?
            </h2>

            <p className="text-blue-100 text-base sm:text-lg leading-relaxed">
              Post your project for free today and start receiving proposals from top vetted Kenyan developers within hours.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                to="/register"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold bg-white text-[#07152F] shadow-xl hover:bg-slate-100 transition-all duration-200 text-base"
              >
                <span>Post a Project Now</span>
                <ArrowRight size={17} strokeWidth={2.5} />
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200 text-base"
              >
                <Code2 size={18} />
                <span>Join as Developer</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER NAVIGATION & CREDITS ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 border-t border-slate-200/60 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-lg shadow-sm">
                P
              </div>
              <span className="text-xl font-extrabold text-[#07152F] tracking-tight">
                PataDev<span className="text-primary">.ke</span>
              </span>
            </div>

            <p className="text-xs text-[#64748B] leading-relaxed">
              Kenya&apos;s premier developer marketplace connecting businesses with top local tech talent via secure milestone escrow.
            </p>
          </div>

          {/* Col 2: Marketplace */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#07152F] mb-4">
              Marketplace
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-[#64748B]">
              <li>
                <Link to="/projects" className="hover:text-primary transition-colors">
                  Browse Projects
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-primary transition-colors">
                  Post a Project
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-primary transition-colors">
                  Become a Developer
                </Link>
              </li>
              <li>
                <Link to="#how-it-works" className="hover:text-primary transition-colors">
                  How Escrow Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#07152F] mb-4">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-[#64748B]">
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  About PataDev
                </Link>
              </li>
              <li>
                <Link to="#featured-projects" className="hover:text-primary transition-colors">
                  Client Stories
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-primary transition-colors">
                  Pricing & Escrow Fees
                </Link>
              </li>
              <li>
                <Link to="/disputes" className="hover:text-primary transition-colors">
                  Trust & Safety
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Support & Location */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#07152F] mb-4">
              Connect
            </h4>
            <p className="text-xs text-[#64748B] leading-relaxed mb-3">
              Nairobi, Kenya — Building software solutions for the African tech ecosystem.
            </p>
            <div className="text-xs text-primary font-semibold">
              support@patadev.ke
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-slate-200/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <div>
            © {new Date().getFullYear()} PataDev Ke. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Engineered with</span>
            <Heart size={12} className="text-red-500 fill-red-500 inline" />
            <span>for Kenyan Tech Talent</span>
          </div>
        </div>

      </div>

    </footer>
  );
}
