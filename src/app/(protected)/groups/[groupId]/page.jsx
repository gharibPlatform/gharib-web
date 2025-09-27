"use client";
import { useEffect, useState } from "react";
import useGroupStore from "../../../../stores/groupStore";
import OneGroup from "@/components/groups/OneGroup";
import { useParams } from "next/navigation";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { group, fetchOneGroup } = useGroupStore();
  const params = useParams();
  const groupId = params.groupId; // check your folder name!

  console.log("params: ", params); // 🔹 log this first

  useEffect(() => {
    const fetch = async () => {
      try {
        console.log("Fetching group with id:", groupId);
        await fetchOneGroup(groupId);
        console.log("Done fetching");
      } catch (error) {
        console.log("Error:", error);
      }
    };
    if (groupId) fetch();
  }, [groupId, fetchOneGroup]);

  useEffect(() => {
    if (group) {
      console.log("group is : ", group);
      setIsLoading(false);
    }
  }, [group]);

  return (
    <div className="h-full overflow-hidden ">
      {isLoading ? (
        <div className="flex justify-center pt-8 text-[var(--g-color)]">
          Loading Group...
        </div>
      ) : (
        <OneGroup group={group} />
      )}
    </div>
  );
};

export default Page;
