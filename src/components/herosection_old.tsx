import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// import React, { useRef, useEffect } from 'react';
// GSAP and ScrollTrigger are loaded via script tags in the HTML,
// so they will be globally available as 'gsap' and 'ScrollTrigger'.

const HeroSection = () => {
  // Ref for the video container to apply GSAP animations
  const videoContainerRef = useRef(null);
  // Ref for the main hero section to act as the scroll trigger
   const videoRef = useRef<HTMLVideoElement>(null);
  const heroSectionRef = useRef(null);
 const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Ensure GSAP and ScrollTrigger are loaded before proceeding
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('GSAP or ScrollTrigger not loaded. Please ensure CDN scripts are included.');
      return;
    }
 const section = sectionRef.current;
     const tld = gsap.timeline({
             scrollTrigger: {
               trigger: section,
               start: "top 80%", // Starts when the top of the section is 80% down from the viewport top
               toggleActions: "play none none none"
             },
           });
     
           tld.from(".hero-logo", { x: -40, opacity: 0, dudration: 0.4 });
           tld.from(".hero-title-line", { y: 60, opacity: 0, dudration: 0.8, stagger: 0.15 }, ">0.2");
           tld.from(".hero-subtitle", { y: 40, opacity: 0, duration: 0.8 }, ">0.1");
          
           tld.from(".hero-video-container", { y: 60, opacity: 0, scale: 0.8, duration: 1.2, ease: 'back.out(1.7)' }, ">0.2");

    // Register the ScrollTrigger plugin (important for it to work)
    gsap.registerPlugin(ScrollTrigger);

    if (videoContainerRef.current && heroSectionRef.current) {
      // Create a GSAP timeline for the animation
      const videoElement = videoRef.current;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current, // The element that triggers the animation
          start: 'top top', // Animation starts when the top of the hero section hits the top of the viewport
          end: '+=1000', // Animation ends when the bottom of the hero section hits the top of the viewport
          scrub: 1, // Smoothly links the animation to the scroll position (1 means a slight delay for smoothness)
          pin: true, // Pins the hero section while the animation plays
           pinSpacing: false,
    // Keep for debugging
          // markers: true, // Uncomment for debugging ScrollTrigger start/end points
        },
      });


      // Define the animation: scale the video box and adjust its width
      tl.to(videoContainerRef.current, {
        border:' 10px solid black',
        display:'flex',
        justifyContent:'center',
        alignItems: 'center',
        width: '80vw', // Scale to 80% of the viewport width
        height: '45vw', // Maintain aspect ratio (16:9 for video, so 80 * 9/16 = 45)
        borderRadius: '2rem', // Make it more rounded as it grows
        ease: 'none', // Linear ease for direct scrubbing with scroll
      });
    }

    // Clean up ScrollTrigger instances on component unmount
    return () => {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    // Load Tailwind CSS from CDN
   

    <div
      ref={heroSectionRef} // Attach ref for ScrollTrigger
      className="relative flex flex-col items-center justify-center  text-gray-900 p-4 overflow-hidden"
      style={{ fontFamily: '"Inter", sans-serif' }}
    >
 <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
      {/* Top navigation placeholder (as seen in the image) */}
      <div className="flex justify-between items-center mt-0 md:mt-6 mb-12">
          <div className="hero-logo flex items-center space-x-2">
            <img src="/assets/logo.png" alt="ENRZY Logo" className="object-contain" />
          </div>
          <button className="hero-contact-btn bg-base text-white px-6 py-2 rounded-full hover:scale-105 transition-all duration-300">
            Contact Us
          </button>
        </div>

      {/* Main content */}
      <div className="flex  mx-auto flex-col justify-between items-center  max-w-4xl px-4">
       <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="hero-title-line block">Revolutionize</span>
            <span className="hero-title-line block text-muted-foreground">
              Power <span className="text-foreground"> Prospects</span>
            </span>
            <span className="hero-title-line block">
              Asset <span className="text-muted-foreground">Management</span>
            </span>
          </h1>

          <p className="hero-subtitle text-gray-600 text-lg md:text-xl mt-8 max-w-2xl mx-auto leading-relaxed mb-16">
            ENRZY Empowers Utilities To Detect Faults Early, Automate Maintenance, And Visualize Every Asset In 3D — Ensuring Higher Uptime, Lower Risk, And Smarter Decisions.
          </p>
      </div>

      {/* Video Box Container */}
      <div
        ref={videoContainerRef} // Attach ref for GSAP animation
        className="relative hero-video-container   mx-auto w-[30vw] h-[16.875vw] bg-gray-300 rounded-lg shadow-2xl flex items-center justify-center overflow-hidden"
        style={{
          // Initial size for desktop, maintaining 16:9 aspect ratio (30vw * 9/16 = 16.875vw)
          minHeight: '200px', // Minimum height to ensure visibility on smaller screens
          minWidth: '350px', // Minimum width
          willChange: 'width, height, border-radius', // Optimize for animation performance
        }}
      >
        {/* Placeholder for the video. You would replace this with an actual <video> tag */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-2xl font-semibold">
         
          {/* Example of how you might embed a video: */}
          {/* <video autoPlay loop muted playsInline className="w-full h-full object-cover rounded-lg">
           src="/assets/enrzy.mp4"
            Your browser does not support the video tag.
          </video> */}
           <video
               
                src="/assets/enrzy.mp4"
                muted
                playsInline
                autoPlay
                // Ensure video always covers its container
                className="w-full h-full object-cover"
              />
        </div>
      </div>

      {/* Spacer div to allow scrolling and trigger the animation */}
      <div className="h-[200vh] w-full bg-transparent"></div> {/* Adjust height to control scroll distance */}
    </div>
    </div>
  );
};

export default HeroSection;