import { useEffect, useState } from "react";
import useGroupStore from "../../../stores/groupStore";
import DirectMessagesCard from "./DirectMessagesCard";

export default function DirectMessagesSection() {
  const { groups, fetchGroups } = useGroupStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        await fetchGroups();
      } catch (err) {
        setError("Failed to load groups. Please try again.");
        console.error("Error fetching groups:", err);
      }
    };

    load();
  }, []);

  useEffect(() => {
    if (groups) {
      setIsLoading(false);
    }
    console.log(groups);
  }, [groups]);

  return (
    <div className="flex flex-col pt-2">
      {isLoading && (
        <div className="flex justify-center items-center h-20">
          <p className="text-[var(--lighter-color)]">Loading groups...</p>
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center h-20">
          <p className="text-[var(--bright-r-color)]">{error}</p>
        </div>
      )}

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
