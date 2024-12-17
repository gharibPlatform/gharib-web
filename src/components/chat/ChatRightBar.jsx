"use client";

import { useEffect, useState } from "react";
import ChatBrotherSection from "./brothers/ChatBrothersSection";
import ChatGroupsSection from "./groups/ChatGroupsSection";
import ChatKhatmasSection from "./khatmas/ChatKhatmasSection";
import useKhatmasContentStore from "@/stores/khatmasContentStore";

export default function ChatRightBar({ changeNameHeader }) {
  const { activeTabStore } = useKhatmasContentStore();
const [activeTab, setActiveTab] = useState({activeTabStore}); 
  
  useEffect(()=> {
    setActiveTab(activeTabStore);
  }, []);

  const setActive = (prop) => {
    setActiveTab(prop);
  }
  
  return (
    <div 
      style={{ width: "480px" }} 
      className="border-l border-[var(--g-color)] bg-[var(--main-color)] h-[var(--height)]"
    >
      <div className="flex p-7 gap-8 justify-between">
        <div 
          onClick={() => setActive('brothers')} 
          className={`cursor-pointer font-bold text-l ${activeTab === 'brothers' ? 'text-blue-500' : 'text-white'}`}
        >
          Brothers
        </div>
        <div 
          onClick={() => setActive('groups')} 
          className={`cursor-pointer font-bold text-l ${activeTab === 'groups' ? 'text-blue-500' : 'text-white'}`}
        >
          Groups
        </div>
        <div 
          onClick={() => setActive('khatmas')} 
          className={`cursor-pointer font-bold text-l ${activeTab === 'khatmas' ? 'text-blue-500' : 'text-white'}`}
        >
          Khatmas
        </div>
      </div>

      <div>
        {activeTab === 'brothers' && <ChatBrotherSection changeNameHeader={changeNameHeader} />}
        {activeTab === 'groups' && <ChatGroupsSection changeNameHeader={changeNameHeader} />}
        {activeTab === 'khatmas' && <ChatKhatmasSection />}
      </div>
    </div>
  );
}
