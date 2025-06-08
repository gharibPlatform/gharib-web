"use client"
import SettingsSideBar from "@/components/settings/SettingsSideBar";
import Header from "@/components/common/header/Header";

export default function page({children}) {
    return(
        <div>
            <Header />
            <SettingsSideBar />
            <main>
                {children}
            </main>
        </div>
    )
}