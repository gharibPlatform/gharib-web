"use client";
import useKhatmasContentStore from "@/stores/khatmasStore";
import KhatmasContent from "@/components/khatmas/KhatmasContent";
import { useEffect } from "react";

const Page = () => {
  const { name, percentage, timeLeft, status, personalProgress } = useKhatmasContentStore();

  useEffect(() => {
    console.log("Current Khatmas Content:", { name, percentage, timeLeft, status, personalProgress });
  }, [name, percentage, timeLeft, status, personalProgress]);

  return (
    <div>
      <KhatmasContent 
        nameHeader={name} 
        percentage={percentage} 
        timeLeft={timeLeft} 
        status={status} 
        personalProgress={personalProgress} 
      />
    </div>
  );
}

export default Page;
