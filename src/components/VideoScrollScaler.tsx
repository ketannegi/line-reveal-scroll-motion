import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin
gsap.registerPlugin(ScrollTrigger);

const VideoScrollScaler: React.FC = () => {
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const videoWrapper = videoWrapperRef.current;
    const videoBox = videoBoxRef.current;
    const heroVideoBox = document.getElementById('hero-video-box');

    if (!videoWrapper || !videoBox || !heroVideoBox) return;

    const wrapperRect = videoWrapper.getBoundingClientRect();
    const heroRect = heroVideoBox.getBoundingClientRect();

    // Set initial style
    gsap.set(videoBox, {
      width: heroRect.width,
      height: heroRect.height,
      x: heroRect.left - (wrapperRect.left + wrapperRect.width / 2 - heroRect.width / 2),
      y: heroRect.top - (wrapperRect.top + wrapperRect.height / 2 - heroRect.height / 2),
      borderRadius: "8px",
      scale: 1,
      transformOrigin: "center center"
    });

    // Fade hero box + scale our new one during scroll
    ScrollTrigger.create({
      trigger: heroVideoBox.closest('.hero-section') || heroVideoBox,
      start: "bottom center",
      end: "bottom top",
      scrub: true,
      onUpdate: ({ progress }) => {
        heroVideoBox.style.opacity = String(1 - progress);
        gsap.set(videoBox, {
          scale: 1 + progress * 0.2,
          transformOrigin: "center center"
        });
      }
    });

    // Transition from small box to full section
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: videoWrapper,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        pinSpacing: true,
        onEnter: () => {
          heroVideoBox.style.opacity = '0';
        }
      }
    });

    mainTl.to(videoBox, {
      width: wrapperRect.width,
      height: wrapperRect.height,
      x: 0,
      y: 0,
      scale: 1,
      borderRadius: 0,
      transformOrigin: "center center",
      ease: "none"
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      mainTl.kill();
    };
  }, []);

  return (
    <section
      ref={videoWrapperRef}
      className="video-scroll-section relative flex justify-center items-center min-h-screen bg-black overflow-hidden"
      style={{ zIndex: 10 }}
    >
      <div
        ref={videoBoxRef}
        className="absolute bg-gray-700 shadow-2xl overflow-hidden"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          transformOrigin: 'center center',
          borderRadius: '8px'
        }}
      >
        <div className="w-full h-full bg-gray-400 flex items-center justify-center">
          <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">S</span>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
          <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoScrollScaler;
