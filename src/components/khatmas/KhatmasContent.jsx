import ChatHeader from "../chat/ChatHeader";
import KhatmasProgress from "./KhatmasProgress";
import { useState } from "react";

function PersonalContent() {
    return(
        <div className="flex flex-col gap-6 pl-14 pt-4 text-xl text-[var(--w-color)]">
            
        <div className="flex gap-24">
            <p className="flex ">Share</p>
            <p>from the cow v 1 to the cow v 80 </p>
        </div>
            
        <div className="flex gap-24">
            <p className="flex ">Pages</p>
            <p>8 pages</p>
        </div>
            
        <div className="flex gap-12">
            <p className="flex ">Remaining</p>
            <p className="pl-1">2 pages </p>
        </div>
            
        <div className="flex gap-24">
            <p className="flex ">Status</p>
            <p>incomplete</p>
        </div>
            
        </div>
    )
}

function Personal() {
    const [rotatePersonal, setRotatePersonal] = useState(180);

    const changeRotation = () => {
        if (rotatePersonal == 180) {
            setRotatePersonal(270);
        }else{
            setRotatePersonal(180);
        }
    }
    const [isPersonal, setIsPersonal] = useState(false);
    const togglePersonal = () => {
        setIsPersonal(!isPersonal);
    }

    const handleClick = () => {
        changeRotation();
        togglePersonal();
    }

    return(
        <div>
            <div className="flex items-center cursor-pointer gap-4 text-2xl text-[var(--w-color)] pl-6 pt-12" onClick={handleClick}>
                Personal
                <svg style={{transform: `rotate(${rotatePersonal}deg)`}} class="w-6 h-6 transition-all duration-200 ease" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 20L7 12L15 4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </div>
            {isPersonal? <PersonalContent /> : <div />}
        </div>
    )
}

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

        </div>
        
    )
}