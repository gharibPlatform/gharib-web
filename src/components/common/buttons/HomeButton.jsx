import SidebarLink from "../sidebar/SidebarLink";
import { House } from "lucide-react";

export default function HomeButton() {
    return (
        <SidebarLink href="/home">
            <House className="w-8 h-8 text-[var(--w-color)]" />
        </SidebarLink>
    );
}
