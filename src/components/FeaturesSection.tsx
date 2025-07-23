import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../App.css';


// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// Dummy data for features (replace with your actual data)
const featuresData = [
  {
    id: 1,
    name: "DataGuard",
    description: "A robust data validation process that ensures only high-quality inputs make it to analysis. Any substandard data triggers a re-upload, maintaining the highest accuracy standards for decision-making and reporting.",
    icon: (
      <div className="w-16 h-16 bg-base rounded-xl flex items-center justify-center text-white text-2xl font-bold">
        {/* Placeholder for an actual icon, e.g., using Lucide React or an SVG */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
      </div>
    ),
  },
  {
    id: 2,
    name: "TowerView 360",
    description: "Experience unparalleled reporting with 3D virtual tower visualization. Dive into defect details and inspection data with an immersive, interactive experience designed to simplify asset analysis and decision-making.",
    icon: (
      <div className="w-16 h-16 bg-base rounded-xl flex items-center justify-center text-white text-2xl font-bold">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.78 1.25a2 2 0 0 0 .73 2.73l.09.09a2 2 0 0 1 .73 1l0 .25a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.78 1.25a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.78-1.25a2 2 0 0 0-.73-2.73l-.09-.09a2 2 0 0 1-.73-1l0-.25a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.78-1.25a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
      </div>
    ),
  },
  {
    id: 3,
    name: "DashPersona",
    description: "Empower every team member with a personalized dashboard tailored to their role. Access relevant data and insights quickly, enabling efficient decision-making across teams.",
    icon: (
      <div className="w-16 h-16 bg-base rounded-xl flex items-center justify-center text-white text-2xl font-bold">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cloud"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>
      </div>
    ),
  },
  {
    id: 4,
    name: "FixTrack",
    description: "Streamline defect management by integrating before-and-after repair images. Track, verify, and document maintenance processes seamlessly for improved transparency and accountability.",
    icon: (
      <div className="w-16 h-16 bg-base rounded-xl flex items-center justify-center text-white text-2xl font-bold">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cloud"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>
      </div>
    ),
  },
];

const FeaturesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial hidden state for cards (moved from bottom and transparent)
      gsap.set(cardsRef.current, {
        y: 80, // Start 80px below their final position
        opacity: 0, // Start fully transparent
      });

      // Create animation timeline for cards entering view
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // Animation starts when the top of the section hits 80% down the viewport
          end: "bottom 20%", // Animation ends when the bottom of the section hits 20% down the viewport
          toggleActions: "play none play reverse", // Play on enter, reset on leave (for re-triggering on scroll up)
          markers: false, // Set to true to debug trigger points
        },
      });

      // Add staggered animations to bring cards into view
      tl.to(cardsRef.current, {
        y: 0, // Animate to their original y position
        opacity: 1, // Animate to fully opaque
        duration: 0.7, // Duration of each card's animation
        stagger: 0.15, // Stagger the animation of each card by 0.15 seconds
        ease: "power3.out", // Easing function for a smooth finish
      });

    }, sectionRef); // GSAP context for proper cleanup

    // Cleanup function to revert all GSAP animations and ScrollTriggers
    return () => ctx.revert();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <section ref={sectionRef} className="box-move-top py-0  min-h-screen flex items-center   font-inter">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, index) => (
            <div
              key={feature.id}
              ref={el => cardsRef.current[index] = el}
              className="bg-gray-100 rounded-2xl px-6 py-8 shadow-lg flex flex-col  transition-all duration-300 hover:shadow-xl hover:bg-gray-200 text-start "
            >
              <div className="mb-6 text-start">
                {feature.icon} {/* Render the icon component */}
              </div>
              <h3 className="text-2xl  text-start font-semibold text-gray-900 mb-3">
                {feature.name}
              </h3>
              <p className="text-gray-700  text-start leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
