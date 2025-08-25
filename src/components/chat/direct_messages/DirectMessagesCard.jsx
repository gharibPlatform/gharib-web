import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import {
  FiCheck,
  FiCheckCircle,
  FiClock,
  FiMessageSquare,
} from "react-icons/fi";

export default function DirectMessagesCard({
  name,
  icon,
  lastMessage,
  lastMessageTime,
  unreadCount = 0,
  searchQuery = "",
  groupId,
}) {
  const [timeAgo, setTimeAgo] = useState("");
  const pathname = usePathname();

  const isActive = useMemo(() => {
    const pathSegments = pathname.split('/');
    const currentId = pathSegments[pathSegments.length - 1];
    
    return currentId == groupId;
  }, [pathname, groupId]);

  const highlightText = (text, query) => {
    if (!query || !text) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span
          key={index}
          className="bg-blue-500 bg-opacity-20 text-blue-100 px-0.5 rounded font-medium"
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return "";

    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - messageTime) / 1000);

    if (diffInSeconds < 60) {
      return "Just now";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}m`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}d`;
    } else {
      return messageTime.toLocaleDateString([], {
        month: "short",
        day: "numeric",
      });
    }
  };

  const formatDetailedTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  useEffect(() => {
    if (!lastMessageTime) return;

    setTimeAgo(formatTimeAgo(lastMessageTime));

    const interval = setInterval(() => {
      setTimeAgo(formatTimeAgo(lastMessageTime));
    }, 60000);

    return () => clearInterval(interval);
  }, [lastMessageTime]);

  const highlightedName = useMemo(
    () => (searchQuery ? highlightText(name, searchQuery) : name),
    [name, searchQuery]
  );

  const highlightedMessage = useMemo(
    () =>
      searchQuery && lastMessage
        ? highlightText(lastMessage, searchQuery)
        : lastMessage,
    [lastMessage, searchQuery]
  );

  return (
    <div
      className={`flex items-center w-full p-3 rounded-lg transition-all duration-200 cursor-pointer group relative
      ${
        isActive
          ? "bg-gray-800 border-l-2 border-blue-500"
          : "hover:bg-gray-800/30 border-l-2 border-transparent"
      }`}
    >
      <div className="relative flex-shrink-0 mr-3">
        <div className="relative">
          <div
            className={`rounded-full p-0.5 ${unreadCount > 0 ? "ring-2 ring-blue-500/50" : ""}`}
          >
            <Image
              height={44}
              width={44}
              src={icon}
              alt={name}
              className="rounded-full object-cover border border-gray-700 group-hover:border-gray-600 transition-colors"
            />
          </div>

          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
        </div>

        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
            {unreadCount > 99 ? "99+" : unreadCount}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-white font-medium truncate flex items-center">
            {highlightedName}
          </h3>

          <div className="flex items-center text-gray-400 text-xs whitespace-nowrap ml-2">
            {lastMessageTime && (
              <>
                <FiClock className="mr-1 w-3 h-3" />
                <span
                  className={`${unreadCount > 0 ? "text-blue-400 font-medium" : ""}`}
                  title={formatDetailedTime(lastMessageTime)}
                >
                  {timeAgo}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center">
          {lastMessage ? (
            <div
              className={`mr-1.5 ${unreadCount > 0 ? "text-blue-400" : "text-gray-500"}`}
            >
              {unreadCount > 0 ? (
                <FiMessageSquare className="w-3.5 h-3.5" />
              ) : (
                <FiCheck className="w-3.5 h-3.5" />
              )}
            </div>
          ) : null}

          <p
            className={`text-sm truncate ${unreadCount > 0 ? "text-gray-200 font-medium" : "text-gray-400"}`}
          >
            {lastMessage ? highlightedMessage : "Start a conversation..."}
          </p>
        </div>
      </div>
    </div>
  );
}