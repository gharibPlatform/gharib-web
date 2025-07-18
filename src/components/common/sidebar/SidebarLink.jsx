"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarLink = ({ href, children }) => {
  const pathname = usePathname();

  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link href={href}>
      <div
        className={`p-2 hover:bg-[var(--main-color-hover)] rounded-md cursor-pointer transition-all duration-100 ease-in 
          ${isActive ? "bg-[var(--main-color-hover)]" : ""}`}
      >
        {children}
      </div>
    </Link>
  );
};

export default SidebarLink;
