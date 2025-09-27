"use client";
import SideBar from "../../../components/common/sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <SideBar />
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 w-full overflow-hidden">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
