"use client";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Page() {
  const pathname = usePathname();

  if (pathname === "/settings") {
    redirect("/settings/account");
  }

  return null;
}
