import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VideoScrollScaler: React.FC = () => {
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoBoxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoWrapper = videoWrapperRef.current;
    const videoBox = videoBoxRef.current;
    const video = videoRef.current;
    const heroVideoBox = document.getElementById('hero-video-box');

    if (!videoWrapper || !videoBox || !video || !heroVideoBox) return;

    const ctx = gsap.context(() => {
      // Get viewport dimensions
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Calculate 80% max size
      const maxWidth = vw * 0.8;
      const maxHeight = vh * 0.8;

      // Set initial state - match hero video box position
      gsap.set(videoBox, {
        width: 280,
        height: 180,
        borderRadius: 12,
        transformOrigin: "center center",
        position: "fixed",
        top: "calc(100vh - 220px)", // Start at bottom of hero
        left: "50%",
        x: "-50%",
        y: 0,
        zIndex: 50
      });

      // Hide hero video when scroll starts
      ScrollTrigger.create({
        trigger: videoWrapper,
        start: "top bottom",
        end: "top 80%",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          if (heroVideoBox) {
            heroVideoBox.style.opacity = String(1 - progress);
          }
        }
      });

      // Main scaling and movement animation
      const scaleTl = gsap.timeline({
        scrollTrigger: {
          trigger: videoWrapper,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            
            // Start video when reaching 80% scale (around 80% progress)
            if (progress >= 0.8 && video.paused) {
              video.play().catch(() => {});
            } else if (progress < 0.8 && !video.paused) {
              video.pause();
            }
          },
          onLeave: () => {
            video.pause();
          },
          onEnterBack: () => {
            // Resume based on progress
            const progress = ScrollTrigger.getById(scaleTl.scrollTrigger.id)?.progress || 0;
            if (progress >= 0.8 && video.paused) {
              video.play().catch(() => {});
            }
          },
          onLeaveBack: () => {
            video.pause();
          }
        }
      });

      // Animate movement and scaling
      scaleTl.to(videoBox, {
        width: maxWidth,
        height: maxHeight,
        top: "50%",
        y: "-50%",
        borderRadius: 8,
        duration: 1,
        ease: "power2.out"
      });

      // Handle window resize
      const handleResize = () => {
        const newVw = window.innerWidth;
        const newVh = window.innerHeight;
        const newMaxWidth = newVw * 0.8;
        const newMaxHeight = newVh * 0.8;
        
        // Update initial position
        gsap.set(videoBox, {
          top: "calc(100vh - 220px)"
        });
        
        // Update the animation end values
        scaleTl.invalidate();
        scaleTl.to(videoBox, {
          width: newMaxWidth,
          height: newMaxHeight,
          top: "50%",
          y: "-50%",
          borderRadius: 8,
          duration: 1,
          ease: "power2.out"
        });
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };

    }, videoWrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={videoWrapperRef}
      className="video-scroll-section relative min-h-[300vh] bg-gray-50 overflow-hidden"
      style={{ zIndex: 10 }}
    >
      <div
        ref={videoBoxRef}
        className="video-scaling-box bg-gray-900 shadow-2xl overflow-hidden transition-all duration-300"
      >
        <video
          ref={videoRef}
          src="/assets/enrzy.mp4"
          muted
          playsInline
          loop
          className="w-full h-full object-cover"
          style={{ 
            filter: 'brightness(1.1) contrast(1.05)',
          }}
        />
        
        {/* Play button overlay - visible when video is paused */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-10 transition-all duration-300 video-overlay">
          <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
            <svg className="w-8 h-8 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
        
        {/* Subtle overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/5 pointer-events-none"></div>
      </div>

      {/* Content overlay when video reaches max size */}
      <div className="absolute inset-0 flex items-end justify-center pb-20 pointer-events-none">
        <div className="text-gray-800 text-center opacity-0 transition-opacity duration-1000" id="video-overlay-content">
          <h2 className="text-2xl md:text-4xl font-bold mb-2">Experience ENRZY</h2>
          <p className="text-lg md:text-xl">Transforming Power Asset Management</p>
        </div>
      </div>
    </section>
  );
};

export default VideoScrollScaler;