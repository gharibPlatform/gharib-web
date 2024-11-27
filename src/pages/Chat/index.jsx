import Header from "@/components/common/header/Header";
import SideBar from "@/components/common/sidebar/Sidebar";
import ChatLeftBar from "@/components/common/leftbar/ChatLeftBar";
import "../../app/globals.css"
import ChatContent from "@/components/chat/ChatContent";

export default function ChatPage() {
    return<>
        <Header />
        
        <div class="flex h-[var(--height)]">
            <SideBar />
            <ChatContent />
            <ChatLeftBar />
        </div>
    </>
}
