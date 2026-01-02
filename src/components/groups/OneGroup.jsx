import { useState, useMemo } from "react";
import { UserPlus } from "lucide-react";
import CreateKhatmaModal from "../khatmas/create_khatma/CreateKhatmaModal";
import JoinKhatmaModal from "../khatmas/create_khatma/JoinKhatmaModal";
import { SettingsModal } from "./OneGroupSettingsModal";
import { GroupHeader } from "./OneGroupHeader";
import { GroupTabs } from "./OneGroupTabs";
import { GroupToolbar } from "./OneGroupToolbar";
import { GroupContent } from "./OneGroupContent";
import useUserStore from "../../stores/user/userStore";
import InviteMembersModal from "./InviteMembersModal";
import { createKhatma } from "../../utils/khatma/apiKhatma";
import { postKhatmaMembership } from "../../utils/khatma/apiKhatma";

export default function OneGroup({ group, groupKhatmas }) {
  const { user } = useUserStore();

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showCreateKhatmaModal, setShowCreateKhatmaModal] = useState(false);
  const [showJoinKhatmaModal, setShowJoinKhatmaModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const [lastCreatedKhatma, setLastCreatedKhatma] = useState(null);

  const [activeTab, setActiveTab] = useState("members");
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleInviteMembers = async (usernames) => {
    console.log("Inviting members:", usernames);
  };

  const handleCreateKhatma = (khatmaData) => {
    createKhatma(khatmaData).then((res) => {
      setLastCreatedKhatma(res);
      setShowCreateKhatmaModal(false);
      setShowJoinKhatmaModal(true);
    });
  };

  const handleJoinKhatma = async (khatma, userSettings) => {
    try {
      await postKhatmaMembership(khatma.id, userSettings);
      console.log("Successfully joined khatma:", khatma.name);
    } catch (error) {
      console.error("Error joining khatma:", error);
      throw error;
    }
  };

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

  const isAdmin = group.memberships?.some(
    (membership) =>
      membership.user.id === user?.id && membership.role === "admin"
  );

  return (
    <div
      className="h-full flex flex-col overflow-hidden"
      style={{ background: "var(--main-color)" }}
    >
      {/* Modals */}
      <CreateKhatmaModal
        isOpen={showCreateKhatmaModal}
        onClose={() => setShowCreateKhatmaModal(false)}
        onSubmit={handleCreateKhatma}
        groupId={group.id}
      />

      <JoinKhatmaModal
        isOpen={showJoinKhatmaModal}
        onClose={() => {
          setShowJoinKhatmaModal(false);
          setLastCreatedKhatma(null);
        }}
        onJoin={handleJoinKhatma}
        khatma={lastCreatedKhatma}
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
          onInviteMembers={() => setShowInviteModal(true)}
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

        <button
          onClick={() => setShowInviteModal(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-[var(--bright-b-color)] to-[var(--b-color)] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
        >
          <UserPlus size={24} />
        </button>

        {showInviteModal && (
          <InviteMembersModal
            onClose={() => setShowInviteModal(false)}
            onInviteMembers={handleInviteMembers}
            groupName={group.name}
            groupId={group.id}
          />
        )}
      </div>
    </div>
  );
}
