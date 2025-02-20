import React, { useRef, useEffect, useState } from "react";

export default function ProgressTrackerLine({ current, total }) {
  const parentRef = useRef(null);
  const childRef = useRef(null);

  const updateWidth = () => {
    if (parentRef.current && childRef.current) {
      const parentWidth = parentRef.current.offsetWidth;
      childRef.current.style.width = `${parentWidth}px`;
    }
  };

  useEffect(() => {
    updateWidth(); 
    window.addEventListener("resize", updateWidth); 

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden" ref={parentRef}>
      <div
        className="fixed z-50 h-2 bg-gray-200 rounded-full overflow-hidden"
        ref={childRef}
      >
        <div
          className="absolute top-0 left-0 h-full bg-green-500 transition-all"
          style={{ width: `${(current / total) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}