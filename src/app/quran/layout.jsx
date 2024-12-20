"use client";
import Header from "@/components/common/header/Header";
import QuranRightBar from "@/components/common/quran/QuranRightBar";
import SideBar from "@/components/common/sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
        <div className="w-screen overflow-hidden h-screen flex flex-col">
          <Header />
          <div className="flex">
            <SideBar />
            <div className=" ml-72 mr-72 pt-14 flex w-full">
              <div className="h-screen flex-grow">
                {children}
              </div>
            </div>
            <QuranRightBar />
          </div>
        </div>
  );
};

export default Layout;
