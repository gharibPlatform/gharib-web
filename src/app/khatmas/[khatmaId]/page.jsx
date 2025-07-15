"use client";
import KhatmasContent from "@/components/khatmas/KhatmasContent";
import useKhatmaStore from "@/stores/khatmasStore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const { khatmaId } = useParams();
  const { khatmaDetails, fetchKhatmaDetails } = useKhatmaStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchKhatmaContentFunction = async () => {
      try {
        await fetchKhatmaDetails(khatmaId);
      } catch (error) {
        console.log("An error occured when trying to fetch khatmas : ", error);
        setIsLoading(false);
      }
    };
    fetchKhatmaContentFunction();
    console.log("done and the khatmaId is : ", khatmaId);
  }, [khatmaId]);

  useEffect(() => {
    if (khatmaDetails) {
      setIsLoading(false);
    }
  }, [khatmaDetails]);

  return (
    <div>
      {isLoading ? (
        <div className="text-[var(--lighter-color)] text-lg pt-4 text-center mx-auto w-fit">
          Loading your khatma details...
        </div>
      ) : (
        <KhatmasContent
          nameHeader={khatmaDetails.name}
          percentage={khatmaDetails.percentage}
          timeLeft={khatmaDetails.timeLeft}
          status={khatmaDetails.status}
          personalProgress={khatmaDetails.personalProgress}
        />
      )}
    </div>
  );
};

export default Page;
