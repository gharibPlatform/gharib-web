import SidebarLink from "../sidebar/SidebarLink.jsx";
import { ChartColumnIncreasing } from "lucide-react";

export default function KhatmasButton() {
  return (
    <SidebarLink href="/khatmas">
      <ChartColumnIncreasing className="w-8 h-8 text-[var(--w-color)]" />
    </SidebarLink>
  );
}
