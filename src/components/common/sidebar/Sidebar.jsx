import ChatButton from "../buttons/ChatButton"
import HomeButton from "../buttons/HomeButton"
import ExploreButton from "../buttons/ExploreButton"
import ProgressButton from "../buttons/ProgressButton"
import TerminologyButton from "../buttons/TerminologyButton"

function Top() {
    return<>
        <div class="inline-block flex-col w-min pt-4">
                <HomeButton />
                <ChatButton />
                <ExploreButton />
                <ProgressButton />
                <TerminologyButton />
        </div>
        
    </>
}

import Community from "../community/Community"
import { useWidth } from "../../context/WidthContext"
import { useRef, useEffect, useState } from "react"
function SideBar() {

    const { setWidth } = useWidth();
    const firstRef = useRef(null);

    useEffect(() => {
        const updateWidth = () => {
            if (firstRef.current) {
                setWidth(firstRef.current.offsetWidth);
            }
        };

        updateWidth();
        window.addEventListener("resize", updateWidth);

        return () => window.removeEventListener("resize", updateWidth);
    }, [setWidth]);
  
    return <>
        <div ref={firstRef} class="w-min border-r border-[var(--g-color)] bg-[var(--main-color)] h-screen inline-block">
            <Top />
            <div class="mt-2 h-px bg-[var(--g-color)]"></div>
            <Community />
        </div>
    </>
}

export default SideBar;