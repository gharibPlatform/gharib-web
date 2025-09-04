import DefaultIcon from "../icon/DefaultIcon";

export default function BrotherRequestCard({ username, date, icon }) {
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
    <div className="flex flex-col rounded-xl shadow-md p-6 w-80 transition-all hover:shadow-lg gap-2">
      <div className="flex gap-1">
        {icon ? (
          <div className="relative w-14 h-14 flex-shrink-0">
            <Image
              src={icon}
              className="rounded-full object-cover cursor-pointer"
              fill
              alt="profile image"
            />
          </div>
        ) : (
          <DefaultIcon
            width={12}
            height={12}
            fontSize={24}
            name={username || "U"}
          />
        )}
        <div className="flex flex-col ">
          <p className="text-md text-white font-semibold">
            {username || "Unknown User"}
          </p>
          <p className="text-sm text-[var(--lighter-color)]">
            {date ? timeSince(date) : "Unknown"}
          </p>
        </div>
      </div>

      <div className="flex gap-3 mt-1">
        <button>Accept</button>
        <button>Decline</button>
      </div>
    </div>
  );
}
