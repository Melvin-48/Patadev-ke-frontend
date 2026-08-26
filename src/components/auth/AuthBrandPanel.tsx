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
    <div className="relative h-full w-full bg-gradient-to-br from-blue-50/80 via-slate-50 to-indigo-50/60 p-10 lg:p-16 flex flex-col justify-between overflow-hidden border-l border-slate-200/80 select-none">
      
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
        {/* Subtle Decorative Glass Curves */}
        <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] rounded-full border border-primary/10 bg-white/20 backdrop-blur-md" />
        <div className="absolute bottom-[10%] left-[-15%] w-[550px] h-[550px] rounded-full border border-indigo-200/30 bg-indigo-50/20 backdrop-blur-md" />
      </div>

      {/* Top Spacer / Tag */}
      <div className="relative z-10">
        <span className="text-xs font-semibold tracking-wider text-[#64748B] uppercase">
          PataDev Ke
        </span>
      </div>

      {/* Central Brand Headline & Description (Directly on Glassmorphic Panel) */}
      <div className="relative z-10 my-auto py-12 max-w-md">
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold text-[#07152F] tracking-tight leading-[1.15] whitespace-pre-line mb-6">
          {headline}
        </h2>
        
        <p className="text-sm lg:text-base text-[#64748B] font-medium leading-relaxed max-w-sm">
          {subheadline}
        </p>
      </div>

      {/* Bottom Subtle Message */}
      <div className="relative z-10 pt-4 border-t border-slate-200/60 text-xs text-[#64748B] font-medium">
        {footerText}
      </div>

    </div>
  );
}
