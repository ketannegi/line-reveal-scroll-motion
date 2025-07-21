import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// Define the main React component
const App: React.FC = () => {
  // Create refs for the DOM elements we need to interact with
  const videoContainerWrapperRef = useRef<HTMLDivElement>(null);
  const videoBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure both refs are available before proceeding
    if (!videoContainerWrapperRef.current || !videoBoxRef.current) {
      console.warn("Refs not available, animation setup skipped.");
      return;
    }

    const videoBox = videoBoxRef.current;
    const videoContainerWrapper = videoContainerWrapperRef.current;

    // Calculate the target dimensions for the video box to fill its wrapper.
    // These calculations must happen after the component has mounted and rendered,
    // which is why they are inside useEffect.
    const wrapperWidth = videoContainerWrapper.offsetWidth;
    const wrapperHeight = videoContainerWrapper.offsetHeight;

    // Set up the GSAP animation with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: videoContainerWrapper, // The element that triggers the animation
        start: "top top",              // Animation starts when the top of the trigger hits the top of the viewport
        end: "bottom top",             // Animation ends when the bottom of the trigger hits the top of the viewport
        scrub: true,                   // Link animation progress directly to scroll position
        pin: true,                     // Pin the trigger element in place while the animation runs
        pinSpacing: true,              // Add spacing to prevent content below from jumping up
        markers: false,                // Set to true for debugging (shows start/end markers)
        // Optional: Add a smooth ease for the scrubbing effect if desired
        // ease: "power1.inOut",
      }
    });

    // Add the animation to the timeline
    // The videoBox will scale up to fill the wrapper and lose its border-radius
    tl.to(videoBox, {
      width: wrapperWidth,
      height: wrapperHeight,
      borderRadius: 0,
      ease: "none", // Use 'none' for direct scrubbing, as scroll provides the "ease"
    });

    // Cleanup function: important to destroy ScrollTrigger instances
    // when the component unmounts to prevent memory leaks and conflicts.
    return () => {
      tl.kill(); // Kills the timeline and its associated ScrollTrigger
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className="font-inter">
      
      
     
      <section
        ref={videoContainerWrapperRef}
        className="relative flex justify-center items-center min-h-screen  overflow-hidden"
        style={{ zIndex: 10 }} // Ensure it's above other content if needed
      >
        {/* Video Box Placeholder - This is the element that will scale */}
        <div
          ref={videoBoxRef}
          className="absolute bg-gray-700 rounded-2xl shadow-2xl overflow-hidden"
          // Initial dimensions for the video box (adjust as needed)
          style={{ width: '300px', height: '200px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          {/* The video element itself */}
          <video
            src="./assets/enrzy.mp4" // Example video URL
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

   
     
    </div>
  );
};

export default App;