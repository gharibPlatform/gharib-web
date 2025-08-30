import React from "react";
import DefaultIcon from "@/components/common/icon/DefaultIcon";

const Bubble = ({
  text = "",
  username = "Unknown",
  isSent = false,
  timestamp = "",
  status = "",
  avatarUrl = null,
  showAvatar = true,
  showUsername = true,
  roundedBottom = true,
  roundedTop = true,
}) => {
  const getBorderRadius = () => {
    if (roundedTop && roundedBottom) return "rounded-2xl";
    if (roundedTop && !roundedBottom) {
      return isSent
        ? "rounded-tr-2xl rounded-tl-2xl rounded-bl-2xl"
        : "rounded-tl-2xl rounded-tr-2xl rounded-br-2xl";
    }
    if (!roundedTop && roundedBottom) {
      return isSent
        ? "rounded-br-2xl rounded-bl-2xl rounded-tl-2xl"
        : "rounded-bl-2xl rounded-br-2xl rounded-tr-2xl";
    }
    return isSent
      ? "rounded-tl-2xl rounded-bl-2xl"
      : "rounded-tr-2xl rounded-br-2xl";
  };

  return (
    <div className={`flex mb-1 ${isSent ? "justify-end" : "justify-start"}`}>
      {/* Avatar container - always present but conditionally visible */}
      <div className={`flex-shrink-0 ${isSent ? "order-2" : "order-1"}`}>
        {!isSent && showAvatar ? (
          <div className="w-9 h-9 mr-2">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={`${username}'s avatar`}
                className="w-full h-full rounded-full object-cover shadow-md"
              />
            ) : (
              <DefaultIcon width={10} height={10} name={username} /> 
            )}
          </div>
        ) : (
          // Spacer to maintain alignment when avatar is hidden
          <div className="w-9 mr-2"></div>
        )}
      </div>

      <div
        className={`flex flex-col max-w-sm lg:max-w-md ${isSent ? "order-1 mr-2" : "order-2"}`}
      >
        {!isSent && showUsername && (
          <h2 className="text-xs text-[var(--lighter-color)] mb-1 font-semibold pl-1">
            {username}
          </h2>
        )}

        <div
          className={`relative px-4 py-3 pb-2 shadow-md ${getBorderRadius()} 
            ${
              isSent
                ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                : "bg-[var(--main-color-hover)] text-white"
            }`}
        >
          <p className="text-sm leading-relaxed">{text}</p>
        </div>

        {timestamp && (
          <div
            className={`flex mt-1 text-[16px] text-[var(--lighter-color)] ${
              isSent ? "justify-end pr-1" : "justify-start pl-1"
            }`}
          >
            <span>{timestamp}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bubble;
