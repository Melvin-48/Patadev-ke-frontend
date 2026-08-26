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
    <div className="relative h-full w-full flex flex-col justify-between p-10 lg:p-16 overflow-hidden select-none text-white">
      
      {/* ────── Hero Image Background + Contrast Overlay ────── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/images/landing/patadev-hero.png"
          alt="PataDev Ke Software Marketplace"
          className="w-full h-full object-cover object-center transform scale-105"
        />
        {/* Dark Navy Gradient Overlay for maximum text contrast & legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07152F] via-[#07152F]/85 to-[#07152F]/60" />
      </div>

      {/* Top Spacer */}
      <div className="relative z-10" />

      {/* Central Brand Headline & Description */}
      <div className="relative z-10 my-auto py-12 max-w-md">
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-[1.15] whitespace-pre-line mb-6 drop-shadow-md">
          {headline}
        </h2>
        
        <p className="text-sm lg:text-base text-white font-semibold leading-relaxed max-w-sm drop-shadow-sm opacity-95">
          {subheadline}
        </p>
      </div>

      {/* Bottom Subtle Message */}
      <div className="relative z-10 pt-4 border-t border-white/20 text-xs text-white font-medium drop-shadow-xs opacity-90">
        {footerText}
      </div>

    </div>
  );
}
