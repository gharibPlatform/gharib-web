"use client";
import Header from "@/components/common/header/Header";
import SettingsSideBar from "@/components/settings/SettingsSideBar";

const Layout = ({ children }) => {
  return (
    <div className="w-screen overflow-hidden h-screen flex flex-col">
        <Header />
        <div className="flex">
        <SettingsSideBar />
        <div className="ml-72 pt-14 flex w-full">
            <div className="h-screen flex-grow">
                {children}
            </div>
        </div>
        </div>
    </div>
  );
};

export default Layout;
