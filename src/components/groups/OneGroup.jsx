import { useState, useMemo } from "react";
import CreateKhatmaModal from "../quran/quranRightbar/CreateKhatmaModal";
import { SettingsModal } from "./OneGroupSettingsModal";
import { GroupHeader } from "./OneGroupHeader";
import { GroupTabs } from "./OneGroupTabs";
import { GroupToolbar } from "./OneGroupToolbar";
import { GroupContent } from "./OneGroupContent";

export default function OneGroup({ group, groupKhatmas }) {
  const [activeTab, setActiveTab] = useState("members");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateKhatmaModal, setShowCreateKhatmaModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [memberFilter, setMemberFilter] = useState("all");

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
  const isAdmin = true;

  const filteredMembers = useMemo(() => {
    return group?.memberships?.filter((member) => {
      const matchesSearch = member.user.username
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

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      console.log("Saving settings:", { notificationSettings, adminSettings });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setShowSettingsModal(false);
    } catch (error) {
      console.error("Failed to save settings:", error);
    } finally {
      setLoading(false);
    }
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

      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        notificationSettings={notificationSettings}
        setNotificationSettings={setNotificationSettings}
        adminSettings={adminSettings}
        setAdminSettings={setAdminSettings}
        isAdmin={isAdmin}
        group={group}
        loading={loading}
        onSave={handleSaveSettings}
      />

      {/* Header */}
      <GroupHeader
        group={group}
        isAdmin={isAdmin}
        onOpenSettings={() => setShowSettingsModal(true)}
      />

      {/* Tabs */}
      <GroupTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        membersCount={group?.memberships?.length || 0}
        khatmasCount={groupKhatmas?.length || 0}
      />

      {/* Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <GroupToolbar
          activeTab={activeTab}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          memberFilter={memberFilter}
          onMemberFilterChange={setMemberFilter}
          isAdmin={isAdmin}
          onInviteMembers={() => {}}
          onCreateKhatma={() => setShowCreateKhatmaModal(true)}
        />

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <GroupContent
            activeTab={activeTab}
            filteredMembers={filteredMembers}
            filteredKhatmas={filteredgroupKhatmas}
            isAdmin={isAdmin}
            groupId={group.id}
            searchQuery={searchQuery}
          />
        </div>
      </div>
    </div>
  );
}
