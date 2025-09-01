import DefaultIcon from "../../../components/common/icon/DefaultIcon";

export default function ChatHeader({ group, onClickName }) {
  return (
    <div className="bg-[var(--secondary-color)] text-white p-4 border-b border-[var(--g-color)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {group?.image ? (
            <img
              src={group.image}
              alt={group.name}
              onClick={onClickName}
              className="w-10 h-10 rounded-full object-cover cursor-pointer"
            />
          ) : (
            <div onClick={onClickName} className="cursor-pointer">
              <DefaultIcon name={group?.name} width={14} height={14} />
            </div>
          )}

          <div onClick={onClickName} className="cursor-pointer">
            <h2 className="font-semibold text-lg">
              {group?.name || "Group Chat"}
            </h2>
            <p className="text-sm text-[var(--lighter-color)]">
              {group?.members?.length
                ? `${group.members.length} members`
                : "Loading..."}
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <button className="p-2 hover:bg-[var(--main-color-hover)] rounded-full transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
