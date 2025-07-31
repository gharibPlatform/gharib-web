import React from "react";

const Bubble = ({
  text,
  isSent = false,
  timestamp,
  status,
  showAvatar = false,
  avatarUrl,
}) => {
  return (
    <div className={`flex mb-3 ${isSent ? "justify-end" : "justify-start"}`}>
      {showAvatar && !isSent && (
        <div className="flex-shrink-0 mr-2">
          <img
            src={avatarUrl}
            alt="User avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      )}

      <div
        className={`flex flex-col max-w-xs lg:max-w-md ${isSent ? "items-end" : "items-start"}`}
      >
        <div
          className={`
          px-4 py-2 rounded-2xl 
          ${
            isSent
              ? "bg-blue-500 text-white rounded-br-none"
              : "bg-gray-200 text-gray-800 rounded-bl-none"
          }
          shadow-sm
        `}
        >
          {text}
        </div>

        <div className="flex items-center mt-1 space-x-1">
          <span className="text-xs text-gray-500">{timestamp}</span>
          {isSent && status && (
            <span className="text-xs text-gray-500">
              {status === "read" ? "✓✓" : status === "delivered" ? "✓✓" : "✓"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bubble;
