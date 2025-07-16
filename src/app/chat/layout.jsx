"use client";
import ChatRightBar from "../../components/chat/ChatRightBar";
import GroupSideBar from "../../components/chat/group sidebar/GroupSidebar";
import Header from "../../components/common/header/Header";
import SideBar from "../../components/common/sidebar/Sidebar";
import useGroupSidebarStore from "../../stores/groupSidebarStore";
import { ChatActionsProvider } from "../../context/ChatActionContext";
const Layout = ({ children }) => {
  const { isGroupSidebarOpen } = useGroupSidebarStore();

  return (
    <ChatActionsProvider>
      <div className="w-screen overflow-hidden h-screen flex flex-col">
        <Header />
        <div className="flex">
          <div className="pt-14 flex w-full">
            <SideBar />
            <div className="border-r border-[var(--g-color)]">
              {isGroupSidebarOpen ? <GroupSideBar /> : <ChatRightBar />}
            </div>
            <div className="h-screen flex-grow">{children}</div>
          </div>
        </div>
      </div>
    </ChatActionsProvider>
  );
};

export default Layout;
