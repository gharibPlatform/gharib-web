import Header from "@/components/common/header/Header";
import SideBar from "@/components/common/sidebar/Sidebar";
import ChatLeftBar from "@/components/common/leftbar/ChatLeftBar";
import "../../app/globals.css"
import { WidthProvider } from "@/components/context/WidthContext";

export default function ChatPage() {
    return<>
        <Header />
        
        <WidthProvider>
            <div class="flex justify-between">
                <SideBar />
                <ChatLeftBar />
            </div>
        </WidthProvider>       
    </>
}
