import { useState } from "react";
import ChatBrotherCard from "./ChatBrotherCard";
import ChatBrotherSection from "./ChatBrothersSection";
import ChatGroupsSection from "./ChatGroupsSection";

export default function ChatLeftBar({ changeNameHeader }) {

    const [brothersBool, setBrothersBool] = useState(false)
    const toggleBrotherBool = () => {
        setBrothersBool(true);
        setGroupsBool(false);
    }

    const [groupsBool, setGroupsBool] = useState(false)
    const toggleGroupsBool = () => {
        setGroupsBool(true);
        setBrothersBool(false);
    }

    return(
        <div style={{width: "680px"}} class="border-l border-[var(--g-color)] bg-[var(--main-color)] h-screen">
            <div class="flex  p-7 gap-8 justify-between">
                <div onClick={()=>toggleBrotherBool()} class="cursor-pointer text-[var(--w-color)] text-xl">Brothers</div>
                <div onClick={()=>toggleGroupsBool()} class="cursor-pointer text-[var(--w-color)] text-xl">Groups</div>
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
