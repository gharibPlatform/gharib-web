import ChatHeader from "../chat/ChatHeader";
import KhatmasProgress from "./KhatmasProgress";
import Personal from "./expandContent/Personal"
import Group from "./expandContent/Group"
import Members from "./expandContent/Members"

export default function KhatmasContent() {
    return(
        <div className="flex w-full flex-col h-[var(--height)] overflow-y-auto">
            <div className="flex w-full flex-col ">
                <div className="w-full">
                    <ChatHeader Name={"Group1"} />
                </div>
                <KhatmasProgress />
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