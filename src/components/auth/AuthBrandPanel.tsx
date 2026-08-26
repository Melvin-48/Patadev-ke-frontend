import { Code2, Briefcase, Users, MessageCircle, Rocket, ShieldCheck, Zap, CheckCircle2 } from 'lucide-react';

interface AuthBrandPanelProps {
  headline?: string;
  subheadline?: string;
}

export default function AuthBrandPanel({
  headline = 'Welcome back to PataDev.',
  subheadline = "Where businesses find skilled developers and developers find meaningful projects.",
}: AuthBrandPanelProps) {
  return (
    <div className="relative h-full w-full bg-gradient-to-br from-blue-50/80 via-slate-50 to-indigo-50/60 p-8 lg:p-12 flex flex-col justify-between overflow-hidden border-l border-slate-200/50">
      {/* Background Soft Glow Orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(23,105,255,0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 80%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* Top Tagline */}
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase">
          <Code2 size={14} />
          <span>PataDev Ke Platform</span>
        </div>
      </div>

      {/* Central Visual & Headline */}
      <div className="relative z-10 my-auto py-8 text-center flex flex-col items-center">
        
        {/* Glass Ecosystem Orbit Central Visual */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 mb-10 flex items-center justify-center">
          
          {/* Subtle Outer Glowing Ring */}
          <div className="absolute inset-0 rounded-full border border-primary/15 bg-white/40 backdrop-blur-md shadow-xl shadow-primary/5 animate-pulse" />
          <div className="absolute inset-4 rounded-full border border-dashed border-primary/25" />

          {/* Central Logo Core */}
          <div className="relative z-20 w-20 h-20 rounded-3xl bg-primary text-white shadow-xl shadow-primary/30 flex items-center justify-center transform transition-transform hover:scale-105">
            <Code2 size={38} strokeWidth={2.5} />
          </div>

          {/* Orbit Node 1: Business / Client (Top Left) */}
          <div className="absolute top-2 left-6 z-20 flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/90 backdrop-blur-xl shadow-lg border border-slate-200/80 text-xs font-bold text-[#07152F]">
            <span className="w-7 h-7 rounded-xl bg-blue-50 text-primary flex items-center justify-center">
              <Briefcase size={14} />
            </span>
            <span>Clients</span>
          </div>

          {/* Orbit Node 2: Developers (Top Right) */}
          <div className="absolute top-2 right-4 z-20 flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/90 backdrop-blur-xl shadow-lg border border-slate-200/80 text-xs font-bold text-[#07152F]">
            <span className="w-7 h-7 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users size={14} />
            </span>
            <span>Developers</span>
          </div>

          {/* Orbit Node 3: Projects (Bottom Right) */}
          <div className="absolute bottom-4 right-6 z-20 flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/90 backdrop-blur-xl shadow-lg border border-slate-200/80 text-xs font-bold text-[#07152F]">
            <span className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Rocket size={14} />
            </span>
            <span>Projects</span>
          </div>

          {/* Orbit Node 4: Collaboration (Bottom Left) */}
          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/90 backdrop-blur-xl shadow-lg border border-slate-200/80 text-xs font-bold text-[#07152F]">
            <span className="w-7 h-7 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <MessageCircle size={14} />
            </span>
            <span>Chat</span>
          </div>

        </div>

        {/* Dynamic Page Headline */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07152F] tracking-tight max-w-sm">
          {headline}
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B] font-medium mt-2 max-w-xs leading-relaxed">
          {subheadline}
        </p>

      </div>

      {/* Bottom Feature Highlights */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-200/60 text-xs font-semibold text-[#07152F]">
        <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/60 shadow-xs">
          <CheckCircle2 size={14} className="text-primary" />
          <span>Skilled Developers</span>
        </div>

        <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/60 shadow-xs">
          <Zap size={14} className="text-amber-500" />
          <span>Real Projects</span>
        </div>

        <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/60 shadow-xs">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span>Secure Collaboration</span>
        </div>
      </div>
    </div>
  );
}
