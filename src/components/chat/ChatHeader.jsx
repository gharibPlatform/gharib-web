"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import useGroupSidebarStore from "../../stores/groupSidebarStore";
import OpenMenu from "../common/open menu/OpenMenu";

export default function ChatHeader({ Name }) {
  const [isClicked, setIsClicked] = useState(false);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const pathname = usePathname();
  const { isGroupSidebarOpen, setGroupSidebar } = useGroupSidebarStore();
  //#585858 svg color
  // Check if the route matches "/chat/brothers/[name]" or "/chat/groups/[name]"
  const isBrotherRoute = pathname.startsWith("/chat/brothers/");
  const isGroupRoute = pathname.startsWith("/chat/groups/");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsClicked(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div className="h-20 border-b border-[var(--g-color)] flex p-4 items-center gap-4">
        <Image
          src={"/electron.svg"}
          className="w-14 h-14 cursor-pointer"
          width={1}
          height={1}
          alt="accountImage"
        />

        {/* Clicking the title toggles Zustand state for groups */}
        <h2
          className="text-[var(--w-color)] text-xl cursor-pointer"
          onClick={() => {
            if (isGroupRoute) {
              setGroupSidebar(!isGroupSidebarOpen);
            }
          }}
        >
          {Name}
        </h2>
        {isGroupRoute && (
          <svg
            className={`w-8 h-8 ml-auto cursor-pointer`}
            onClick={() => setGroupSidebar(!isGroupSidebarOpen)}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M12 7.01001V7.00002M12 17L12 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke={isGroupSidebarOpen ? "#fff" : "#585858"}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
            </g>
          </svg>
        )}
        {/* Show the menu button only for "brother/[name]" */}
        {isBrotherRoute && (
          <div
            onClick={() => setIsClicked((prev) => !prev)}
            className="h-12 w-12 py-2 px-1 hover:bg-[var(--main-color)] cursor-pointer mr-2 ml-auto flex flex-col gap-1 items-center justify-center rounded-full"
            ref={menuButtonRef}
          >
            <div className="h-1 w-1 bg-[var(--g-color)]"></div>
            <div className="h-1 w-1 bg-[var(--g-color)]"></div>
            <div className="h-1 w-1 bg-[var(--g-color)]"></div>
          </div>
        )}
      </div>

      {/* Show OpenMenu when isClicked is true */}
      {isClicked && (
        <div ref={menuRef}>
          <OpenMenu />
        </div>
      )}
    </div>
  );
}
