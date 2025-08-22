import DirectMessagesCard from "./DirectMessagesCard";
import useGroupStore from "../../../stores/groupStore";
import { useRouter } from "next/navigation";
export default function DirectMessagesSection() {
  const { groups } = useGroupStore();
  const router = useRouter()

  const handleGroupClick = (groupId) => {
    router.push(`/chat/groups/${groupId}`);
  };

  return (
    <div className="flex flex-col pt-6">
      {groups?.results.map((group) => (
        <div 
          key={group.id} 
          className="flex justify-center items-center cursor-pointer"
          onClick={() => handleGroupClick(group.id)}
        >
          <DirectMessagesCard
            name={group.name}
            icon={"/electron.svg"}
            lastMessage={"hey how have you been ?"}
          />
        </div>
      ))}
    </div>
  );
}