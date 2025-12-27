import { ActionButton } from "../common/buttons/ActionButton";
import GroupCard from "./GroupCard";
import GroupFilter from "./GroupFilter";
import useGroupStore from "../../stores/groupStore";
import { useState, useMemo, useRef, useEffect } from "react";
import { Users, Search, Grid, List, Key } from "lucide-react";
import CreateDM from "../chat/create_dm/CreateDM";
import { joinGroupByCode } from "../../utils/group/apiGroupShare";
import JoinGroupModal from "./JoinGroupModal";

export default function GroupsListing() {
  const [activeFilters, setActiveFilters] = useState([]);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showJoinGroupModal, setShowJoinGroupModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const { groups, refreshGroups } = useGroupStore();

  const handleJoinGroup = async (code) => {
    try {
      const data = await joinGroupByCode({ code });
      console.log("Joined group response:", data);

      setTimeout(() => {
        refreshGroups();
      }, 1000);

      setShowJoinGroupModal(false);
      return data;
    } catch (error) {
      console.error("Error joining group:", error);
      throw error;
    }
  };
  const filteredGroups = useMemo(() => {
    if (!groups) return [];

    return groups.filter((group) => {
      const matchesSearch =
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilters =
        activeFilters.length === 0 ||
        activeFilters.some((filter) => {
          switch (filter) {
            case "active":
              return group.status === "active";
            case "archived":
              return group.status === "archived";
            case "large":
              return group.members_count >= 10;
            case "small":
              return group.members_count < 5;
            case "has-khatmas":
              return group.active_khatmas > 0;
            case "no-khatmas":
              return group.active_khatmas === 0;
            default:
              return true;
          }
        });

      return matchesSearch && matchesFilters;
    });
  }, [groups, activeFilters, searchQuery]);

  const getEmptyStateMessage = () => {
    if (searchQuery || activeFilters.length > 0) {
      return {
        title: "No groups found",
        subtitle: "Try adjusting your search or filters",
        icon: Search,
      };
    }
    return {
      title: "No groups yet",
      subtitle: "Create or join a group to get started",
      icon: Users,
    };
  };

  const emptyState = getEmptyStateMessage();
  const EmptyStateIcon = emptyState.icon;

  return (
    <div
      className="h-full flex flex-col overflow-hidden"
      style={{ background: "var(--main-color)" }}
    >
      {/* Modals */}
      {showCreateGroupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 backdrop-blur-sm transition-opacity">
          <div className="animate-scaleIn">
            <CreateDM close={() => setShowCreateGroupModal(false)} />
          </div>
        </div>
      )}

      {showJoinGroupModal && (
        <JoinGroupModal
          onClose={() => setShowJoinGroupModal(false)}
          onSubmit={handleJoinGroup}
        />
      )}

      {/* Header Section */}
      <div
        className="px-6 py-6 border-b"
        style={{ borderColor: "var(--light-color)" }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1
              className="text-3xl font-semibold mb-2"
              style={{ color: "var(--w-color)" }}
            >
              Groups
            </h1>
            <p className="text-base" style={{ color: "var(--lighter-color)" }}>
              Collaborate with others on Quran study
            </p>
          </div>
          <div className="flex gap-3">
            <ActionButton
              label="Join Group"
              onClick={() => setShowJoinGroupModal(true)}
              className="px-4 py-2"
              isDisabled={false}
              value={"join-group"}
              isDirty={true}
              icon={<Key className="w-4 h-4" />}
            />
            <ActionButton
              label="Create Group"
              onClick={() => setShowCreateGroupModal(true)}
              className="px-4 py-2"
              isDisabled={false}
              value={"create-group"}
              isDirty={true}
              icon={<Users className="w-4 h-4" />}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="relative w-80">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
              style={{ color: "var(--lighter-color)" }}
            />
            <input
              type="text"
              placeholder="Search groups..."
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

          <div className="flex items-center gap-4">
            <div
              className="flex rounded-[6px] p-1"
              style={{ background: "var(--input-color)" }}
            >
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${viewMode === "grid" ? "bg-var(--main-color-hover)" : "hover:bg-var(--main-color-hover)"}`}
                style={{
                  backgroundColor:
                    viewMode === "grid"
                      ? "var(--main-color-hover)"
                      : "transparent",
                  color: "var(--lighter-color)",
                }}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${viewMode === "list" ? "bg-var(--main-color-hover)" : "hover:bg-var(--main-color-hover)"}`}
                style={{
                  backgroundColor:
                    viewMode === "list"
                      ? "var(--main-color-hover)"
                      : "transparent",
                  color: "var(--lighter-color)",
                }}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            <GroupFilter onFilterChange={setActiveFilters} />
          </div>
        </div>
      </div>

      <div className="flex-1 px-6 py-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div style={{ color: "var(--lighter-color)" }}>
            Showing {filteredGroups.length}{" "}
            {filteredGroups.length === 1 ? "group" : "groups"}
            {(searchQuery || activeFilters.length > 0) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilters([]);
                }}
                className="ml-2 hover:text-blue-300"
                style={{ color: "var(--b-color)" }}
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {filteredGroups.length > 0 ? (
          <div
            className={`
            ${
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4 max-w-4xl"
            }
          `}
          >
            {filteredGroups.map((group) => (
              <GroupCard key={group.id} group={group} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
              style={{ background: "var(--input-color)" }}
            >
              <EmptyStateIcon
                className="w-10 h-10"
                style={{ color: "var(--lighter-color)" }}
              />
            </div>
            <h3
              className="text-xl font-medium mb-3"
              style={{ color: "var(--w-color)" }}
            >
              {emptyState.title}
            </h3>
            <p
              className="text-center max-w-md mb-6"
              style={{ color: "var(--lighter-color)" }}
            >
              {emptyState.subtitle}
            </p>
            <div className="flex gap-3">
              <ActionButton
                label="Join Group by Code"
                onClick={() => setShowJoinGroupModal(true)}
                className="px-4 py-2"
                isDisabled={false}
                value={"join-group"}
                isDirty={true}
                icon={<Key className="w-4 h-4" />}
              />
              <ActionButton
                label="Create Group"
                onClick={() => setShowCreateGroupModal(true)}
                className="px-4 py-2"
                isDisabled={false}
                value={"create-group"}
                isDirty={true}
                icon={<Users className="w-4 h-4" />}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
