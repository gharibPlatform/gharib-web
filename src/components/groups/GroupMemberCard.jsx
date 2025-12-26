import { Users, Crown, MessageSquare, MoreVertical } from "lucide-react";
import DefaultIcon from "../common/icon/DefaultIcon";

export default function GroupMemberCard({ member, isAdmin, role }) {
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
            <DefaultIcon name={member.username} width={10} height={10} />
          </div>
          <div>
            <h3 className="font-semibold" style={{ color: "var(--w-color)" }}>
              {member?.username}
            </h3>
            <div className="flex items-center gap-1">
              {role === "admin" && (
                <Crown
                  className="w-3 h-3"
                  style={{ color: getRoleColor(role) }}
                />
              )}
              <span
                className="text-xs"
                style={{ color: getRoleColor(role) }}
              >
                {role}
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

      <div className="flex gap-2">
        <button
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded text-sm hover:bg-var(--main-color-hover)"
          style={{ color: "var(--b-color)" }}
        >
          <MessageSquare className="w-4 h-4" />
          Message
        </button>
        {isAdmin && role !== "admin" && (
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
