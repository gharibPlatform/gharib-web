"use client";
import ChatRightBar from "../../components/chat/ChatRightBar";
import Header from "../../components/common/header/Header";
import SideBar from "../../components/common/sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="w-screen overflow-hidden h-screen flex flex-col">
      <Header />
      <div className="flex">
        <SideBar />
        <div className="flex w-full">
          <div className="h-screen flex-grow">{children}</div>
          <div>
            <ChatRightBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
