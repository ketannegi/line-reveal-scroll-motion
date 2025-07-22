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

      // Set initial state - match hero video box
      gsap.set(videoBox, {
        width: 280,
        height: 180,
        borderRadius: 12,
        transformOrigin: "center center",
        position: "fixed",
        top: "50%",
        left: "50%",
        x: "-50%",
        y: "-50%",
        zIndex: 50
      });

      // Hide hero video when scroll starts
      ScrollTrigger.create({
        trigger: videoWrapper,
        start: "top bottom",
        end: "top center",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          heroVideoBox.style.opacity = String(1 - progress);
        }
      });

      // Main scaling animation
      const scaleTl = gsap.timeline({
        scrollTrigger: {
          trigger: videoWrapper,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          onEnter: () => {
            // Start video when animation begins
            if (video.paused) {
              video.play().catch(() => {});
            }
          },
          onLeave: () => {
            // Pause video when leaving
            video.pause();
          },
          onEnterBack: () => {
            // Resume video when scrolling back
            if (video.paused) {
              video.play().catch(() => {});
            }
          },
          onLeaveBack: () => {
            // Pause when scrolling back up
            video.pause();
          }
        }
      });

      // Animate to full screen with overflow
      scaleTl.to(videoBox, {
        width: vw * 1.1, // 110% of viewport width for overflow
        height: vh * 1.1, // 110% of viewport height for overflow
        borderRadius: 0,
        duration: 1,
        ease: "power2.out"
      });

      // Handle window resize
      const handleResize = () => {
        const newVw = window.innerWidth;
        const newVh = window.innerHeight;
        
        // Update the animation end values
        scaleTl.invalidate();
        scaleTl.to(videoBox, {
          width: newVw * 1.1,
          height: newVh * 1.1,
          borderRadius: 0,
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
      className="video-scroll-section relative min-h-[200vh] bg-black overflow-hidden"
      style={{ zIndex: 10 }}
    >
      <div
        ref={videoBoxRef}
        className="video-scaling-box bg-gray-900 shadow-2xl overflow-hidden"
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
        
        {/* Subtle overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/5 pointer-events-none"></div>
      </div>

      {/* Optional: Add some content overlay when video is full size */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-white text-center opacity-0 transition-opacity duration-1000" id="video-overlay-content">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Experience ENRZY</h2>
          <p className="text-xl md:text-2xl">Transforming Power Asset Management</p>
        </div>
      </div>
    </section>
  );
};

export default VideoScrollScaler;