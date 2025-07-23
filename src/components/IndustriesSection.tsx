import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, Bot, Shield, Lightbulb, BarChart3, Settings } from 'lucide-react';
import '../App.css';


gsap.registerPlugin(ScrollTrigger);

const industries = [
  {
    id: 1,
    name: "Power Generation",
    image: "./assets/1.jpg",
    description: "RTK-enabled drones, conduct visual, run AI-based images, generate GIS maps, thermal reports."
  },
  {
    id: 2,
    name: "Power Transmission", 
    image: "./assets/2.jpg",
    description: "Drone depolyment, generate digital inspection dashboards and audit-ready reports."
  },
  {
    id: 3,
    name: "Power Distribution",
    image: "./assets/3.jpg", 
    description: "Plan and execute drone flights, AI-powered defect identification and thermal grading."
  },
  {
    id: 4,
    name: "Mobility",
    image: "./assets/4.jpg",
    description: "Define safe flight corridors, capture multi-sensor, condition reports with geo-tagged defect data."
  },
  {
    id: 5,
    name: "Urban Development",
    image: "./assets/4.jpg",
    description: "Conduct drone surveys,overlay land recoreds, detect temporal changes, build thematic maps."
  }
  ,
  {
    id: 6,
    name: "Water Resources",
    image: "./assets/4.jpg",
    description: "High-resolution drone survey of water infrastructure, create 3D terrain and flow models."
  }
  
];

export default function IndustriesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(cardsRef.current, {
        y: 200,
        x: 0,
        opacity: 0
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none play reset",
          markers: false
        }
      });

      tl.to(cardsRef.current, {
        y: 0,
        opacity: 1,
        duration: .8,
        stagger: 0.3,
         ease: 'power3.out',
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4"> 
        <div className="text-center mb-20 ">
           <div className="header-element inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-orange-100 base-color mb-4">
            <CheckCircle className="w-4 h-4 mr-2" />
            Who We Work With
          </div>
          <h2 className="text-4xl md:text-4xl font-semibold text-gray-800 mb-4">
            Built For Diverse Industries
          </h2>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {industries.map((industry, index) => (
           <div
  key={industry.id}
  ref={el => cardsRef.current[index] = el}
  className="relative h-80 rounded-2xl industries-section-card overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-500"
>
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
    style={{ backgroundImage: `url(${industry.image})` }}
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent group-hover:bg-black/50 transition-all duration-500" />

  {/* Content Container */}
  <div className="relative z-10 flex flex-col justify-end h-full p-6">
    {/* Title */}
    <h3 className="text-white text-xl font-bold text-start mb-2 transition-all duration-500 group-hover:mb-4">
      {industry.name}
    </h3>

    {/* Description */}
    <p className="text-gray-200  text-start text-sm leading-relaxed max-h-0 opacity-0 overflow-hidden transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100">
      {industry.description}
    </p>
  </div>
</div>

          ))}
        </div>
      </div>
    </section>
  );
}
