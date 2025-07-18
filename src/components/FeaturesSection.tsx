import { useEffect, useRef, useState } from 'react';

const FeaturesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [textOpacity, setTextOpacity] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const textSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (textSectionRef.current) {
        const rect = textSectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementTop = rect.top;
        const elementHeight = rect.height;
        
        // Calculate opacity based on scroll position
        if (elementTop < windowHeight && elementTop + elementHeight > 0) {
          const scrollProgress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight)));
          setTextOpacity(scrollProgress);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      title: "Feature 1",
      description: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard."
    },
    {
      title: "Feature 2", 
      description: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard."
    },
    {
      title: "Feature 3",
      description: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard."
    }
  ];

  return (
    <div className="w-full">
      {/* Features Cards Section */}
      <div ref={sectionRef} className="bg-background py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`text-center p-8 transform transition-all duration-700 ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-12 opacity-0'
                }`}
                style={{
                  transitionDelay: `${index * 200}ms`,
                }}
              >
                <div className="w-16 h-16 bg-muted rounded-lg mx-auto mb-6 flex items-center justify-center">
                  <div className="w-8 h-8 bg-[hsl(var(--workflow-teal))] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">S</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What is ENRZY Section */}
      <div ref={textSectionRef} className="bg-[hsl(var(--workflow-teal))] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-white">
              <p 
                className="text-sm mb-4 transition-opacity duration-500"
                style={{ opacity: Math.max(0.3, textOpacity) }}
              >
                About Us
              </p>
              <h2 
                className="text-3xl md:text-4xl font-bold mb-6 transition-opacity duration-700"
                style={{ opacity: Math.max(0.2, textOpacity * 0.9) }}
              >
                What is ENRZY?
              </h2>
              <p 
                className="text-lg mb-4 leading-relaxed transition-opacity duration-900"
                style={{ opacity: Math.max(0.1, textOpacity * 0.8) }}
              >
                <span className="text-[hsl(var(--workflow-orange))]">Full-service agency</span> delivering 
                personalized digital experiences that will
              </p>
              <p 
                className="text-base mb-6 leading-relaxed transition-opacity duration-1100"
                style={{ opacity: Math.max(0.05, textOpacity * 0.7) }}
              >
                Lorem ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type 
                specimen book.
              </p>
              <button 
                className="bg-[hsl(var(--workflow-orange))] text-white px-8 py-3 rounded-full hover:scale-105 transition-all duration-300"
                style={{ opacity: textOpacity }}
              >
                Learn More →
              </button>
            </div>

            {/* Image/Video Placeholder */}
            <div 
              className="bg-gray-300 rounded-2xl h-80 flex items-center justify-center transition-opacity duration-700"
              style={{ opacity: textOpacity }}
            >
              <div className="w-16 h-16 bg-[hsl(var(--workflow-teal))] rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">S</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;