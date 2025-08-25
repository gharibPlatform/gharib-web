import DirectMessagesCard from "./DirectMessagesCard";
import useGroupStore from "../../../stores/groupStore";
import useUserStore from "../../../stores/userStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DirectMessagesSection() {
  const { groups } = useGroupStore();
  const { user } = useUserStore();
  const router = useRouter();


  useEffect(()=>{

  },[groups])
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

  const groupsList = groups?.results || groups || [];

  const sortedGroups = groupsList.sort((a, b) => {
    const aTime = a.last_message?.created_at;
    const bTime = b.last_message?.created_at;
    
    if (aTime && bTime) {
      return new Date(bTime) - new Date(aTime);
    }
    
    if (aTime && !bTime) return -1;
    if (!aTime && bTime) return 1;
    
    return 0;
  });


  return (
    <div className="flex flex-col pt-6">

      {sortedGroups.length > 0 ? (
        sortedGroups.map((group) => (
          <div
            key={group.id}
            className="flex justify-center items-center cursor-pointer"
            onClick={() => handleGroupClick(group.id)}
          >
            <DirectMessagesCard
              name={group.name}
              icon={group.icon || "/electron.svg"}
              lastMessage={formatLastMessage(group)}
              lastMessageTime={group.last_message ? group.last_message.created_at : null}
              unreadCount={group.unreadCount || group.unread_count || 0}
            />
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center p-4">
          <span className="text-[var(--lighter-color)]">No groups found</span>
        </div>
      )}
    </div>
  );
}