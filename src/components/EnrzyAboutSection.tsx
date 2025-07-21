import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, Bot, Shield, Lightbulb, BarChart3, Settings } from 'lucide-react';

import '../App.css';

gsap.registerPlugin(ScrollTrigger);

interface EnrzyAboutSectionProps {
  className?: string;
}

const EnrzyAboutSection: React.FC<EnrzyAboutSectionProps> = ({ className = '' }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

 useEffect(() => {
  if (!sectionRef.current) return;

  const ctx = gsap.context(() => {
    // Reset styles
    gsap.set([contentRef.current, imageRef.current], {
      opacity: 0,
      y: 80,
    });

    gsap.set(textRefs.current, {
      opacity: 0,
      y: 30,
      color: '#F38D26',
    });

    // Header and image animation with ScrollTrigger (repeats)
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        ease: 'power3.out',
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    gsap.fromTo(
      imageRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        ease: 'power3.out',
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Paragraph animations (already correct)
    textRefs.current.forEach((el, i) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            color: '#F38D26',
            delay: i * 0.1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    // Optional: Scroll-progress-based highlight
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top center',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        textRefs.current.forEach((textRef) => {
          if (textRef) {
            gsap.to(textRef, {
              color: progress > 0.5 ? '#F38D26' : '#F38D26',
              fontWeight: 600,
              duration: 0.3,
              overwrite: 'auto',
            });
          }
        });
      },
    });
  }, sectionRef);

  return () => ctx.revert();
}, []);



  return (
    <div 
      ref={sectionRef}
      className={`  min-h-screen  bg-gray-100 py-20 px-4 ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-teal-700 rounded-3xl p-12 shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Content */}
            <div ref={contentRef} className="space-y-8">
              {/* About Us Badge */}
              <div className="inline-flex w-full items-center space-x-2 rounded-full px-0 py-2">
                  <div className="header-element inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-orange-100 text-orange-600 mb-4">
            <CheckCircle className="w-4 h-4 mr-2" />
            About Us
          </div>
                {/* <span className="text-white text-sm font-medium text-start">About Us</span> */}
              </div>

              {/* Heading */}
             <h2
  className="text-4xl lg:text-5xl font-bold text-white leading-tight mt-0 text-start transition-all duration-500"
style={{ marginTop: '0' }}>
  What Is ENRZY?
</h2>

              {/* Paragraphs */}
              <div className="space-y-6 text-lg text-start">
                <p
                  ref={(el) => (textRefs.current[0] = el)}
                  className="leading-relaxed transition-colors duration-300"
                >
                  <span className="text-orange-400 font-semibold ">Advance analytics software redefining power asset management. From asset maintenance to predictive analytics and supply chain optimization.</span>
                </p>
                <p
                  ref={(el) => (textRefs.current[1] = el)}
                  className="leading-relaxed transition-colors duration-300"
                >
                  <span className="text-orange-400 font-semibold "> ENRZY empowers you to make informed decisions and achieve operational excellence.</span>
                </p>
                <p
                  ref={(el) => (textRefs.current[2] = el)}
                  className="leading-relaxed transition-colors duration-300"
                >
                 ENRZ simplifies asset management with its cloud-based platform, turning raw data into actionable insights. Here’s how:
                </p>
                <p
                  ref={(el) => (textRefs.current[3] = el)}
                  className="leading-relaxed transition-colors duration-300 uppercase font-extrabold"
                >
                 INTEGRATE, Analyze, Collaborate, Deliver  
                </p>
                {/* <p
                  ref={(el) => (textRefs.current[4] = el)}
                  className="leading-relaxed transition-colors duration-300"
                >
                  We create seamless, high-performance dev solutions tailored to your needs.
                </p> */}
              </div>
            </div>

            {/* Right Side Image */}
            <div ref={imageRef} className="flex justify-center">
              <div className="w-full   bg-gray-300 rounded-2xl shadow-lg overflow-hidden">
                <div className="w-full  bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center">
                  <div className="text-gray-600 text-center w-full">
                    
                      <img src="./assets/what-enrzy.webp" className='aboutsection-img' alt="" style={{width: '100%', height:'100%'}} />
                      
                  
                    {/* <p className="text-sm">Image Placeholder</p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrzyAboutSection;
