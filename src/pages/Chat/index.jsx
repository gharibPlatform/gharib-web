import Header from "@/components/common/header/Header";
import SideBar from "@/components/common/sidebar/Sidebar";
import ChatLeftBar from "@/components/common/leftbar/ChatLeftBar";
import "../../app/globals.css"
export default function ChatPage() {
    return<>
        <Header />
        <SideBar />
        <ChatLeftBar />
    </>
}