import { useState } from "react";
import Image from "next/image";
import OpenMenu from "@/components/common/open menu/OpenMenu";

export default function GroupSideBar() {
    const brothersDataArray = ["Malek", "Moh", "Zohir", "Walid", "Moussa"];
    const adminName = "Malek"; 
    const [openMenuFor, setOpenMenuFor] = useState(null); // Track which card's menu is open

    return (
        <div className="flex justify-between flex-col p-6 w-[360px] border-l border-[var(--g-color)] bg-[var(--main-color)] h-[var(--height)]">
            <div className="flex-col flex-nowrap w-full h-min">
                <h2 className="text-lg font-semibold text-[var(--w-color)] mb-2">Group Members</h2>
                <div className="mb-4">
                    {brothersDataArray.map((brother) => (
                        <GroupSidebarCard
                            key={brother}
                            name={brother}
                            isAdmin={brother === adminName}
                            isMenuOpen={openMenuFor === brother} // Pass whether this card's menu is open
                            onClick={() => {
                                // Close the menu if it's already open for this card, otherwise open it
                                setOpenMenuFor(openMenuFor === brother ? null : brother);
                            }}
                        />
                    ))}
                </div>
            </div>
            <div className="flex gap-2 flex-col mt-auto justify-center items-center">
                <button className="w-full py-2 px-4 text-[var(--r-color)] hover:bg-[var(--main-color-hover)] ">
                    Delete Chat
                </button>
                <button className="w-full py-2 px-4 text-[var(--w-color)] hover:bg-[var(--g-color)]">
                    Leave Group
                </button>
            </div>
        </div>
    );
}

function GroupSidebarCard({ name, isAdmin, isMenuOpen, onClick }) {
    return (
        <div
            className="relative flex items-center justify-between p-3 hover:bg-[var(--main-color-hover)] cursor-pointer"
            onClick={onClick} // Use the onClick handler passed from the parent
        >
            <div className="flex justify-between items-center gap-2">
                <Image src={"/electron.svg"} className="w-12 h-12 cursor-pointer" width={1} height={1} alt="accountImage" />
                <span className="text-[var(--w-color)]">{name}</span>
            </div>
            {isAdmin && (
                <svg 
                 className="h-6 w-6"  fill="#ffffff" height="200px" width="200px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 245.01 245.01" xmlSpace="preserve">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"> 
                        <path d="M244.914,188.109l-9.951-133.345c-0.39-5.22-4.738-9.256-9.973-9.256h-31.994v54.413h2.666c2.571,0,4.737,1.92,5.047,4.473 l4.181,34.545c0.073,0.344,0.112,0.7,0.112,1.066c0,2.808-2.276,5.083-5.084,5.083c-0.005,0-0.013,0.001-0.02,0h-28.805 c-1.455,0-2.84-0.623-3.805-1.711c-0.965-1.089-1.417-2.539-1.242-3.982l4.236-35c0.31-2.553,2.476-4.473,5.047-4.473h2.666V45.509 H20c-5.234,0-9.583,4.036-9.973,9.256l-10,133.992c-0.207,2.773,0.751,5.509,2.644,7.547c1.892,2.039,4.548,3.197,7.329,3.197 h224.99c0.008,0,0.016,0.001,0.02,0c5.523,0,10-4.478,10-10C245.01,189.028,244.978,188.564,244.914,188.109z"></path> 
                    </g>
                </svg>
            )}

            {isMenuOpen && (
                <div className="absolute right-0 top-12 z-10">
                    <OpenMenu Name={name} />
                </div>
            )}
        </div>
    );
}