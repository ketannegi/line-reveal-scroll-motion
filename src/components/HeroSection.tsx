import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../App.css'; // Optional: any global styles

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
      // Entrance animation
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

      // Scroll-triggered video box transformation
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=150%",
          scrub: true,
          pin: true,
          pinSpacing: false,
          onEnter: () => {
            if (video.paused) {
              video.play().catch(() => {}); // handle autoplay issues gracefully
            }
          },
          onLeaveBack: () => {
            video.pause();
            video.currentTime = 0;
          }
        },
      }).to(videoBox, {
        scale: 3,
        y: 300,
        ease: "power2.out",
        transformOrigin: "center center"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={sectionRef}
      className={`hero-section bg-background px-6 min-h-screen flex flex-col ${className}`}
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
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="hero-title-line block">Revolutionize</span>
            <span className="hero-title-line block text-muted-foreground">
              Power <span className="text-foreground">PROSPECTS</span>
            </span>
            <span className="hero-title-line block">
              Asset <span className="text-muted-foreground">Management</span>
            </span>
          </h1>

          <p className="hero-subtitle text-gray-600 text-lg md:text-xl mt-8 max-w-2xl mx-auto leading-relaxed mb-16">
            ENRZY empowers utilities to detect faults early, automate maintenance, and visualize every asset in 3D — ensuring higher uptime, lower risk, and smarter decisions.
          </p>

          {/* Video Box Section */}
          <div className="hero-video-container flex justify-center relative h-[100vh]">
            <div
              ref={videoBoxRef}
              className="hero-video-box absolute w-64 h-40 bg-black rounded-lg overflow-hidden shadow-lg cursor-pointer"
              id="hero-video-box"
              style={{
                top: '80%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                transformOrigin: 'center center',
                zIndex: 20
              }}
            >
              <video
                ref={videoRef}
                src="/assets/sample.mp4"
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
