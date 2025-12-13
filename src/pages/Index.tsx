import { useEffect } from "react";
import LandingSection from "@/components/sections/LandingSection";
import HowWeMetSection from "@/components/sections/HowWeMetSection";
import OurJourneySection from "@/components/sections/OurJourneySection";
import WhyILoveYouSection from "@/components/sections/WhyILoveYouSection";
import ProposalSection from "@/components/sections/ProposalSection";
import LoveLetterSection from "@/components/sections/LoveLetterSection";
import BirthdaySurpriseSection from "@/components/sections/BirthdaySurpriseSection";

const Index = () => {
  useEffect(() => {
    document.title = "Happy Birthday, My Love ✨";
    
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";
    
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <main className="relative overflow-x-hidden">
      {/* Page 1: Magical Landing */}
      <LandingSection />
      
      {/* Page 2: How We Met - Interactive Story Cards */}
      <HowWeMetSection />
      
      {/* Page 3: Our Journey - Horizontal Timeline */}
      <OurJourneySection />
      
      {/* Page 4: Why I Love You - Floating Hearts */}
      <WhyILoveYouSection />
      
      {/* Page 5: Proposal Ring - Cinematic Moment */}
      <ProposalSection />
      
      {/* Page 6: Love Letter - Pull to Open */}
      <LoveLetterSection />
      
      {/* Page 7: Birthday Surprise - Celebration */}
      <BirthdaySurpriseSection />
    </main>
  );
};

export default Index;
