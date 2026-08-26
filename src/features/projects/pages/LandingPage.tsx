import LandingNavbar from '../../../components/landing/LandingNavbar';
import HeroSection from '../../../components/landing/HeroSection';
import AboutUsSection from '../../../components/landing/AboutUsSection';
import PopularServicesSection from '../../../components/landing/PopularServicesSection';
import HowItWorksSection from '../../../components/landing/HowItWorksSection';
import PricingSection from '../../../components/landing/PricingSection';
import FaqSection from '../../../components/landing/FaqSection';
import LandingFooter from '../../../components/landing/LandingFooter';

/**
 * LandingPage — Clean White Background Theme with Glassmorphic Cards
 */
export default function LandingPage() {
  return (
    /* ── Page-level Clean White Canvas ── */
    <div className="relative min-h-screen bg-[#FAFCFF] text-[#07152F] overflow-x-hidden">
      
      {/* ── Soft Ambient Decorative Background Blobs ── */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Top-right soft blue glow */}
        <div
          className="absolute -top-48 -right-48 w-[640px] h-[640px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(23,105,255,0.08) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
        {/* Mid-left indigo accent */}
        <div
          className="absolute top-[35%] -left-48 w-[520px] h-[520px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Bottom sky accent */}
        <div
          className="absolute bottom-[-100px] right-[10%] w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* ── Page content (z-index above blobs) ── */}
      <div className="relative z-10">
        <LandingNavbar />
        <HeroSection />
        <AboutUsSection />
        <PopularServicesSection />
        <HowItWorksSection />
        <PricingSection />
        <FaqSection />
        <LandingFooter />
      </div>
    </div>
  );
}