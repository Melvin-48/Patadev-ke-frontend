import LandingNavbar from '../../../components/landing/LandingNavbar';
import HeroSection from '../../../components/landing/HeroSection';
import PartnersCarousel from '../../../components/landing/PartnersCarousel';
import StatsSection from '../../../components/landing/StatsSection';
import PopularServicesSection from '../../../components/landing/PopularServicesSection';
import WhoItsForSection from '../../../components/landing/WhoItsForSection';
import FeaturedProjectsSection from '../../../components/landing/FeaturedProjectsSection';
import AboutUsSection from '../../../components/landing/AboutUsSection';
import HowItWorksSection from '../../../components/landing/HowItWorksSection';
import PricingSection from '../../../components/landing/PricingSection';
import ContactSection from '../../../components/landing/ContactSection';
import TrustIndicator from '../../../components/landing/TrustIndicator';
import FaqSection from '../../../components/landing/FaqSection';
import FinalCTA from '../../../components/landing/FinalCTA';
import LandingFooter from '../../../components/landing/LandingFooter';

/**
 * PataDev Ke — Complete Marketplace Landing Page
 */
export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-white text-[#07152F] overflow-x-hidden">
      
      {/* ── Soft Ambient Decorative Background Blobs ── */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -top-48 -right-48 w-[640px] h-[640px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(23,105,255,0.06) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
        <div
          className="absolute top-[35%] -left-48 w-[520px] h-[520px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-[-100px] right-[10%] w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* ── Page Content ── */}
      <div className="relative z-10">
        <LandingNavbar />
        <main>
          <HeroSection />
          <PartnersCarousel />
          <StatsSection />
          <PopularServicesSection />
          <WhoItsForSection />
          <FeaturedProjectsSection />
          <AboutUsSection />
          <HowItWorksSection />
          <PricingSection />
          <ContactSection />
          <TrustIndicator />
          <FaqSection />
          <FinalCTA />
        </main>
        <LandingFooter />
      </div>
    </div>
  );
}