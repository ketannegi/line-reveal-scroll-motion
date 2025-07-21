import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../App.css'
// Initialize GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse"
        }
      });

      // Logo animation
      tl.from(".hero-logo", {
        x: -40,
        opacity: 0,
        duration: 0.8
      });

      // Contact button animation
      tl.from(".hero-contact-btn", {
        x: 40,
        opacity: 0,
        duration: 0
      }, "<0.2");

      // Title animations
      tl.from(".hero-title-line", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15
      }, ">0.2");

      // Subtitle animation
      tl.from(".hero-subtitle", {
        y: 40,
        opacity: 0,
        duration: 0.8
      }, ">0.1");
    }, sectionRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <div 
      ref={sectionRef} 
      className={`bg-background  px-6 min-h-[80vh] flex  ${className}`}
    >
      {/* Rest of your JSX remains the same */}
      <div className="max-w-7xl mx-auto w-full">
           {/* Header with Logo and Contact */}
        <div className="flex justify-between items-center mt-10 mb-16">
         <div className="hero-logo flex items-center space-x-2">
              <img
                src="/assets/logo.png" // Replace with your actual image path
                alt="ENRZY Logo"
                className=" object-contain"
              />
         </div>
          
          <button className="hero-contact-btn  text-white px-4 py-2 rounded-full  hover:scale-105 transition-all duration-300">
            Contact Us
          </button>
        </div>
{/* Revolutionize Power Asset Management */}
        {/* Main Hero Content */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="hero-title-line block">
              Revolutionize
            </span>
            <span className="hero-title-line block text-muted-foreground">
              Power{' '}
              <span className="text-foreground">PROSPECTS</span>
            </span>
            
            <span className="hero-title-line block">
              Asset{' '}
              <span className="text-muted-foreground">Management</span>
            </span>
            {/* <span className="hero-title-line block">
              CUSTOMERS
            </span> */}
          </h1>

          <p className="hero-subtitle text-muted-foreground text-lg md:text-xl mt-8 max-w-2xl mx-auto leading-relaxed">
           ENRZY is a cloud-native platform using drones, IoT, and AI to transform how utilities manage their infrastructure — from generation to distribution.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;