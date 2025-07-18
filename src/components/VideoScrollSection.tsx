import { useEffect, useState, useRef } from 'react';

const VideoScrollSection = () => {
  const [videoScale, setVideoScale] = useState(0.2);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const containerTop = rect.top;
      
      // Start the effect when the container comes into view
      if (containerTop <= windowHeight * 0.8 && containerTop >= -rect.height) {
        if (!hasStartedRef.current) {
          hasStartedRef.current = true;
          setIsScrollLocked(true);
          // Start playing video
          if (videoRef.current) {
            videoRef.current.play();
          }
        }

        if (isScrollLocked && videoScale < 1) {
          // Prevent normal scrolling by calculating scale based on scroll attempts
          const scrollProgress = Math.max(0, Math.min(1, (windowHeight * 0.8 - containerTop) / (windowHeight * 0.6)));
          const newScale = 0.2 + (scrollProgress * 0.8); // Scale from 0.2 to 1.0
          setVideoScale(newScale);

          // When video reaches full size, unlock scrolling
          if (newScale >= 0.98) {
            setIsScrollLocked(false);
          }
        }
      } else if (containerTop > windowHeight * 0.8) {
        // Reset when scrolling back up
        hasStartedRef.current = false;
        setIsScrollLocked(false);
        setVideoScale(0.2);
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (isScrollLocked && videoScale < 0.98) {
        e.preventDefault();
        // Convert wheel delta to scale increment
        const delta = e.deltaY * 0.001;
        setVideoScale(prev => Math.max(0.2, Math.min(1, prev + delta)));
        
        if (videoScale >= 0.98) {
          setIsScrollLocked(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isScrollLocked, videoScale]);

  return (
    <div 
      ref={containerRef}
      className="h-[200vh] relative bg-background flex items-center justify-center"
    >
      <div className="sticky top-1/2 transform -translate-y-1/2">
        <div 
          className="relative transition-all duration-100 ease-out"
          style={{
            width: `${Math.max(320, 80 * videoScale)}vw`,
            height: `${Math.max(180, 45 * videoScale)}vh`,
            maxWidth: '90vw',
            maxHeight: '80vh'
          }}
        >
          {/* Video Container */}
          <div className="w-full h-full bg-muted rounded-2xl overflow-hidden shadow-2xl">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
            >
              <source src="/placeholder.mp4" type="video/mp4" />
              {/* Fallback content */}
              <div className="w-full h-full bg-gradient-to-br from-[hsl(var(--workflow-teal))] to-[hsl(var(--workflow-orange))] flex items-center justify-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1"></div>
                </div>
              </div>
            </video>
          </div>

          {/* Progress indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="w-32 h-1 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all duration-100"
                style={{ width: `${(videoScale - 0.2) / 0.8 * 100}%` }}
              />
            </div>
          </div>

          {/* Scale indicator for debugging */}
          {process.env.NODE_ENV === 'development' && (
            <div className="absolute top-4 left-4 text-white bg-black/50 px-2 py-1 rounded">
              Scale: {videoScale.toFixed(2)} | Locked: {isScrollLocked.toString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoScrollSection;