import SidebarLink from "../sidebar/SidebarLink.jsx";
import { BookOpen } from "lucide-react";
export default function ChatButton() {
    return (
        <SidebarLink href="/quran">
            <BookOpen className="w-8 h-8 text-[var(--w-color)]" />
        </SidebarLink>
    );
}
