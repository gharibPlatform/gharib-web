"use client";
import SideBar from "../../../components/common/sidebar/Sidebar";

const layout = ({ children }) => {
  return (
    <div className="w-screen h-screen flex">
      <div className="w-[80px] h-full">
        <SideBar />
      </div>

      <div className="flex-1 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
};

export default layout;
