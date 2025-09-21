import DefaultIcon from "../../common/icon/DefaultIcon";

const statusConfig = {
  ongoing: {
    label: "In Progress",
    bgColor: "bg-blue-700/20",
    textColor: "text-blue-300",
    borderColor: "border-blue-500/30",
    dotColor: "bg-blue-400",
  },
  active: {
    label: "In Progress",
    bgColor: "bg-blue-700/20",
    textColor: "text-blue-300",
    borderColor: "border-blue-500/30",
    dotColor: "bg-blue-400",
  },
  completed: {
    label: "Completed",
    bgColor: "bg-green-700/20",
    textColor: "text-green-300",
    borderColor: "border-green-500/30",
    dotColor: "bg-green-400",
  },
  aborted: {
    label: "Aborted",
    bgColor: "bg-red-700/20",
    textColor: "text-red-300",
    borderColor: "border-red-500/30",
    dotColor: "bg-red-400",
  },
};

const GroupUI = ({ group }) => {
  return (
    <div className="flex items-center gap-3 w-full">
      <div className="relative">
        {group.icon ? (
          <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-600/50">
            <img
              src={group.icon}
              alt={`${group} icon`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div
              className="w-8 h-8 rounded-full bg-gray-700/50 flex items-center justify-center"
              style={{ display: "none" }}
            >
              <DefaultIcon name={group} height={8} width={8} />
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-700/50 flex items-center justify-center border border-gray-600/50">
            <DefaultIcon name={group} height={8} width={8} />
          </div>
        )}
      </div>
      <span className="text-sm font-medium text-[var(--w-color)] truncate">
        {group}
      </span>
    </div>
  );
};

const ProgressUI = ({ progress, status }) => {
  const progressValue = Math.max(0, Math.min(100, progress || 0));

  const getProgressColor = () => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-500";
      case "aborted":
        return "bg-red-500";
      case "ongoing":
      case "active":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getTextColor = () => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "text-green-400";
      case "aborted":
        return "text-red-400";
      case "ongoing":
      case "active":
        return "text-blue-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="flex items-center gap-3 w-full">
      <div className="flex-1 h-2 bg-gray-700/50 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${getProgressColor()} transition-all duration-300 ease-out`}
          style={{ width: `${progressValue}%` }}
        />
      </div>
      <span
        className={`text-sm font-medium min-w-[45px] text-right ${getTextColor()}`}
      >
        {progressValue}%
      </span>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const config = statusConfig[status?.toLowerCase()] || {
    label: "Unknown",
    bgColor: "bg-gray-700/20",
    textColor: "text-gray-400",
    borderColor: "border-gray-500/30",
    dotColor: "bg-gray-400",
  };

  return (
    <div
      className={`
      ${config.bgColor} 
      ${config.textColor} 
      ${config.borderColor}
      rounded-md px-3 py-1.5 
      w-fit flex items-center gap-2 
      border backdrop-blur-sm
      whitespace-nowrap text-sm font-medium
    `}
    >
      <div
        className={`${config.dotColor} rounded-full w-1.5 h-1.5 animate-pulse`}
      />
      <span>{config.label}</span>
    </div>
  );
};

const formatDate = (date) => {
  if (!date) return "No date";

  try {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return "Invalid date";

    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (error) {
    return "Invalid date";
  }
};

export default function KhatmaRow({
  id,
  name,
  group,
  progress,
  status,
  endDate,
  onClick,
}) {
  const handleClick = () => {
    if (onClick && id) {
      onClick(id);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View khatma: ${name}`}
      className="
        grid grid-cols-5 gap-4 items-center 
        px-6 py-4 cursor-pointer 
        hover:bg-gray-800/30 
        focus:bg-gray-800/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50
        transition-colors duration-200 ease-out
        group
      "
    >
      <div className="min-w-0">
        <h3 className="text-[var(--w-color)] font-medium truncate group-hover:text-white transition-colors">
          {name || "Untitled Khatma"}
        </h3>
      </div>

      <div className="min-w-0">
        <GroupUI group={group} />
      </div>

      <div className="min-w-0">
        <ProgressUI progress={progress} status={status} />
      </div>

      <div className="min-w-0">
        <StatusBadge status={status} />
      </div>

      <div className="min-w-0">
        <span className="text-[var(--lighter-color)] text-sm group-hover:text-gray-300 transition-colors">
          {formatDate(endDate)}
        </span>
      </div>
    </div>
  );
}
