"use client";
import useKhatmasContentStore from "@/stores/khatmasStore";
import { useEffect } from "react";
import GroupKhatmas from "@/components/khatmas/GroupKhatmas";
import ChatHeader from "@/components/chat/ChatHeader";
import useNameHeaderStore from "@/stores/nameHeaderStore";

const Page = () => {
  const { name, percentage, timeLeft, status, personalProgress } = useKhatmasContentStore();

  useEffect(() => {
    console.log("Current Khatmas Content:", { name, percentage, timeLeft, status, personalProgress });
  }, [name, percentage, timeLeft, status, personalProgress]);

  const headerName = useNameHeaderStore((state) => state.nameHeader);
  console.log("The name is : ", {headerName})

  return (
    <div className="overflow-y-auto"> 
      <ChatHeader Name={headerName} />
      <GroupKhatmas />
    </div>
  );
}

export default Page;
