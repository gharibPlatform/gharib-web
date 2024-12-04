import ChatHeader from "../chat/ChatHeader";
import KhatmasProgress from "./KhatmasProgress";
import { useState } from "react";
function Personal() {
    const [rotate, setRotate] = useState(90);

    const changeRotation = () => {
        if (rotate == 180) {
            setRotate(270);
        }else{
            setRotate(180);
        }
    }

    return(
        <div>
            <div className="flex items-center cursor-pointer gap-4 text-2xl text-[var(--w-color)] pl-6 pt-12" onClick={changeRotation}>
                Personal
                <svg style={{transform: `rotate(${rotate}deg)`}} class="w-6 h-6 transition-all duration-200 ease" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 20L7 12L15 4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </div>
            <div className="flex flex-col gap-4 pl-14 pt-4 text-xl text-[var(--w-color)]">

                <div className="flex gap-12">
                    <p className="flex ">Share</p>
                    <p>from the cow v 1 to the cow v 80 </p>
                </div>

                <div className="flex gap-12">
                    <p className="flex ">Share</p>
                    <p>from the cow v 1 to the cow v 80 </p>
                </div>

                <div className="flex gap-12">
                    <p className="flex ">Share</p>
                    <p>from the cow v 1 to the cow v 80 </p>
                </div>

                <div className="flex gap-12">
                    <p className="flex ">Share</p>
                    <p>from the cow v 1 to the cow v 80 </p>
                </div>

            </div>
        </div>
    )
}
export default function KhatmasContent() {
    return(
        <div className="flex w-full flex-col h-screen overflow-y-auto">
            <div className="flex w-full flex-col ">
                <div className="w-full">
                    <ChatHeader Name={"Group1"} />
                </div>
                <KhatmasProgress />
            </div>

            <div className="flex flex-col">
                <Personal />
            </div>

        </div>
        
    )
}