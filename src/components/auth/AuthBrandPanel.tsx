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
    <div className="relative h-full w-full flex flex-col justify-between p-10 lg:p-16 overflow-hidden select-none">
      
      {/* ────── Image Background + Sleek Overlay Gradient ────── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/images/auth-bg.png"
          alt="PataDev Software Marketplace"
          className="w-full h-full object-cover object-center transform scale-105"
        />
        {/* Dark Royal Navy Gradient Overlay for optimal text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07152F] via-[#07152F]/75 to-[#07152F]/40 backdrop-blur-[2px]" />
      </div>

      {/* Top Tagline */}
      <div className="relative z-10">
        <span className="text-xs font-bold tracking-widest text-blue-300 uppercase">
          PataDev Ke
        </span>
      </div>

      {/* Central Brand Headline & Description */}
      <div className="relative z-10 my-auto py-12 max-w-md">
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-[1.15] whitespace-pre-line mb-6 drop-shadow-sm">
          {headline}
        </h2>
        
        <p className="text-sm lg:text-base text-slate-200 font-medium leading-relaxed max-w-sm drop-shadow-xs">
          {subheadline}
        </p>
      </div>

      {/* Bottom Subtle Message */}
      <div className="relative z-10 pt-4 border-t border-white/15 text-xs text-slate-300 font-medium">
        {footerText}
      </div>

    </div>
  );
}
