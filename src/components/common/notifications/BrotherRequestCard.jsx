import DefaultIcon from "../icon/DefaultIcon";
import Image from "next/image";
import { Check, X, UserPlus } from "lucide-react";
import { useState } from "react";

export default function BrotherRequestCard({ username, date, icon }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);

  function timeSince(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return `${interval} year${interval > 1 ? "s" : ""} ago`;

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return `${interval} month${interval > 1 ? "s" : ""} ago`;

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval} day${interval > 1 ? "s" : ""} ago`;

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return `${interval} hour${interval > 1 ? "s" : ""} ago`;

    interval = Math.floor(seconds / 60);
    if (interval >= 1)
      return `${interval} minute${interval > 1 ? "s" : ""} ago`;

    return "Just now";
  }

  const handleAccept = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsAccepted(true);
    }, 1000);
  };

  const handleDecline = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsDeclined(true);
    }, 1000);
  };

  if (isAccepted) {
    return (
      <div className="p-4 border-b border-[var(--secondary-color)] last:border-b-0 bg-[var(--darker-color)]">
        <div className="flex items-center justify-center gap-2 text-green-400">
          <Check className="h-5 w-5" />
          <p className="text-sm font-medium">Request accepted</p>
        </div>
      </div>
    );
  }

  if (isDeclined) {
    return (
      <div className="p-4 border-b border-[var(--secondary-color)] last:border-b-0 bg-[var(--darker-color)]">
        <div className="flex items-center justify-center gap-2 text-[var(--lighter-color)]">
          <p className="text-sm font-medium">Request declined</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border-b border-[var(--secondary-color)] last:border-b-0 transition-colors duration-200 group">
      <div className="flex gap-3 items-center">
        <div className="relative flex-shrink-0">
          {icon ? (
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--secondary-color)] group-hover:border-[var(--b-color)] transition-colors">
              <Image
                src={icon}
                className="object-cover"
                fill
                alt="profile image"
              />
            </div>
          ) : (
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[var(--main-color)] text-white font-semibold group-hover:bg-[var(--b-color)] transition-colors">
              <DefaultIcon
                width={12}
                height={12}
                fontSize={16}
                name={username || "U"}
              />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <UserPlus className="h-4 w-4 text-[var(--b-color)]" />
            <p className="text-white text-sm font-medium truncate">
              Brother request from {username || "Unknown User"}
            </p>
          </div>
          <p className="text-[var(--lighter-color)] text-xs mt-1">
            {date ? timeSince(date) : "Unknown"}
          </p>
        </div>
      </div>

      {isProcessing ? (
        <div className="flex justify-center mt-3">
          <div className="w-6 h-6 border-t-2 border-r-2 border-[var(--b-color)] rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleAccept}
            className="flex-1 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-800 transition-all flex items-center justify-center gap-1 shadow-md hover:shadow-lg"
            disabled={isProcessing}
          >
            <Check className="h-4 w-4" />
            Accept
          </button>
          <button
            onClick={handleDecline}
            className="flex-1 py-2 text-sm bg-[var(--dark-color)] text-[var(--lighter-color)] rounded-md border
              border-[var(--secondary-color)] hover:bg-[var(--darker-color)] transition-all flex items-center justify-center
              gap-1 hover:text-white"
            disabled={isProcessing}
          >
            <X className="h-4 w-4" />
            Decline
          </button>
        </div>
      )}
    </div>
  );
}
