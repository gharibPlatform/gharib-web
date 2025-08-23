import Image from "next/image";
import { useState, useEffect } from "react";

export default function DirectMessagesCard({ 
  name, 
  icon, 
  lastMessage, 
  lastMessageTime, 
  unreadCount = 0 
}) {
  const [timeAgo, setTimeAgo] = useState("");

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return "";
    
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - messageTime) / 1000);
    
    if (diffInSeconds < 60) {
      return "Just now";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}m ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}d ago`;
    } else {
      return messageTime.toLocaleDateString();
    }
  };

  useEffect(() => {
    if (!lastMessageTime) return;
    
    // Update time immediately
    setTimeAgo(formatTimeAgo(lastMessageTime));
    
    // Set up interval to update every minute
    const interval = setInterval(() => {
      setTimeAgo(formatTimeAgo(lastMessageTime));
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [lastMessageTime]);

  return (
    <div className="flex items-center justify-between text-white hover:bg-[var(--main-color-hover)] cursor-pointer w-full px-4 py-3">
      <div className="flex gap-2 items-center">
        <Image height={65} width={65} src={icon} alt="icon" />
        <div className="flex flex-col">
          <h1 className="font-bold">{name}</h1>
          <span className="text-sm text-[var(--lighter-color)] truncate max-w-48">
            {lastMessage || "No messages yet"}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <span className="text-[18px]">{timeAgo}</span>
        {unreadCount > 0 && (
          <div className="flex text-[14px] rounded-full w-4 h-4 items-center justify-center bg-blue-700 ml-auto">
            {unreadCount > 99 ? "99+" : unreadCount}
          </div>
        )}
      </div>
    </div>
  );
}