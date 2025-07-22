import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../App.css';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoBoxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const videoBox = videoBoxRef.current;
    const video = videoRef.current;
    if (!section || !videoBox || !video) return;

    const ctx = gsap.context(() => {
      // Entrance animation for hero content
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play reverse play reverse"
        },
      });

      tl.from(".hero-logo", { x: -40, opacity: 0, duration: 0.8 });
      tl.from(".hero-title-line", { y: 60, opacity: 0, duration: 0.8, stagger: 0.15 }, ">0.2");
      tl.from(".hero-subtitle", { y: 40, opacity: 0, duration: 0.8 }, ">0.1");
      tl.from(".hero-video-container", { y: 60, opacity: 0, scale: 0.8, duration: 1, ease: 'back.out(1.7)' }, ">0.2");

      // Set initial video box properties
      gsap.set(videoBox, {
        width: 280,
        height: 180,
        borderRadius: 12,
        transformOrigin: "center center"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={sectionRef}
      className={`hero-section bg-background px-6 min-h-screen flex flex-col relative ${className}`}
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mt-10 mb-16">
          <div className="hero-logo flex items-center space-x-2">
            <img src="/assets/logo.png" alt="ENRZY Logo" className="object-contain" />
          </div>
          <button className="hero-contact-btn bg-orange-500 text-white px-6 py-2 rounded-full hover:scale-105 transition-all duration-300">
            Contact Us
          </button>
        </div>

        {/* Main Content */}
        <div className="text-center max-w-5xl mx-auto flex-1 flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="hero-title-line block">FROM</span>
            <span className="hero-title-line block text-muted-foreground">
              FINDING <span className="text-foreground">PROSPECTS</span>
            </span>
            <span className="hero-title-line block">
              TO <span className="text-muted-foreground">CONVERTING</span>
            </span>
            <span className="hero-title-line block">
              THEM INTO <span className="text-muted-foreground">PAYING</span>
            </span>
            <span className="hero-title-line block">CUSTOMERS</span>
          </h1>

          <p className="hero-subtitle text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-16">
            ENRZY empowers utilities to detect faults early, automate maintenance, and visualize every asset in 3D — ensuring higher uptime, lower risk, and smarter decisions.
          </p>
        </div>

        {/* Video Box at Bottom */}
        <div className="hero-video-container flex justify-center items-end pb-12">
          <div
            ref={videoBoxRef}
            className="hero-video-box bg-black rounded-lg overflow-hidden shadow-2xl cursor-pointer relative"
            id="hero-video-box"
          >
            <video
              ref={videoRef}
              src="/assets/enrzy.mp4"
              muted
              playsInline
              loop
              autoPlay
              className="w-full h-full object-cover"
            />
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-10 transition-all duration-300">
              <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;