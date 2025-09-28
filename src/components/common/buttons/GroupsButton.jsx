import { Users } from "lucide-react";
import SidebarLink from "../sidebar/SidebarLink";

export default function GroupsButton() {
  return (
        <SidebarLink href="/groups" >
            <Users className="w-8 h-8 text-[var(--w-color)]" />
        </SidebarLink>
  );
}
