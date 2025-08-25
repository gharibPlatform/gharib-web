import DirectMessagesCard from "./DirectMessagesCard";
import useGroupStore from "../../../stores/groupStore";
import useUserStore from "../../../stores/userStore";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { FiSearch, FiX } from "react-icons/fi";

export default function DirectMessagesSection({ searchQuery }) {
  const { groups } = useGroupStore();
  const { user } = useUserStore();
  const router = useRouter();
  const [localSearch, setLocalSearch] = useState("");

  const effectiveSearch = searchQuery !== undefined ? searchQuery : localSearch;

  const handleGroupClick = (groupId) => {
    router.push(`/chat/groups/${groupId}`);
  };

  const formatLastMessage = (group) => {
    if (!group.last_message) {
      return "No messages yet";
    }
    if (group.last_message.sender.username === user?.username) {
      return `You: ${group.last_message.message}`;
    } else {
      return `${group.last_message.sender.username}: ${group.last_message.message}`;
    }
  };

  const filteredAndSortedGroups = useMemo(() => {
    const groupsList = groups?.results || groups || [];

    let filtered = groupsList;
    if (effectiveSearch.trim()) {
      const query = effectiveSearch.toLowerCase();
      filtered = groupsList.filter(
        (group) =>
          group.name.toLowerCase().includes(query) ||
          (group.last_message &&
            group.last_message.message.toLowerCase().includes(query))
      );
    }

    return filtered.sort((a, b) => {
      const aTime = a.last_message?.created_at;
      const bTime = b.last_message?.created_at;

      if (aTime && bTime) {
        return new Date(bTime) - new Date(aTime);
      }

      if (aTime && !bTime) return -1;
      if (!aTime && bTime) return 1;

      return 0;
    });
  }, [groups, effectiveSearch]);

  const showLocalSearch = searchQuery === undefined;

  return (
    <div className="flex flex-col h-full">
      {showLocalSearch && (
        <div className="p-4 border-b border-[var(--g-color)]">
          <div className="relative flex items-center">
            <FiSearch className="absolute left-3 w-4 h-4 text-[var(--lighter-color)]" />
            <input
              type="text"
              placeholder="Search groups..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="pl-10 pr-10 py-2 w-full bg-[var(--input-color)] text-[var(--w-color)] rounded-lg border border-[var(--g-color)] focus:outline-none focus:ring-2 focus:ring-[var(--b-color)]"
            />
            {localSearch && (
              <button
                onClick={() => setLocalSearch("")}
                className="absolute right-3 p-1 text-[var(--lighter-color)] hover:text-[var(--w-color)]"
              >
                <FiX className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Groups list with improved design */}
      <div className="flex-1 overflow-y-auto custom-scrollbar py-2">
        {filteredAndSortedGroups.length > 0 ? (
          filteredAndSortedGroups.map((group) => (
            <div
              key={group.id}
              className="px-4 py-2 hover:bg-[var(--hover-color)] transition-colors cursor-pointer"
              onClick={() => handleGroupClick(group.id)}
            >
              <DirectMessagesCard
                name={group.name}
                icon={group.icon || "/electron.svg"}
                lastMessage={formatLastMessage(group)}
                lastMessageTime={
                  group.last_message ? group.last_message.created_at : null
                }
                unreadCount={group.unreadCount || group.unread_count || 0}
                searchQuery={effectiveSearch} 
                groupId={group.id}
              />
            </div>
          ))
        ) : effectiveSearch ? (
          <div className="flex flex-col items-center justify-center h-40 gap-3 p-4 text-center">
            <FiSearch className="w-8 h-8 text-[var(--lighter-color)]" />
            <p className="text-[var(--lighter-color)]">
              No groups found for "
              <span className="text-[var(--w-color)]">{effectiveSearch}</span>"
            </p>
            <p className="text-sm text-[var(--lighter-color)]">
              Try searching with different terms
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 gap-3 p-4 text-center">
            <div className="p-3 rounded-full bg-[var(--secondary-color)]">
              <FiSearch className="w-8 h-8 text-[var(--lighter-color)]" />
            </div>
            <p className="text-[var(--lighter-color)]">No groups yet</p>
            <p className="text-sm text-[var(--lighter-color)]">
              Create a new group to start chatting
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
