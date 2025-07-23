import { useEffect } from "react";
import WorkflowTimeline from "@/components/WorkflowTimeline";
import IndustriesSection from "@/components/IndustriesSection";
import CounterSection from "@/components/CounterSection";
import WhyEnrzySection from "@/components/WhyEnrzySection";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";


import EnrzyAboutSection from "@/components/EnrzyAboutSection";
import WorkFlowComponent from "@/components/WorkFlowComponent";
import Footer from "@/components/Footer";
import VideoScrollScaler from "@/components/VideoScrollScaler";




const Index = () => {

  useEffect(() => {
    // Note: Individual components now handle their own animations
    // No need to call external animations that conflict with component-level GSAP
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection  />
      {/* <VideoScrollScaler/> */}
      <FeaturesSection />
       <EnrzyAboutSection />
      <CounterSection />
      <WhyEnrzySection />
      <IndustriesSection />
      <WorkFlowComponent />
      <Footer />
    </div>
  );
};

export default Index;
