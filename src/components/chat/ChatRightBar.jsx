import { useState } from "react";
import ChatBrotherCard from "./Brothers/ChatBrotherCard";
import ChatBrotherSection from "./Brothers/ChatBrothersSection";
import ChatGroupsSection from "./Groups/ChatGroupsSection";
import ChatKhatmasSection from "./Khatmas/ChatKhatmasSection";

export default function ChatRightBar({ changeNameHeader }) {
    const BLUE_COLOR = "#7575ff"
    const WHITE_COLOR = "#fff"

    const [brothersBool, setBrothersBool] = useState(false)
    const [brothersStyle, setBrothersStyle] = useState(WHITE_COLOR)
    
    const toggleBrotherBool = () => {
        setBrothersStyle(BLUE_COLOR);
        setGroupsStyle(WHITE_COLOR);
        setKhatmasStyle(WHITE_COLOR);
        setBrothersBool(true);
        setGroupsBool(false);
        setKhatmasBool(false);
    }

    const [groupsBool, setGroupsBool] = useState(false)
    const [groupsStyle, setGroupsStyle] = useState(WHITE_COLOR)

    const toggleGroupsBool = () => {
        setBrothersStyle(WHITE_COLOR);
        setKhatmasStyle(WHITE_COLOR);
        setGroupsStyle(BLUE_COLOR);
        setGroupsBool(true);
        setBrothersBool(false);
        setKhatmasBool(false);

    }

    const [khatmasBool, setKhatmasBool] = useState(false)
    const [khatmaStyle, setKhatmasStyle] = useState(WHITE_COLOR)

    const toogleKhatmasBool = () => {
        setBrothersStyle(WHITE_COLOR);
        setGroupsStyle(WHITE_COLOR);
        setKhatmasStyle(BLUE_COLOR);
        setGroupsBool(false);
        setBrothersBool(false);
        setKhatmasBool(true);
    }


    return(
        <div style={{width: "680px"}} class="border-l border-[var(--g-color)] bg-[var(--main-color)] h-screen">
            <div class="flex  p-7 gap-8 justify-between">
                <div onClick={()=>toggleBrotherBool()} style={{color: `${brothersStyle}`}} class="cursor-pointer font-bold text-l">Brothers</div>
                <div onClick={()=>toggleGroupsBool()} style={{color: `${groupsStyle}`}} class="cursor-pointer font-bold text-l">Groups</div>
                <div onClick={()=>toogleKhatmasBool()} style={{color: `${khatmaStyle}`}} class="cursor-pointer font-bold text-l">Khatmat</div>
            </div>

            <div >

                {brothersBool ?
                    <ChatBrotherSection changeNameHeader={changeNameHeader} /> : <div ></div>
                }

                {groupsBool ?
                    <ChatGroupsSection changeNameHeader={changeNameHeader} /> : <div ></div>
                }

                {khatmasBool ?
                    <ChatKhatmasSection  /> : <div></div>
                }

            </div>

        </div>
    )
}
