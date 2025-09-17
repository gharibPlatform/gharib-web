"use client"

import SettingsSideBar from "../../../components/settings/SettingsSideBar";
import SideBar from "../../../components/common/sidebar/Sidebar.jsx";

const Layout = ({ children }) => {
  return (
    <div className="w-full min-h-screen flex flex-col overflow-hidden">
      <div className="flex h-screen">
        <div className="">
          <SideBar />
        </div>

        <SettingsSideBar />
        
        <div className="flex-1 flex w-full min-w-0 overflow-hidden">
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="p-4 md:p-6 md:pb-4 pb-24">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
