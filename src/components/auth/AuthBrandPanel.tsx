import { Code2, CheckCircle2, Zap, ShieldCheck } from 'lucide-react';

interface AuthBrandPanelProps {
  headline?: string;
  subheadline?: string;
  footerText?: string;
}

export default function AuthBrandPanel({
  headline = 'Build better.\nConnect smarter.',
  subheadline = 'Where businesses find skilled developers and developers find meaningful projects.',
  footerText = 'Where ideas become projects.',
}: AuthBrandPanelProps) {
  return (
    <div className="relative h-full w-full bg-gradient-to-br from-blue-50/80 via-slate-50 to-indigo-50/60 p-10 lg:p-14 flex flex-col justify-between overflow-hidden border-l border-slate-200/80 select-none">
      
      {/* ────── Soft Ambient Glow Orbs & Light Glassmorphism Gradients ────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-32 -right-32 w-[550px] h-[550px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(23,105,255,0.08) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[550px] h-[550px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
        {/* Subtle Decorative Curves */}
        <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] rounded-full border border-primary/10 bg-white/20 backdrop-blur-md" />
        <div className="absolute bottom-[10%] left-[-15%] w-[550px] h-[550px] rounded-full border border-indigo-200/30 bg-indigo-50/20 backdrop-blur-md" />
      </div>

      {/* Top Tagline */}
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase shadow-2xs">
          <Code2 size={14} />
          <span>PataDev Ke Platform</span>
        </div>
      </div>

      {/* Central Brand Headline & Glass Card Container */}
      <div className="relative z-10 my-auto py-8">
        
        {/* Glassmorphic Container Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-200/80 shadow-xl shadow-slate-200/50 max-w-lg space-y-5">
          
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#07152F] tracking-tight leading-[1.15] whitespace-pre-line">
            {headline}
          </h2>
          
          <p className="text-sm lg:text-base text-[#64748B] font-medium leading-relaxed">
            {subheadline}
          </p>

          {/* Feature Highlights */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2.5">
            <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/80 text-xs font-bold text-[#07152F] shadow-xs">
              <CheckCircle2 size={14} className="text-primary" />
              <span>Skilled Developers</span>
            </div>

            <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/80 text-xs font-bold text-[#07152F] shadow-xs">
              <Zap size={14} className="text-amber-500" />
              <span>Real Projects</span>
            </div>

            <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/80 text-xs font-bold text-[#07152F] shadow-xs">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>Escrow Security</span>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Subtle Message */}
      <div className="relative z-10 pt-4 border-t border-slate-200/60 text-xs text-[#64748B] font-medium">
        {footerText}
      </div>

    </div>
  );
}
