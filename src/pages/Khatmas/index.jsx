import Header from "@/components/common/header/Header";
import "../../../src/app/globals.css"
import SideBar from "@/components/common/sidebar/Sidebar";
import KhatmasContent from "@/components/khatmas/KhatmasContent";
import ChatRightBar from "@/components/chat/ChatRightBar";

export default function Khatmas() {
    return(
        <div >
            <Header />

            <div className="flex " >
                <SideBar />
                <KhatmasContent />
                <ChatRightBar />
            </div>
            
        </div>
    )
}