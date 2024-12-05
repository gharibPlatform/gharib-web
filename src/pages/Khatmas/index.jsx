import Header from "@/components/common/header/Header";
import "../../../src/app/globals.css"
import SideBar from "@/components/common/sidebar/Sidebar";
import KhatmasContent from "@/components/khatmas/KhatmasContent";
import ChatRightBar from "@/components/chat/ChatRightBar";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Khatmas() {

    const [nameHeader, setNameHeader ]= useState("")
    const router = useRouter();

    const changeNameHeader = (prop) => {
        setNameHeader(prop);
        router.push(`/Chat/${prop}`);
    }

    return(
        <div >
            <Header />

            <div className="flex " >
                <SideBar />
                <KhatmasContent nameHeader={nameHeader}  />
                <ChatRightBar changeNameHeader={changeNameHeader} />
            </div>
            
        </div>
    )
}