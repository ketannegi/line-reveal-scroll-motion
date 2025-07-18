import { useEffect, useRef, useState } from 'react';

const WhyEnrzySection = () => {
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

  const features = [
    {
      icon: "🤖",
      title: "Smart automation",
      description: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard.",
      color: "bg-[hsl(var(--workflow-orange))]"
    },
    {
      icon: "📊",
      title: "Predictive analytics",
      description: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard.",
      color: "bg-purple-500"
    },
    {
      icon: "📈",
      title: "Predictive analytics",
      description: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard.",
      color: "bg-purple-400"
    },
    {
      icon: "🧠",
      title: "Adaptive learning",
      description: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard.",
      color: "bg-green-500"
    },
  ];

  return (
    <div ref={sectionRef} className="bg-background py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          className={`mb-12 transform transition-all duration-700 ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <p className="text-sm text-muted-foreground mb-2">Are You</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why ENRZY?</h2>
        </div>

        {/* Video/Image Placeholder */}
        <div
          className={`relative bg-gray-200 rounded-2xl h-64 md:h-96 mb-16 flex items-center justify-center transform transition-all duration-700 ${
            isVisible
              ? 'translate-y-0 opacity-100 scale-100'
              : 'translate-y-8 opacity-0 scale-95'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="w-16 h-16 bg-[hsl(var(--workflow-teal))] rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">S</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`text-center transform transition-all duration-700 ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
              style={{
                transitionDelay: `${600 + index * 200}ms`,
              }}
            >
              <div className={`w-12 h-12 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyEnrzySection;