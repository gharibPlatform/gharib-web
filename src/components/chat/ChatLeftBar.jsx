import { useState } from "react";
import ChatBrotherCard from "./ChatBrotherCard";
import ChatBrotherSection from "./ChatBrothersSection";
import ChatGroupsSection from "./ChatGroupsSection";

export default function ChatLeftBar({ changeNameHeader }) {
    const BLUE_COLOR = "#7575ff"
    const WHITE_COLOR = "#fff"

    const [brothersBool, setBrothersBool] = useState(false)
    const [brothersStyle, setBrothersStyle] = useState(WHITE_COLOR)
    
    const toggleBrotherBool = () => {
        setBrothersStyle(BLUE_COLOR);
        setGroupsStyle(WHITE_COLOR);
        setBrothersBool(true);
        setGroupsBool(false);
    }

    const [groupsBool, setGroupsBool] = useState(false)
    const [groupsStyle, setGroupsStyle] = useState(WHITE_COLOR)

    const toggleGroupsBool = () => {
        setBrothersStyle(WHITE_COLOR);
        setGroupsStyle(BLUE_COLOR);
        setGroupsBool(true);
        setBrothersBool(false);
    }

    return(
        <div style={{width: "680px"}} class="border-l border-[var(--g-color)] bg-[var(--main-color)] h-screen">
            <div class="flex  p-7 gap-8 justify-between">
                <div onClick={()=>toggleBrotherBool()} style={{color: `${brothersStyle}`}} class="cursor-pointer font-bold text-xl">Brothers</div>
                <div onClick={()=>toggleGroupsBool()} style={{color: `${groupsStyle}`}} class="cursor-pointer font-bold text-xl">Groups</div>
            </div>

            <div >

                {brothersBool ?
                    <ChatBrotherSection changeNameHeader={changeNameHeader} /> : <div ></div>
                }

                {groupsBool ?
                    <ChatGroupsSection changeNameHeader={changeNameHeader} /> : <div ></div>
                }

            </div>

        </div>
    )
}
