"use client";
import Header from "@/components/common/header/Header";
import QuranRightBar from "@/components/common/quran/QuranRightBar";
import SideBar from "@/components/common/sidebar/Sidebar";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // or any other icons you prefer

const Layout = ({ children }) => {
  const [showRightBar, setShowRightBar] = useState(true);

  const toggleRightBar = () => {
    setShowRightBar(!showRightBar);
  };

  return (
    <div className="w-screen overflow-hidden h-screen flex flex-col">
      <Header />
      <div className="flex">
        <SideBar />
        <div className={`ml-72 pt-14 flex w-full ${showRightBar ? 'mr-64' : 'mr-0'}`}>
          <div className="h-screen flex-grow">
            {children}
          </div>
        </div>
        {showRightBar && <QuranRightBar />}
        
        {/* Toggle Button */}
        <button
          onClick={toggleRightBar}
          className={`fixed top-1/2 transform -translate-y-1/2 z-30 p-2 bg-[var(--main-color)] border border-[var(--g-color)] text-[var(--g-color)] rounded-full shadow-md hover:bg-[var(--secondary-color)] transition-all ${
            showRightBar ? 'right-64' : 'right-0'
          }`}
        >
          {showRightBar ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>
    </div>
  );
};

export default Layout;