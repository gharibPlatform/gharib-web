import React from "react";

export default function ProgressTrackerLine({ progress }) {
  return (
    <div className="w-full h-[5px] bg-[var(--darker-color)] border border-[var(--dark-color)]">
      <div
        className="h-full bg-[var(--w-color)]"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}