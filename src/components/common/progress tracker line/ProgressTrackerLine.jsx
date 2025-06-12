import React, { useRef, useEffect, useState } from "react";

export default function ProgressTrackerLine({ current, total}) {
  const parentRef = useRef(null);
  const childRef = useRef(null);
  const progressRef = useRef(null);

  const updateWidth = () => {
    if (parentRef.current && childRef.current) {
      const parentWidth = parentRef.current.offsetWidth;
      childRef.current.style.width = `${parentWidth - 5}px`;
    }
  };

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.transition = "width 100ms ease-out";
    }
  }, []);

  useEffect(() => {
    updateWidth(); 
    window.addEventListener("resize", updateWidth); 

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

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