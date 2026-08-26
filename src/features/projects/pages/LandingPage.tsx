import LandingNavbar from '../../../components/landing/LandingNavbar';
import HeroSection from '../../../components/landing/HeroSection';
import HowItWorksSection from '../../../components/landing/HowItWorksSection';
import StatsSection from '../../../components/landing/StatsSection';

/**
 * LandingPage — public home page.
 *
 * Structure:
 * 1. LandingNavbar (fixed floating pill on scroll)
 * 2. HeroSection (centered hero with typewriter animation & integrated bottom partners ticker)
 * 3. HowItWorksSection (client/dev workflow tabs)
 * 4. StatsSection (animated metric count-up counters)
 */
export default function LandingPage() {
  return (
    /* ── Page-level glassmorphism canvas ── */
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background:
          'linear-gradient(150deg, #C7DCFF 0%, #D6E8FF 18%, #EAF2FF 40%, #F0F6FF 65%, #E8F0FE 100%)',
      }}
    >
      {/* ── Fixed decorative blobs — give glass panels something to blur through ── */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Top-right large warm-blue */}
        <div
          className="absolute -top-48 -right-48 w-[720px] h-[720px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99,179,237,0.45) 0%, transparent 65%)',
            filter: 'blur(90px)',
          }}
        />
        {/* Mid-left indigo accent */}
        <div
          className="absolute top-[30%] -left-56 w-[560px] h-[560px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Bottom-right sky accent */}
        <div
          className="absolute bottom-[-80px] right-[15%] w-[480px] h-[480px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(56,189,248,0.30) 0%, transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Centre subtle navy depth */}
        <div
          className="absolute top-[50%] left-[40%] w-[320px] h-[320px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(23,105,255,0.10) 0%, transparent 65%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* ── Page content (z-index above blobs) ── */}
      <div className="relative z-10">
        <LandingNavbar />
        <HeroSection />
        <HowItWorksSection />
        <StatsSection />
      </div>
    </div>
  );
}