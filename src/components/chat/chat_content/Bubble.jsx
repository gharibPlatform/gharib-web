import React from "react";
import DefaultIcon from "@/components/common/icon/DefaultIcon";

const Bubble = ({
  text = "",
  username = "Unknown",
  isSent = false,
  timestamp = "",
  status = "",
  avatarUrl = null,
}) => {
  return (
    <div className={`flex mb-2 ${isSent ? "justify-end" : "justify-start"}`}>
      {/* Avatar only for received messages */}
      {!isSent && (
        <div className="flex-shrink-0 mr-2 mt-auto">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`${username}'s avatar`}
              className="w-9 h-9 rounded-full object-cover shadow-md"
            />
          ) : (
            <DefaultIcon width={14} height={14} name={username} />
          )}
        </div>
      )}

      <div className={`flex flex-col max-w-sm lg:max-w-md`}>
        <div
          className={`relative px-4 py-3 pb-2 rounded-2xl shadow-md 
            ${
              isSent
                ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-none"
                : "bg-[var(--main-color-hover)] text-white rounded-bl-none"
            }`}
        >
          {!isSent && (
            <h2 className="text-xs text-[var(--lighter-color)] mb-1 font-semibold">
              {username}
            </h2>
          )}

          <p className="text-sm leading-relaxed">{text}</p>
        </div>
        <div
          className={`flex mt-1 text-[16px] text-[var(--lighter-color)] ${
            isSent ? "justify-end pr-1" : "justify-start pl-1"
          }`}
        >
          {timestamp && <span>{timestamp}</span>}
        </div>
      </div>
    </div>
  );
};

export default Bubble;
