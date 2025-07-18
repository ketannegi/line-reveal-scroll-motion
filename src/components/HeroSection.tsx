import { useEffect, useRef, useState } from 'react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="bg-background py-20 px-6 min-h-[80vh] flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header with Logo and Contact */}
        <div className="flex justify-between items-center mb-16">
          <div
            className={`flex items-center space-x-2 transform transition-all duration-700 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
            }`}
          >
            <div className="w-8 h-8 bg-[hsl(var(--workflow-teal))] rounded flex items-center justify-center">
              <span className="text-white text-sm font-bold">E</span>
            </div>
            <span className="text-xl font-bold text-foreground">ENRZY</span>
          </div>
          
          <button
            className={`bg-[hsl(var(--workflow-orange))] text-white px-6 py-2 rounded-full hover:bg-[hsl(var(--workflow-orange))] hover:scale-105 transition-all duration-300 transform ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Contact Us
          </button>
        </div>

        {/* Main Hero Content */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span
              className={`block transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              FROM
            </span>
            <span
              className={`block text-muted-foreground transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              FINDING{' '}
              <span className="text-foreground">PROSPECTS</span>
            </span>
            <span
              className={`block transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              TO CONVERTING
            </span>
            <span
              className={`block transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '1000ms' }}
            >
              THEM INTO{' '}
              <span className="text-muted-foreground">PAYING</span>
            </span>
            <span
              className={`block transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '1200ms' }}
            >
              CUSTOMERS
            </span>
          </h1>

          <p
            className={`text-muted-foreground text-lg md:text-xl mt-8 max-w-2xl mx-auto leading-relaxed transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '1400ms' }}
          >
            ENRZY empowers utilities to detect faults early, automate maintenance, and
            visualize every asset in 3D — ensuring higher uptime, lower risk, and smarter
            decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;