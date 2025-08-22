import DirectMessagesCard from "./DirectMessagesCard";
import useGroupStore from "../../../stores/groupStore";
import useUserStore from "../../../stores/userStore";
import { useRouter } from "next/navigation";

export default function DirectMessagesSection() {
  const { groups } = useGroupStore();
  const { user } = useUserStore();
  const router = useRouter();
  
  const handleGroupClick = (groupId) => {
    router.push(`/chat/groups/${groupId}`);
  };

  const formatLastMessage = (group) => {
    if (group.last_message_sender === user?.username) {
      return `You: ${group.last_message}`;
    } else {
      return `${group.last_message_sender}: ${group.last_message}`;
    }
  };

  const groupsList = groups?.results || groups || [];

  return (
    <div className="flex flex-col pt-6">
      {groupsList.length > 0 ? (
        groupsList.map((group) => {
          return (
            <div
              key={group.id}
              className="flex justify-center items-center cursor-pointer"
              onClick={() => handleGroupClick(group.id)}
            >
              <DirectMessagesCard
                name={group.name}
                icon={group.icon || "/electron.svg"}
                lastMessage={formatLastMessage(group)}
                lastMessageTime={group.last_message_date}
                unreadCount={group.unreadCount || group.unread_count || 0}
              />
            </div>
          );
        })
      ) : (
        <div className="flex justify-center items-center p-4">
          <span className="text-[var(--lighter-color)]">No groups found</span>
        </div>
      )}
    </div>
  );
}