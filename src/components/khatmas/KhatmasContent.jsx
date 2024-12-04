import ChatHeader from "../chat/ChatHeader";
import KhatmasProgress from "./KhatmasProgress";

export default function KhatmasContent() {
    return(
        <div className="flex w-full flex-col">
            <div className="w-full">
                <ChatHeader Name={"Group1"} />
            </div>
            <KhatmasProgress />
        </div>
    )
}