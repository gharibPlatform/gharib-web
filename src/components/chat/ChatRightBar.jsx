import { useEffect, useState, useRef } from "react";
import ChatBrotherSection from "./brothers/ChatBrothersSection";
import ChatGroupsSection from "./groups/ChatGroupsSection";
import ChatKhatmasSection from "./khatmas/ChatKhatmasSection";
import useKhatmasContentStore from "../../stores/khatmasStore";
import Tooltip from "../common/tooltip/Tooltip";
import CreateDM from "./create dm/CreateDM";

export default function ChatRightBar({ changeNameHeader }) {
  const { activeTabStore } = useKhatmasContentStore();
  const [activeTab, setActiveTab] = useState(activeTabStore); 
  const [showCreateDM, setShowCreateDM] = useState(false);
  const createDMRef = useRef(null);

  useEffect(() => {
    setActiveTab(activeTabStore);
  }, []);

  const setActive = (prop) => {
    setActiveTab(prop);
  };

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (createDMRef.current && !createDMRef.current.contains(event.target)) {
        setShowCreateDM(false);
      }
    }
    if (showCreateDM) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCreateDM]);

  return (
    <div  
      className=" w-[360px] border-l border-[var(--g-color)] bg-[var(--main-color)] h-[var(--height)]"
    >
      <div className="flex p-7 pb-[27px] gap-8 justify-between border-b border-[var(--g-color)]">
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

      {activeTab !== 'khatmas' && (
        <div className="flex justify-between items-center">
          <h2 className="text-[var(--lighter-color)] p-5 pb-0">Direct Messages</h2>
          <Tooltip text="Create a DM" top={0} right={0}>
            <h2 
              className="text-[var(--lighter-color)] p-5 pb-0 pr-12 text-2xl cursor-pointer"
              onClick={() => setShowCreateDM(true)}
            >
              +
            </h2>
          </Tooltip>
        </div>
      )}

      {showCreateDM && (
        <div 
          className="fixed inset-0 bg-no-repeat bg-cover flex justify-center items-center z-50"
        >
          {/* This makes everything unclickable */}
          <div className="absolute inset-0 pointer-events-none"></div>
          
          {/* The popup itself is clickable */}
          <div ref={createDMRef}>
            <CreateDM close={() => setShowCreateDM(false)} />
          </div>
        </div>
      )}

      <div>
        {activeTab === 'brothers' && <ChatBrotherSection changeNameHeader={changeNameHeader} />}
        {activeTab === 'groups' && <ChatGroupsSection changeNameHeader={changeNameHeader} />}
        {activeTab === 'khatmas' && <ChatKhatmasSection />}
      </div>
    </div>
  );
}
