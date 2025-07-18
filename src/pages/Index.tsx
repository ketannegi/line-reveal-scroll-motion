import WorkflowTimeline from "@/components/WorkflowTimeline";
import IndustriesSection from "@/components/IndustriesSection";
import StatsSection from "@/components/StatsSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <IndustriesSection />
      <StatsSection />
      <WorkflowTimeline />
    </div>
  );
};

export default Index;
