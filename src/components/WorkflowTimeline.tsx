import { useEffect, useRef, useState } from 'react';
import { 
  Camera, 
  Database, 
  Brain, 
  BarChart3, 
  Settings,
  Plane,
  Layers,
  Cpu,
  FileText,
  Wrench
} from 'lucide-react';

const workflowSteps = [
  {
    id: 1,
    title: "Data Capture",
    description: "Drones capture high-resolution 3D visual, thermal imagery, IoT sensors track real-time field parameters like temperature, load, vibration.",
    icon: Plane,
    position: "right"
  },
  {
    id: 2,
    title: "Data Validation & Integration", 
    description: "Automated verification and geo-tagging of drone and sensor data. Synced to ENRZY cloud for processing.",
    icon: Layers,
    position: "left"
  },
  {
    id: 3,
    title: "AI-Enabled Processing",
    description: "Detects: Vegetation overgrowth • Corrosion or hotspots • Missing or damaged components • Sag and clearance issues Tags.",
    icon: Cpu,
    position: "right"
  },
  {
    id: 4,
    title: "Interactive Reporting",
    description: "3D dashboards with filters Custom PDF/Excel reports with annotated visuals Asset-wise health scoring and summaries.",
    icon: BarChart3,
    position: "left"
  },
  {
    id: 5,
    title: "Maintenance Ticketing",
    description: "Auto-ticket generation for every critical issue Task assignment and after-repair image upload by technician Dashboard reflects.",
    icon: Wrench,
    position: "right"
  }
];

export default function WorkflowTimeline() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const stepId = parseInt(entry.target.getAttribute('data-step-id') || '0');
          if (entry.isIntersecting) {
            setVisibleSteps(prev => [...new Set([...prev, stepId])]);
          }
        });
      },
      { 
        threshold: 0.3,
        rootMargin: '-100px 0px -100px 0px'
      }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = rect.top;
      const containerHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress within the container
      const scrollProgress = Math.max(0, Math.min(1, 
        (windowHeight - containerTop) / (containerHeight + windowHeight)
      ));

      setTimelineProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background py-20">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-workflow-gray text-sm uppercase tracking-wider mb-2">How we work</p>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          ENRZY Workflow
        </h1>
      </div>

      {/* Timeline Container */}
      <div ref={containerRef} className="relative max-w-6xl mx-auto px-4">
        {/* Central Timeline Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-workflow-line transform -translate-x-1/2">
          <div 
            ref={timelineRef}
            className="w-full bg-gradient-to-b from-workflow-orange to-workflow-teal transition-all duration-1000 ease-out"
            style={{ 
              height: `${timelineProgress * 100}%`,
              boxShadow: '0 0 20px hsl(var(--workflow-orange) / 0.5)'
            }}
          />
        </div>

        {/* Timeline Steps */}
        <div className="space-y-32">
          {workflowSteps.map((step, index) => {
            const isVisible = visibleSteps.includes(step.id);
            const Icon = step.icon;
            
            return (
              <div
                key={step.id}
                ref={(el) => stepRefs.current[index] = el}
                data-step-id={step.id}
                className={`relative flex items-center ${
                  step.position === 'left' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Content Card */}
                <div 
                  className={`w-1/2 ${step.position === 'left' ? 'pl-16' : 'pr-16'} ${
                    isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
                  } transition-all duration-700 delay-300`}
                >
                  <div className="bg-card rounded-xl p-8 shadow-card border border-border/50 hover:shadow-icon transition-all duration-300 group">
                    <div className="flex items-start gap-4">
                      <div className="bg-workflow-orange-light p-3 rounded-lg group-hover:bg-workflow-orange group-hover:text-white transition-colors duration-300">
                        <Icon className="w-6 h-6 text-workflow-orange group-hover:text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground mb-3">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center Icon */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <div 
                    className={`w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-icon border-4 border-background ${
                      isVisible ? 'animate-icon-bounce' : 'scale-0'
                    } transition-all duration-500`}
                    style={{ animationDelay: isVisible ? '200ms' : '0ms' }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Step Number */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-workflow-teal text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                    {step.id}
                  </div>
                </div>

                {/* Connecting Line */}
                <div 
                  className={`absolute top-1/2 ${
                    step.position === 'left' ? 'right-1/2 mr-8' : 'left-1/2 ml-8'
                  } w-8 h-0.5 bg-workflow-line ${
                    isVisible ? 'animate-timeline-grow' : 'w-0'
                  } transition-all duration-500`}
                  style={{ animationDelay: isVisible ? '400ms' : '0ms' }}
                />

                {/* Step Label */}
                <div 
                  className={`absolute ${
                    step.position === 'left' ? 'right-full mr-24' : 'left-full ml-24'
                  } top-1/2 transform -translate-y-1/2 ${
                    isVisible ? 'animate-fade-in-up' : 'opacity-0'
                  } transition-all duration-500`}
                  style={{ animationDelay: isVisible ? '600ms' : '0ms' }}
                >
                  <div className="bg-workflow-orange text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
                    Step {step.id}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Avatar */}
        <div className="mt-20 flex justify-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-icon animate-pulse-glow">
            <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-workflow-orange rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}