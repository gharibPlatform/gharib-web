import { useState } from "react";
import ChatBrotherCard from "./ChatBrotherCard";
import ChatBrotherSection from "./ChatBrothersSection";
import ChatGroupsSection from "./ChatGroupsSection";
import KhatmaSection from "./KhatmaSection";

export default function ChatRightBar({ changeNameHeader }) {
    const BLUE_COLOR = "#7575ff"
    const WHITE_COLOR = "#fff"

    const [brothersBool, setBrothersBool] = useState(false)
    const [brothersStyle, setBrothersStyle] = useState(WHITE_COLOR)
    
    const toggleBrotherBool = () => {
        setBrothersStyle(BLUE_COLOR);
        setGroupsStyle(WHITE_COLOR);
        setKhatmaStyle(WHITE_COLOR);
        setBrothersBool(true);
        setGroupsBool(false);
        setKhatmaBool(false);
    }

    const [groupsBool, setGroupsBool] = useState(false)
    const [groupsStyle, setGroupsStyle] = useState(WHITE_COLOR)

    const toggleGroupsBool = () => {
        setBrothersStyle(WHITE_COLOR);
        setKhatmaStyle(WHITE_COLOR);
        setGroupsStyle(BLUE_COLOR);
        setGroupsBool(true);
        setBrothersBool(false);
        setKhatmaBool(false);

    }

    const [khatmaBool, setKhatmaBool] = useState(false)
    const [khatmaStyle, setKhatmaStyle] = useState(WHITE_COLOR)

    const toogleKhatmaBool = () => {
        setBrothersStyle(WHITE_COLOR);
        setGroupsStyle(WHITE_COLOR);
        setKhatmaStyle(BLUE_COLOR);
        setGroupsBool(false);
        setBrothersBool(false);
        setKhatmaBool(true);
    }


    return(
        <div style={{width: "680px"}} class="border-l border-[var(--g-color)] bg-[var(--main-color)] h-screen">
            <div class="flex  p-7 gap-8 justify-between">
                <div onClick={()=>toggleBrotherBool()} style={{color: `${brothersStyle}`}} class="cursor-pointer font-bold text-l">Brothers</div>
                <div onClick={()=>toggleGroupsBool()} style={{color: `${groupsStyle}`}} class="cursor-pointer font-bold text-l">Groups</div>
                <div onClick={()=>toogleKhatmaBool()} style={{color: `${khatmaStyle}`}} class="cursor-pointer font-bold text-l">Khatmat</div>
            </div>

            <div >

                {brothersBool ?
                    <ChatBrotherSection changeNameHeader={changeNameHeader} /> : <div ></div>
                }

                {groupsBool ?
                    <ChatGroupsSection changeNameHeader={changeNameHeader} /> : <div ></div>
                }

                {khatmaBool ?
                    <KhatmaSection  /> : <div></div>
                }

            </div>

        </div>
    )
}
