import { useEffect, useRef, useState } from 'react';

const industries = [
  {
    id: 1,
    name: "Technology Solutions",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    delay: 0
  },
  {
    id: 2,
    name: "Infrastructure Services",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2672&q=80",
    delay: 200
  },
  {
    id: 3,
    name: "Energy & Utilities",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    delay: 400
  },
  {
    id: 4,
    name: "Manufacturing",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    delay: 600
  }
];

export default function IndustriesSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = parseInt(entry.target.getAttribute('data-card-id') || '0');
            
            // Add cards with staggered timing
            setTimeout(() => {
              setVisibleCards(prev => [...new Set([...prev, cardId])]);
            }, industries.find(i => i.id === cardId)?.delay || 0);
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-workflow-gray text-sm uppercase tracking-wider mb-2">
            What we Do?
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Built For Diverse Industries
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry, index) => {
            const isVisible = visibleCards.includes(industry.id);
            
            return (
              <div
                key={industry.id}
                ref={(el) => cardRefs.current[index] = el}
                data-card-id={industry.id}
                className={`group relative h-80 rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-700 ease-out ${
                  isVisible 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-8 scale-95'
                }`}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${industry.image})`
                  }}
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-300" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  {/* Logo/Icon */}
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-workflow-teal rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:bg-workflow-orange">
                      <span className="text-white font-bold text-xl">S</span>
                    </div>
                  </div>
                  
                  {/* Service Name */}
                  <div className="text-center">
                    <h3 className="text-white text-xl font-semibold group-hover:text-workflow-orange-light transition-colors duration-300">
                      {industry.name}
                    </h3>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-workflow-orange rounded-2xl transition-all duration-300" />
                
                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom decorative element */}
        <div className="flex justify-center mt-16">
          <div className="flex space-x-2">
            {industries.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-500 ${
                  visibleCards.length > index 
                    ? 'w-8 bg-workflow-orange' 
                    : 'w-2 bg-workflow-line'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}