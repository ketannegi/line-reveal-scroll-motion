import { useEffect } from "react";
import WorkflowTimeline from "@/components/WorkflowTimeline";
import IndustriesSection from "@/components/IndustriesSection";
import CounterSection from "@/components/CounterSection";
import WhyEnrzySection from "@/components/WhyEnrzySection";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import VideoScrollSection from "@/components/VideoScrollSection";
import VideoScrollScaler from "@/components/VideoScrollScaler";
import EnrzyAboutSection from "@/components/EnrzyAboutSection";
import WorkFlowComponent from "@/components/WorkFlowComponent";

import {
  animateHeroSection,
  animateFeaturesSection,
  animateCounterSection,
  animateWhyEnrzySection,
  animateIndustriesSection,
  animateWorkflowTimeline,
} from "@/animations";
import WorkflowComponent from "@/components/WorkFlowComponent";


const Index = () => {

  useEffect(() => {
    // Initialize animations
    animateHeroSection();
    animateFeaturesSection();
    animateCounterSection();
    animateWhyEnrzySection();
    animateIndustriesSection();
    animateWorkflowTimeline();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection className="hero-section" />
      <VideoScrollScaler />

      <FeaturesSection />
       <EnrzyAboutSection />
      <CounterSection />
      <WhyEnrzySection />
      <IndustriesSection />
      {/* <WorkflowTimeline /> */}
      <WorkflowComponent />
    </div>
  );
};

export default Index;
