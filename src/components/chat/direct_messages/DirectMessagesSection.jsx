import DirectMessagesCard from "./DirectMessagesCard";
import useGroupStore from "../../../stores/groupStore";
import { useRouter } from "next/navigation";

export default function DirectMessagesSection() {
  const { groups } = useGroupStore();
  const router = useRouter();

  const handleClick = (group) => {
    router.push(`/chat/groups/${group.id}`);
  };

  return (
    <div className="flex flex-col pt-6">
      {groups?.results.map((group) => (
        <div
          key={group.id}
          onClick={() => handleClick(group)}
          className="flex justify-center items-center"
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
