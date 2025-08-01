import React from "react";

const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="px-4 py-2 bg-[var(--main-color-hover)] rounded-2xl shadow-sm">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-[var(--lighter-color)] rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-[var(--lighter-color)] rounded-full animate-bounce delay-75"></div>
          <div className="w-2 h-2 bg-[var(--lighter-color)] rounded-full animate-bounce delay-150"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
