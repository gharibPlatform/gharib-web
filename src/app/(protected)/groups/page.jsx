"use client";
import GroupsListing from "../../../components/groups/GroupsListing";
import { useEffect, useState } from "react";
import useGroupStore from "../../../stores/group/groupStore";

const Page = () => {
  const [isLoading, setIsLoading] = useState();
  const { groups, fetchGroups, fetchOneGroup } = useGroupStore();

  useEffect(() => {
    const fetch = async () => {
      try {
        await fetchGroups();
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
    console.log("Done");
  }, []);

  useEffect(() => {
    groups ? setIsLoading(false) : setIsLoading(true);
  }, [groups]);

  return (
    <div className="h-full overflow-hidden ">
      {isLoading ? (
        <div className="flex justify-center pt-8 text-[var(--g-color)]">
          Loading Groups...
        </div>
      ) : (
        <GroupsListing />
      )}
    </div>
  );
};

export default Page;
