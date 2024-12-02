'use client'
import Header from "@/components/common/header/Header";
import SideBar from "@/components/common/sidebar/Sidebar";
import ChatRightBar from "@/components/chat/ChatRightBar";
import "../../app/globals.css"
import ChatContent from "@/components/chat/ChatContent";
import { useState } from "react";
import { Cairo } from "next/font/google";

const cairo = Cairo({
    subsets: ['latin'], 
    weight: ['400', '700'], 
    variable: '--font-cairo', 
  });

export default function ChatPage() {

    const [nameHeader, setNameHeader ]= useState("")
    const changeNameHeader = (prop) => {
        setNameHeader(prop);
    }

    return<>
        <main className={cairo.variable} >
            <Header />
            
            <div class="flex h-[var(--height)]">
                <SideBar />
                <ChatContent nameHeader={nameHeader} />
                <ChatRightBar changeNameHeader={changeNameHeader} />
            </div>
        </main>
    </>
}
