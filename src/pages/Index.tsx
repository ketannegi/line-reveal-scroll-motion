import WorkflowTimeline from "@/components/WorkflowTimeline";
import IndustriesSection from "@/components/IndustriesSection";
import CounterSection from "@/components/CounterSection";
import WhyEnrzySection from "@/components/WhyEnrzySection";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import VideoScrollSection from "@/components/VideoScrollSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <VideoScrollSection />
      <FeaturesSection />
      <CounterSection />
      <WhyEnrzySection />
      <IndustriesSection />
      <WorkflowTimeline />
    </div>
  );
};

export default Index;
