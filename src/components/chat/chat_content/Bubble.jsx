import React from "react";

const Bubble = ({
  text,
  isSent = false,
  timestamp,
  status,
  showAvatar = false,
  avatarUrl,
}) => {
  const username = "KMalek101";
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

        <h2 className="text-white text-sm">{username}</h2>
        <div
          className={`
          px-4 py-2 rounded-2xl 
          ${
            isSent
              ? "bg-[var(--b-color)] text-white rounded-br-none"
              : "bg-[var(--main-color-hover)] text-white rounded-tl-none"
          }
          shadow-sm
        `}
        >
          {text}
        </div>

        <div className="flex items-center mt-1 space-x-1">
          <span className="text-xs text-[var(--lighter-color)]">
            {timestamp}
          </span>
          {isSent && status && (
            <span className="text-xs text-[var(--lighter-color)]">
              {status === "read" ? "✓✓" : status === "delivered" ? "✓✓" : "✓"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bubble;
