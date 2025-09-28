import { Users, BookOpen, Calendar, Lock, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import DefaultIcon from "../common/icon/DefaultIcon";

export default function GroupCard({ group, viewMode }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/groups/${group.id}`);
  };

  if (viewMode === "list") {
    return (
      <div
        onClick={handleClick}
        className="flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all hover:shadow-lg"
        style={{
          background: "var(--main-color)",
          borderColor: "var(--light-color)",
          borderWidth: "1px",
        }}
      >
        <div
          className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
        >
          <DefaultIcon name={group.name} width={12} height={12} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3
              className="font-semibold truncate"
              style={{ color: "var(--w-color)" }}
            >
              {group.name}
            </h3>
            {group.is_private && (
              <Lock
                className="w-3 h-3"
                style={{ color: "var(--lighter-color)" }}
              />
            )}
          </div>
          <p
            className="text-sm truncate"
            style={{ color: "var(--lighter-color)" }}
          >
            {group.description || "No description"}
          </p>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Users
              className="w-4 h-4"
              style={{ color: "var(--lighter-color)" }}
            />
            <span style={{ color: "var(--w-color)" }}>
              {group.members_count}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen
              className="w-4 h-4"
              style={{ color: "var(--lighter-color)" }}
            />
            <span style={{ color: "var(--w-color)" }}>
              {group.active_khatmas}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      className="rounded-lg border cursor-pointer transition-all hover:shadow-lg overflow-hidden group"
      style={{
        background: "var(--main-color)",
        borderColor: "var(--light-color)",
        borderWidth: "1px",
      }}
    >
      {/* Header with gradient */}
      <div
        className="p-4 border-b"
        style={{
          borderColor: "var(--light-color)",
          background: "var(--secondary-color)",
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <DefaultIcon name={group.name} width={12} height={12} />

            <div>
              <h3
                className="font-semibold truncate max-w-[120px]"
                style={{ color: "var(--w-color)" }}
              >
                {group.name}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {group.is_private && (
              <Lock
                className="w-3 h-3"
                style={{ color: "var(--lighter-color)" }}
              />
            )}
            <button
              className="opacity-0 group-hover:opacity-100 p-1 rounded transition-all"
              style={{ background: "var(--input-color)" }}
            >
              <MoreVertical
                className="w-4 h-4"
                style={{ color: "var(--lighter-color)" }}
              />
            </button>
          </div>
        </div>

        <p
          className="text-sm line-clamp-2"
          style={{ color: "var(--lighter-color)" }}
        >
          {group.description || "No description provided"}
        </p>
      </div>

      {/* Stats */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Users
                className="w-4 h-4"
                style={{ color: "var(--lighter-color)" }}
              />
              <span
                className="font-semibold"
                style={{ color: "var(--w-color)" }}
              >
                {group.members_count}
              </span>
            </div>
            <span className="text-xs" style={{ color: "var(--lighter-color)" }}>
              Members
            </span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <BookOpen
                className="w-4 h-4"
                style={{ color: "var(--lighter-color)" }}
              />
              <span
                className="font-semibold"
                style={{ color: "var(--w-color)" }}
              >
                {group.active_khatmas}
              </span>
            </div>
            <span className="text-xs" style={{ color: "var(--lighter-color)" }}>
              Khatmas
            </span>
          </div>
        </div>

        <div
          className="flex items-center justify-between text-xs"
          style={{ color: "var(--lighter-color)" }}
        >
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Created {new Date(group.created_date).toLocaleDateString()}
          </div>
          <span
            className="px-2 py-1 rounded"
            style={{ background: "var(--input-color)" }}
          >
            {group.is_private ? "Private" : "Public"}
          </span>
        </div>
      </div>
    </div>
  );
}
