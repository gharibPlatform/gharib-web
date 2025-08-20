import DefaultIcon from "../../common/icon/DefaultIcon";

const GroupUI = (group) => {
  return (
    <div className="flex items-center gap-3 w-full pr-8">
      {group.icon ? (
        <div className="w-8 h-8 rounded-full">
          <img src={group.icon} alt="group-icon" />
        </div>
      ) : (
        <div className="w-8 h-8 rounded-full bg-gray-200">
          <DefaultIcon name={group} />
        </div>
      )}
      <div className="text-sm font-medium min-w-[40px]">{group}</div>
    </div>
  );
};
const ProgressUI = (progress, status) => {
  let colorClass = "bg-blue-600";
  if (status === "completed") colorClass = "bg-green-600";
  if (status === "aborted") colorClass = "bg-red-600";

  return (
    <div className="flex items-center gap-3 w-full pr-8">
      <div className="flex-1 h-2 bg-[var(--lighter-color)] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${colorClass} transition-all duration-300`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div
        className={`text-sm font-medium min-w-[40px] ${
          status === "completed"
            ? "text-green-700"
            : status === "aborted"
              ? "text-red-700"
              : "text-blue-700"
        }`}
      >
        {progress}%
      </div>
    </div>
  );
};

const StatusUI = (status) => {
  switch (status) {
    case "ongoing":
      return (
        <div className="bg-blue-700  text-blue-200 rounded-[4px] px-2 py-[1px] w-min flex items-center gap-2 border border-blue-400 whitespace-nowrap">
          <div className="bg-blue-200 rounded-full w-1.5 h-1.5"></div>
          <span>In Progress</span>
        </div>
      );
      break;
    case "completed":
      return (
        <div className="bg-green-700 text-green-200 rounded-[4px] px-2 py-[1px] w-min flex items-center gap-2 border border-green-400 whitespace-nowrap">
          <div className="bg-green-200 rounded-full w-1.5 h-1.5"></div>
          <span>Completed</span>
        </div>
      );
      break;
    case "aborted":
      return (
        <div className="bg-red-700 text-red-200 rounded-[4px] px-2 py-[1px] w-min flex items-center gap-2 border border-red-400 whitespace-nowrap">
          <div className="bg-red-200 rounded-full w-1.5 h-1.5"></div>
          <span>Aborted</span>
        </div>
      );
      break;
    default:
      return <div>Unknown</div>;
  }
};

const formatDate = (date) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US");
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
  return (
    <div
      onClick={() => onClick(id)}
      className="grid grid-cols-5 items-center border-b border-[var(--g-color)] px-4 py-4 cursor-pointer hover:bg-[var(--main-color-hover)]"
    >
      <h2 className="text-[var(--w-color)]">{name}</h2>
      <h2 className="text-[var(--w-color)]">{GroupUI(group)}</h2>
      <h2 className="text-[var(--w-color)]">{ProgressUI(progress, status)}</h2>
      <h2 className="text-[var(--w-color)]">{StatusUI(status)}</h2>
      <h2 className="text-[var(--g-color)]">{formatDate(endDate)}</h2>
    </div>
  );
}
