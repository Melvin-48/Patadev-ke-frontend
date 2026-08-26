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
    <div className="relative h-full w-full bg-[#07152F] text-white p-10 lg:p-16 flex flex-col justify-between overflow-hidden select-none">
      
      {/* ────── Abstract Low-Contrast Minimal Background (CSS Curves & Accent Dots) ────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Curved Radial Arc 1 */}
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full border border-white/5 bg-gradient-to-br from-primary/10 to-transparent"
        />
        {/* Curved Radial Arc 2 (Matches reference style) */}
        <div
          className="absolute bottom-[-10%] left-[-20%] w-[700px] h-[700px] rounded-full border border-white/[0.04] bg-white/[0.02]"
        />
        {/* Subtle Accent Dots */}
        <div className="absolute top-[25%] right-[15%] w-2 h-2 rounded-full bg-blue-400/40" />
        <div className="absolute bottom-[35%] right-[25%] w-1.5 h-1.5 rounded-full bg-indigo-300/30" />
        <div className="absolute top-[60%] left-[10%] w-2 h-2 rounded-full bg-primary/30" />
      </div>

      {/* Top Spacer / Optional Tag */}
      <div className="relative z-10">
        <div className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
          PataDev Ke
        </div>
      </div>

      {/* Central Brand Headline & Description */}
      <div className="relative z-10 my-auto py-12 max-w-md">
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-[1.15] whitespace-pre-line mb-6">
          {headline}
        </h2>
        <p className="text-sm lg:text-base text-slate-300 font-normal leading-relaxed max-w-sm">
          {subheadline}
        </p>
      </div>

      {/* Bottom Subtle Message */}
      <div className="relative z-10 pt-6 border-t border-white/10 text-xs text-slate-400 font-medium">
        {footerText}
      </div>

    </div>
  );
}
