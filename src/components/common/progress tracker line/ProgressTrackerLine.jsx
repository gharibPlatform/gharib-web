import React, { useRef, useEffect, useCallback } from "react";

export default function ProgressTrackerLine({ current, total }) {
  const parentRef = useRef(null);
  const childRef = useRef(null);
  const progressRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Optimized resize handler
  const handleResize = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      if (parentRef.current && childRef.current) {
        childRef.current.style.width = `${parentRef.current.offsetWidth}px`;
      }
    });
  }, []);

  // Setup and cleanup
  useEffect(() => {
    const resizeObserver = new ResizeObserver(handleResize);
    if (parentRef.current) {
      resizeObserver.observe(parentRef.current);
      handleResize(); // Initial measurement
    }

    return () => {
      resizeObserver.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleResize]);

  // Progress animation with your exact timing
  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.willChange = 'width';
      progressRef.current.style.transition = 'width 100ms ease-out';
      progressRef.current.style.width = `${(current / total) * 100}%`;
      
      const timer = setTimeout(() => {
        if (progressRef.current) {
          progressRef.current.style.willChange = 'auto';
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [current, total]);

  return (
    <div className="relative w-full overflow-hidden flex justify-center pt-1" ref={parentRef}>
      <div
        className="fixed z-50 h-[5px] bg-[var(--darker-color)] overflow-hidden border border-[var(--dark-color)]"
        ref={childRef}
      >
        <div
          className="absolute top-0 left-0 h-full bg-[var(--w-color)] transition-all"
          ref={progressRef}
          style={{ width: `${(current / total) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}