"use client";
import SettingsSideBar from "../../../components/settings/SettingsSideBar";
import SideBar from "../../../components/common/sidebar/Sidebar.jsx";

const Layout = ({ children }) => {
    return (
        <div className="w-screen h-screen flex flex-col overflow-hidden">
            <div className="flex h-full">
                <SideBar />
                <SettingsSideBar />
                <div className="mx-auto flex w-full no-scrollbar overflow-y-auto overflow-x-hidden">
                    <div className=" flex-grow no-scrollbar">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
