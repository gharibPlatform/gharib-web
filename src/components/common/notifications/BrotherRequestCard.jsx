import DefaultIcon from "../icon/DefaultIcon";
import Image from "next/image";
import { Check, X, UserPlus } from "lucide-react";

export default function BrotherRequestCard({
  brothershipRequest,
  isProcessing,
  error,
  onAccept,
  onDecline,
}) {
  const { sender, created_at } = brothershipRequest;
  const { username, profile_picture } = sender || {};

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

  return (
    <div className="p-4 border-b border-[var(--secondary-color)] last:border-b-0 transition-colors duration-200 group">
      <div className="flex gap-3 items-center">
        <div className="relative flex-shrink-0">
          {profile_picture ? (
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--secondary-color)] group-hover:border-[var(--b-color)] transition-colors">
              <Image
                src={profile_picture}
                className="object-cover"
                fill
                alt={`${username}'s profile`}
              />
            </div>
          ) : (
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[var(--main-color)] text-white font-semibold group-hover:bg-[var(--b-color)] transition-colors">
              <DefaultIcon
                width={12}
                height={12}
                fontSize={24}
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
            {created_at ? timeSince(created_at) : "Unknown"}
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-2 p-2 bg-red-900/20 border border-red-700 rounded-md">
          <p className="text-red-400 text-xs">{error}</p>
        </div>
      )}

      {isProcessing ? (
        <div className="flex justify-center mt-3">
          <div className="w-6 h-6 border-t-2 border-r-2 border-[var(--b-color)] rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex gap-2 mt-3">
          <button
            onClick={onAccept}
            className="flex-1 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-800 transition-all flex items-center justify-center gap-1 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isProcessing}
          >
            <Check className="h-4 w-4" />
            Accept
          </button>
          <button
            onClick={onDecline}
            className="flex-1 py-2 text-sm bg-[var(--dark-color)] text-[var(--lighter-color)] rounded-md border
              border-[var(--secondary-color)] hover:bg-[var(--darker-color)] transition-all flex items-center justify-center
              gap-1 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
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
