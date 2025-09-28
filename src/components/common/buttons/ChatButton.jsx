import SidebarLink from "../sidebar/SidebarLink.jsx";
import { MessageCircleMore } from "lucide-react";

export default function ChatButton() {
    return (
        <SidebarLink href="/chat">
            <MessageCircleMore className="w-8 h-8 text-[var(--w-color)]" />
        </SidebarLink>
    );
}
