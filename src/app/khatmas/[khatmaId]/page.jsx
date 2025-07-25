"use client";
import useGroupStore from "../../../stores/groupStore";
import KhatmasContent from "../../../components/khatmas/khatma_content/KhatmasContent";
import useKhatmaStore from "../../../stores/khatmasStore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const { khatmaId } = useParams();
  const {
    khatmaMembership,
    khatmaDetails,
    fetchKhatmaDetails,
    fetchKhatmaMembership,
  } = useKhatmaStore();

  const { group, fetchOneGroup } = useGroupStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await Promise.all([
          fetchKhatmaDetails(khatmaId),
          fetchKhatmaMembership(khatmaId),
        ]);
        
        if (khatmaDetails?.group_data?.id) {
          await fetchOneGroup(khatmaDetails.group_data.id);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [khatmaId, khatmaDetails?.group_data?.id]);

  return (
    <div>
      {isLoading || !khatmaDetails || !khatmaMembership || !group ? (
        <div className="text-[var(--lighter-color)] text-lg pt-4 text-center mx-auto w-fit">
          Loading your khatma details...
        </div>
      ) : (
        <KhatmasContent />
      )}
    </div>
  );
};

export default Page;