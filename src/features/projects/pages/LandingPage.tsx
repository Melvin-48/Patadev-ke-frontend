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
 * PataDev Ke — Complete Marketplace Landing Page (Clean, No Overlays)
 */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-[#07152F] overflow-x-hidden">
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
  );
}