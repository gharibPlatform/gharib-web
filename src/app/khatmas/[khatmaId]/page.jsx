"use client";
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        await Promise.all([
          fetchKhatmaDetails(khatmaId),
          fetchKhatmaMembership(khatmaId),
        ]);
      } catch (error) {
        console.log("Error fetching khatma data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAll();
  }, [khatmaId]);

  useEffect(() => {
    if (khatmaDetails && khatmaMembership) {
      setIsLoading(false);
      console.log("details : ", khatmaDetails);
      console.log("membership : ", khatmaMembership);
    }
  }, [khatmaDetails, khatmaMembership]);

  return (
    <div>
      {isLoading ? (
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
