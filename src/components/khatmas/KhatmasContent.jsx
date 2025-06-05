import ChatHeader from "../chat/ChatHeader";
import KhatmasProgress from "./KhatmasProgress";
import Personal from "./expandContent/progress/Personal"
import Group from "./expandContent/progress/Group"
import Members from "./expandContent/progress/Members"
import { postKhatmaMembership } from "@/utils/apiKhatma";

const joinKhatma = () => {
    return(
        <div>real</div>
    )
}

export default function KhatmasContent( { nameHeader }) {
    
    return(
        <div className="flex w-full flex-col h-[var(--height)] overflow-y-auto no-scrollbar">
            <div className="flex w-full flex-col relative">
                <ChatHeader Name={nameHeader} GroupBool={true} />
                
                <KhatmasProgress />
                <div className="flex items-center justify-center">
                    <button className="hover:bg-[var(--b-color-hover)] py-2 px-5 text-[var(--w-color)] bg-[var(--b-color)] rounded-[4px] ">
                        Join
                    </button>
                </div>
            </div>

            <div className="flex flex-col">
                <Personal />
            </div>

            <div className="flex flex-col">
                <Group />
            </div>

            <div className="flex flex-col">
                <Members />
            </div>
        </div>
        
    )
}