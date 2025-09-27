import { Users, Crown, MessageSquare, MoreVertical } from "lucide-react";

export default function GroupMemberCard({ member, isAdmin, groupId }) {
  const getRoleColor = (role) => {
    return role === "admin" ? "var(--o-color)" : "var(--lighter-color)";
  };

  return (
    <div
      className="rounded-lg border p-4 transition-all hover:shadow-lg"
      style={{
        background: "var(--main-color)",
        borderColor: "var(--light-color)",
        borderWidth: "1px",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "var(--b-color)" }}
          >
            <Users className="w-5 h-5" style={{ color: "var(--w-color)" }} />
          </div>
          <div>
            <h3 className="font-semibold" style={{ color: "var(--w-color)" }}>
              {member.name}
            </h3>
            <div className="flex items-center gap-1">
              {member.role === "admin" && (
                <Crown
                  className="w-3 h-3"
                  style={{ color: getRoleColor(member.role) }}
                />
              )}
              <span
                className="text-xs"
                style={{ color: getRoleColor(member.role) }}
              >
                {member.role}
              </span>
            </div>
          </div>
        </div>
        <button className="p-1 rounded hover:bg-var(--input-color)">
          <MoreVertical
            className="w-4 h-4"
            style={{ color: "var(--lighter-color)" }}
          />
        </button>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-xs">
          <span style={{ color: "var(--lighter-color)" }}>Status:</span>
          <span
            className="px-2 py-1 rounded-full"
            style={{
              color:
                member.status === "active"
                  ? "var(--b-color)"
                  : "var(--lighter-color)",
              background:
                member.status === "active"
                  ? "var(--b-color)20"
                  : "var(--input-color)",
            }}
          >
            {member.status}
          </span>
        </div>
        <div className="flex justify-between text-xs">
          <span style={{ color: "var(--lighter-color)" }}>Joined:</span>
          <span style={{ color: "var(--w-color)" }}>
            {new Date(member.joinDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded text-sm hover:bg-var(--main-color-hover)"
          style={{ color: "var(--b-color)" }}
        >
          <MessageSquare className="w-4 h-4" />
          Message
        </button>
        {isAdmin && member.role !== "admin" && (
          <button
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded text-sm hover:bg-var(--main-color-hover)"
            style={{ color: "var(--o-color)" }}
          >
            <Crown className="w-4 h-4" />
            Make Admin
          </button>
        )}
      </div>
    </div>
  );
}
