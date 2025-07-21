import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../App.css';


gsap.registerPlugin(ScrollTrigger);

const WhyEnrzySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 45%',
            toggleActions: "play reset play reverse",
        },
      });

      // Title animation
      tl.from('.why-title', {
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      });

      // Underline animation
      tl.from('.why-underline', {
        width: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
      }, '-=0.3');

      // Image animation
      tl.from('.why-image', {
        y: 80,
        scale: 0.95,
        opacity: 0,
        rotate: 5,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.2');

      // Cards animation
      tl.from('.why-card', {
        y:  200,
        x: -30,
        opacity: 0,
        stagger: .5,
        duration: 1,
        ease: 'power3.out',
      }, '-=0.2');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: "./assets/automate.svg",
      title: "Advanced AI Detection",
      description: "Identify defects like corrosion, cracks, and vegetation encroachment with unparalleled accuracy.",
      color: "bg-[hsl(var(--workflow-orange))]"
    },
    {
      icon: "./assets/predictive.svg",
      title: "Integrated Workflows",
      description: "Convert detected faults into actionable tasks, ensuring streamlined repairs.",
      color: "bg-[hsl(var(--workflow-orange))]"
    },
    {
      icon: "./assets/predictive.svg",
      title: "Comprehensive Data Fusion",
      description: "Combine visual, thermal, and LiDAR data for a holistic view of assets.",
      color: "bg-[hsl(var(--workflow-orange))]"
    },
    {
      icon: "./assets/adaptive.svg",
      title: "Digital Twins",
      description: "Create photorealistic 3D models for remote inspections and better decision-making.",
      color: "bg-[hsl(var(--workflow-orange))]"
    },
  ];

  return (
    <div ref={sectionRef} className="bg-background section-padding px-6 overflow-hidden ">
      <div className="max-w-6xl  mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="relative">
            
            <h2 className="why-title text-start text-3xl md:text-4xl font-bold text-foreground relative z-10">
              Why ENRZY?
            </h2>
            
          </div>
        </div>

        {/* Image/Video Placeholder */}
        <div className="why-image relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-64 md:h-96  flex items-center justify-center shadow-lg">
         
             <img
            src="/assets/why-enrzy.webp"
            alt="Descriptive alt text for your section image"
            className="w-full h-full object-cover rounded-md object-center"
          />
         
          <div 
            className="absolute inset-0 rounded-2xl border-2 border-transparent "
            style={{ backgroundClip: 'padding-box', transitionDelay: '200ms' }}
          />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="why-card group text-center cursor-pointer">
              <div className="relative  transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className={`w-12 h-12 ${feature.color} rounded-full flex  justify-center  mb-4 text-white text-xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12`}>
                 
                  <img
                  src={feature.icon}                
                alt="ENRZY Logo"
                className=" object-contain"
              />
                </div>
                <h3 className="section-heading text-start font-semibold mb-3 text-foreground group-hover:text-[hsl(var(--workflow-orange))] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="font-medium text-muted-foreground text-start leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[hsl(var(--workflow-orange))]/10 to-purple-500/10 rounded-full blur-xl opacity-20 scale-100" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-green-500/10 rounded-full blur-xl opacity-20 scale-100" />
        </div>
      </div>
    </div>
  );
};

export default WhyEnrzySection;


