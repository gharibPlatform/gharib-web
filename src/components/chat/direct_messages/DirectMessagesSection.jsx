import DirectMessagesCard from "./DirectMessagesCard";
import useGroupStore from "../../../stores/groupStore";

export default function DirectMessagesSection() {
  const { groups } = useGroupStore();

  return (
    <div className="flex flex-col pt-6">
      {groups?.results.map((group) => (
        <div key={group.id} className="flex justify-center items-center">
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
