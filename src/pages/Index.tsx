import WorkflowTimeline from "@/components/WorkflowTimeline";
import IndustriesSection from "@/components/IndustriesSection";
import CounterSection from "@/components/CounterSection";
import WhyEnrzySection from "@/components/WhyEnrzySection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <CounterSection />
      <WhyEnrzySection />
      <IndustriesSection />
      <WorkflowTimeline />
    </div>
  );
};

export default Index;
