import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  BookOpen,
  Settings,
  ArrowLeft,
  Plus,
  Search,
  MoreVertical,
  UserPlus,
} from "lucide-react";
import { ActionButton } from "../common/buttons/ActionButton";
import GroupMemberCard from "./GroupMemberCard";
import GroupKhatmaCard from "./GroupKhatmaCard";
import CreateKhatmaModal from "../common/quran/quranRightbar/CreateKhatmaModal";
import UserSettingsTab from "../chat/chat_content/chat_sidebar/UserSettingsTab";
import AdminSettingsTab from "../chat/chat_content/chat_sidebar/AdminSettingsTab";

export default function OneGroup({ group, groupKhatmas }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("members");
  const [searchQuery, setSearchQuery] = useState("");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showCreateKhatmaModal, setShowCreateKhatmaModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [memberFilter, setMemberFilter] = useState("all");

  // Settings states
  const [notificationSettings, setNotificationSettings] = useState({
    enabled: true,
  });

  const [adminSettings, setAdminSettings] = useState({
    can_add_member: "all",
    can_add_member_custom: [],
    can_send_message: "all",
    can_send_message_custom: [],
    all_can_launch_khatma: true,
    all_can_manage_code: false,
    max_khatma_participants: 10,
    khatma_update_timeout: 60,
  });

  const [loading, setLoading] = useState(false);

  const filteredMembers = useMemo(() => {
    return group?.members?.filter((member) => {
      const matchesSearch = member.username
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesFilter = memberFilter === "all";
      return matchesSearch && matchesFilter;
    });
  }, [group, searchQuery, memberFilter]);

  const filteredgroupKhatmas = useMemo(() => {
    return groupKhatmas?.filter((khatma) =>
      khatma.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [groupKhatmas, searchQuery]);

  const isAdmin = true;

  // Handle save settings
  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      // Here you would typically make an API call to save the settings
      console.log("Saving settings:", { notificationSettings, adminSettings });
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setShowSettingsModal(false);
    } catch (error) {
      console.error("Failed to save settings:", error);
    } finally {
      setLoading(false);
    }
  };

  // Settings Modal Component
  const SettingsModal = () => {
    const [settingsTab, setSettingsTab] = useState("user");

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div
          className="rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
          style={{ background: "var(--main-color)" }}
        >
          {/* Header */}
          <div
            className="px-6 py-4 border-b flex items-center justify-between"
            style={{ borderColor: "var(--light-color)" }}
          >
            <h2
              className="text-xl font-semibold"
              style={{ color: "var(--w-color)" }}
            >
              Group Settings
            </h2>
            <button
              onClick={() => setShowSettingsModal(false)}
              className="p-2 rounded-lg hover:bg-var(--main-color-hover)"
              style={{ background: "var(--input-color)" }}
            >
              <ArrowLeft
                className="w-5 h-5"
                style={{ color: "var(--lighter-color)" }}
              />
            </button>
          </div>

          {/* Settings Tabs */}
          <div
            className="px-6 border-b"
            style={{ borderColor: "var(--light-color)" }}
          >
            <div className="flex gap-8">
              <button
                onClick={() => setSettingsTab("user")}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  settingsTab === "user"
                    ? "border-var(--b-color) text-var(--b-color)"
                    : "border-transparent text-var(--lighter-color) hover:text-var(--w-color)"
                }`}
                style={{
                  borderColor:
                    settingsTab === "user" ? "var(--b-color)" : "transparent",
                  color:
                    settingsTab === "user"
                      ? "var(--b-color)"
                      : "var(--lighter-color)",
                }}
              >
                User Settings
              </button>
              {isAdmin && (
                <button
                  onClick={() => setSettingsTab("admin")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    settingsTab === "admin"
                      ? "border-var(--b-color) text-var(--b-color)"
                      : "border-transparent text-var(--lighter-color) hover:text-var(--w-color)"
                  }`}
                  style={{
                    borderColor:
                      settingsTab === "admin"
                        ? "var(--b-color)"
                        : "transparent",
                    color:
                      settingsTab === "admin"
                        ? "var(--b-color)"
                        : "var(--lighter-color)",
                  }}
                >
                  Admin Settings
                </button>
              )}
            </div>
          </div>

          {/* Settings Content */}
          <div className="flex-1 overflow-auto">
            {settingsTab === "user" ? (
              <UserSettingsTab
                notificationSettings={notificationSettings}
                setNotificationSettings={setNotificationSettings}
              />
            ) : (
              <AdminSettingsTab
                adminSettings={adminSettings}
                setAdminSettings={setAdminSettings}
                group={group}
                loading={loading}
                onSave={handleSaveSettings}
              />
            )}
          </div>

          {/* Footer Actions */}
          <div
            className="px-6 py-4 border-t flex justify-end gap-3"
            style={{ borderColor: "var(--light-color)" }}
          >
            <ActionButton
              label="Cancel"
              onClick={() => setShowSettingsModal(false)}
              isDisabled={loading}
              value={false}
              isDirty={false}
              className="px-4 py-2"
            />
            <ActionButton
              label={loading ? "Saving..." : "Save Settings"}
              onClick={handleSaveSettings}
              isDisabled={loading}
              value={true}
              isDirty={true}
              className="px-4 py-2"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="h-full flex flex-col overflow-hidden"
      style={{ background: "var(--main-color)" }}
    >
      {/* Modals */}
      <CreateKhatmaModal
        isOpen={showCreateKhatmaModal}
        onClose={() => setShowCreateKhatmaModal(false)}
        groupId={group.id}
      />

      {showSettingsModal && <SettingsModal />}

      {/* Header */}
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
                onClick={() => setShowSettingsModal(true)}
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

      {/* Tabs */}
      <div
        className="px-6 border-b"
        style={{ borderColor: "var(--light-color)" }}
      >
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab("members")}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "members"
                ? "border-var(--b-color) text-var(--b-color)"
                : "border-transparent text-var(--lighter-color) hover:text-var(--w-color)"
            }`}
            style={{
              borderColor:
                activeTab === "members" ? "var(--b-color)" : "transparent",
              color:
                activeTab === "members"
                  ? "var(--b-color)"
                  : "var(--lighter-color)",
            }}
          >
            Members ({group?.members?.length})
          </button>
          <button
            onClick={() => setActiveTab("groupKhatmas")}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "groupKhatmas"
                ? "border-var(--b-color) text-var(--b-color)"
                : "border-transparent text-var(--lighter-color) hover:text-var(--w-color)"
            }`}
            style={{
              borderColor:
                activeTab === "groupKhatmas" ? "var(--b-color)" : "transparent",
              color:
                activeTab === "groupKhatmas"
                  ? "var(--b-color)"
                  : "var(--lighter-color)",
            }}
          >
            groupKhatmas ({groupKhatmas.length})
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
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
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                  onChange={(e) => setMemberFilter(e.target.value)}
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
                  onClick={() => setShowInviteModal(true)}
                  icon={<UserPlus className="w-4 h-4" />}
                  className="px-4 py-2"
                />
              )}
              {activeTab === "groupKhatmas" && isAdmin && (
                <ActionButton
                  label="Create Khatma"
                  onClick={() => setShowCreateKhatmaModal(true)}
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

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {activeTab === "members" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMembers.map((member) => (
                <GroupMemberCard
                  key={member.id}
                  member={member}
                  isAdmin={isAdmin}
                  groupId={group.id}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredgroupKhatmas.map((khatma) => (
                <GroupKhatmaCard
                  key={khatma.id}
                  khatma={khatma}
                  groupId={group.id}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {(activeTab === "members"
            ? filteredMembers.length === 0
            : filteredgroupKhatmas.length === 0) && (
            <div className="flex flex-col items-center justify-center py-20">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
                style={{ background: "var(--input-color)" }}
              >
                {activeTab === "members" ? (
                  <Users
                    className="w-10 h-10"
                    style={{ color: "var(--lighter-color)" }}
                  />
                ) : (
                  <BookOpen
                    className="w-10 h-10"
                    style={{ color: "var(--lighter-color)" }}
                  />
                )}
              </div>
              <h3
                className="text-xl font-medium mb-3"
                style={{ color: "var(--w-color)" }}
              >
                No {activeTab} found
              </h3>
              <p
                className="text-center max-w-md mb-6"
                style={{ color: "var(--lighter-color)" }}
              >
                {searchQuery
                  ? "Try adjusting your search terms"
                  : `This group has no ${activeTab} yet`}
              </p>
              {!searchQuery && isAdmin && (
                <ActionButton
                  label={
                    activeTab === "members"
                      ? "Invite your first member"
                      : "Create your first khatma"
                  }
                  onClick={
                    activeTab === "members"
                      ? () => setShowInviteModal(true)
                      : () => setShowCreateKhatmaModal(true)
                  }
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
