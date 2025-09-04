"use client";
import ChatRightBar from "../../components/chat/ChatRightBar";
import GroupSideBar from "../../components/chat/group sidebar/GroupSidebar";
import SideBar from "../../components/common/sidebar/Sidebar";
import useGroupSidebarStore from "../../stores/groupSidebarStore";

const Layout = ({ children }) => {
  const { isGroupSidebarOpen } = useGroupSidebarStore();

  return (
    <div className="w-screen overflow-hidden h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <div className="relative overflow-visible">
          <SideBar />
        </div>
        <ChatRightBar />

        <div className="flex flex-col flex-1 overflow-hidden">{children}</div>

        {isGroupSidebarOpen && <GroupSideBar />}
      </div>
    </div>
  );
};

export default Layout;
