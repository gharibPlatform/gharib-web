import ChatHeader from "../chat/ChatHeader";
import KhatmasProgress from "./KhatmasProgress";
import Personal from "./expandContent/progress/Personal"
import Group from "./expandContent/progress/Group"
import Members from "./expandContent/progress/Members"

export default function KhatmasContent( { nameHeader }) {

    return(
        <div className="flex w-full flex-col h-[var(--height)] overflow-y-auto">
            <div className="flex w-full flex-col relative">
                <ChatHeader Name={nameHeader} GroupBool={true} />
                
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