import { Search, UserPlus, Plus } from "lucide-react";
import { ActionButton } from "../common/buttons/ActionButton";

export const GroupToolbar = ({
  activeTab,
  searchQuery,
  onSearchChange,
  memberFilter,
  onMemberFilterChange,
  isAdmin,
  onInviteMembers,
  onCreateKhatma,
}) => {
  return (
    <div
      className="px-6 py-4 border-b"
      style={{ borderColor: "var(--light-color)" }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-80">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
              style={{ color: "var(--lighter-color)" }}
            />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none"
              style={{
                background: "var(--input-color)",
                border: "1px solid var(--light-color)",
                color: "var(--w-color)",
                caretColor: "var(--w-color)",
              }}
            />
          </div>

          {activeTab === "members" && (
            <select
              value={memberFilter}
              onChange={(e) => onMemberFilterChange(e.target.value)}
              className="px-3 py-2 rounded-lg focus:outline-none"
              style={{
                background: "var(--input-color)",
                border: "1px solid var(--light-color)",
                color: "var(--w-color)",
              }}
            >
              <option value="all">All Members</option>
              <option value="admin">Admins</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          )}
        </div>

        <div className="flex items-center gap-3">
          {activeTab === "members" && isAdmin && (
            <ActionButton
              label="Invite Members"
              onClick={onInviteMembers}
              icon={<UserPlus className="w-4 h-4" />}
              className="px-4 py-2"
            />
          )}
          {activeTab === "groupKhatmas" && isAdmin && (
            <ActionButton
              label="Create Khatma"
              onClick={onCreateKhatma}
              isDisabled={false}
              value={"create-khatma"}
              isDirty={true}
              icon={<Plus className="w-4 h-4" />}
              className="px-4 py-2"
            />
          )}
        </div>
      </div>
    </div>
  );
};
