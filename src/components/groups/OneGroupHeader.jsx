import { useRouter } from "next/navigation";
import { Users, ArrowLeft, Settings, MoreVertical } from "lucide-react";
import { ActionButton } from "../common/buttons/ActionButton";

export const GroupHeader = ({
  group,
  isAdmin,
  onOpenSettings,
}) => {
  const router = useRouter();

  return (
    <div
      className="px-6 py-6 border-b"
      style={{ borderColor: "var(--light-color)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg hover:bg-var(--main-color-hover)"
            style={{ background: "var(--input-color)" }}
          >
            <ArrowLeft
              className="w-5 h-5"
              style={{ color: "var(--lighter-color)" }}
            />
          </button>
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ background: "var(--b-color)" }}
            >
              <Users
                className="w-6 h-6"
                style={{ color: "var(--w-color)" }}
              />
            </div>
            <div>
              <h1
                className="text-2xl font-semibold"
                style={{ color: "var(--w-color)" }}
              >
                {group.name}
              </h1>
              <p
                className="text-sm"
                style={{ color: "var(--lighter-color)" }}
              >
                {group.members_count} members • {group.active_groupKhatmas}{" "}
                active groupKhatmas
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isAdmin && (
            <ActionButton
              label="Group Settings"
              onClick={onOpenSettings}
              isDisabled={false}
              value={"settings"}
              isDirty={true}
              icon={<Settings className="w-4 h-4" />}
              className="px-4 py-2"
            />
          )}
          <button
            className="p-2 rounded-lg hover:bg-var(--main-color-hover)"
            style={{ background: "var(--input-color)" }}
          >
            <MoreVertical
              className="w-5 h-5"
              style={{ color: "var(--lighter-color)" }}
            />
          </button>
        </div>
      </div>

      {/* Description */}
      <p
        className="text-sm max-w-3xl"
        style={{ color: "var(--lighter-color)" }}
      >
        {group.description || "No description provided for this group."}
      </p>
    </div>
  );
};