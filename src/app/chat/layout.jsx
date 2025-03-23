"use client";
import ChatRightBar from "@/components/chat/ChatRightBar";
import GroupSideBar from "@/components/chat/group sidebar/GroupSidebar";
import Header from "@/components/common/header/Header";
import SideBar from "@/components/common/sidebar/Sidebar";
import useGroupSidebarStore from "@/stores/groupSidebarStore";
import { ChatActionsProvider } from "@/context/ChatActionContext";
import { KhatmaProvider } from "@/context/KhatmaContext";
const Layout = ({ children }) => {
  const { isGroupSidebarOpen }  = useGroupSidebarStore();

  return (
    <KhatmaProvider>
      <ChatActionsProvider>
        <div className="w-screen overflow-hidden h-screen flex flex-col">
          <Header />
          <div className="flex">
            <SideBar />
            <div className="ml-72 pt-14 flex w-full">
              <div className="h-screen flex-grow">
                {children}
              </div>
              <div>
                {isGroupSidebarOpen ? <GroupSideBar /> : <ChatRightBar />}
              </div>
            </div>
          </div>
        </div>
      </ChatActionsProvider>
    </KhatmaProvider>
  );
};

export default Layout;
