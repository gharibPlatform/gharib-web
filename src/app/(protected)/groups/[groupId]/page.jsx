"use client";
import { useEffect, useState } from "react";
import useGroupStore from "../../../../stores/group/groupStore";
import OneGroup from "@/components/groups/OneGroup";
import { useParams } from "next/navigation";
import useKhatmaStore from "../../../../stores/khatamat/khatmasStore";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { group, fetchOneGroup } = useGroupStore();
  const { groupKhatmas, fetchGroupKhatmas } = useKhatmaStore();
  const params = useParams();
  const groupId = params.groupId;

  useEffect(() => {
    const fetch = async () => {
      try {
        console.log("Fetching group with id:", groupId);
        await fetchOneGroup(groupId);
        await fetchGroupKhatmas(groupId);
        console.log("Done fetching");
      } catch (error) {
        console.log("Error:", error);
      }
    };
    if (groupId) fetch();
  }, [groupId, fetchOneGroup]);

  useEffect(() => {
    if (group) {
      setIsLoading(false);
      console.log("Group loaded:", group);
    }
  }, [group]);

  return (
    <div className="h-full overflow-hidden ">
      {isLoading ? (
        <div className="flex justify-center pt-8 text-[var(--g-color)]">
          Loading Group...
        </div>
      ) : (
        <OneGroup group={group} groupKhatmas={groupKhatmas} />
      )}
    </div>
  );
};

export default Page;
