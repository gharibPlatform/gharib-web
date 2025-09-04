"use client";
import SideBar from "../../components/common/sidebar/Sidebar";

const layout = ({ children }) => {
  return (
    <div className="w-screen h-screen">
      <div className="w-screen overflow-x-hidden">
        <SideBar />
        {children}
      </div>
    </div>
  );
};

export default layout;
