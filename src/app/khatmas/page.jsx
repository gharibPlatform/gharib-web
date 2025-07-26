"use client";
import useKhatmaStore from "@/stores/khatmasStore";
import GroupKhatmas from "../../components/khatmas/GroupKhatmas";
import { useEffect, useState } from "react";

const Page = () => {
  const [isLoading, setIsLoading] = useState();
  const { groupKhatmas, fetchGroupKhatmas } = useKhatmaStore();
  useEffect(() => {
    const fetch = async () => {
      try {
        await fetchGroupKhatmas(14);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
    console.log("Done");
  }, []);

  useEffect(() => {
    groupKhatmas ? setIsLoading(false) : setIsLoading(true);
  }, [groupKhatmas]);

  return (
    <div className="overflow-y-auto">
      {isLoading ? (
        <div className="flex justify-center pt-8 text-[var(--g-color)]">
          Loading kahtmas...
        </div>
      ) : (
        <GroupKhatmas />
      )}
    </div>
  );
};

export default Page;
