import { useState } from "react";
import CommunitiesContainer from "./CommunitiesContainer";

function Community() {
    const communityIcon = "./public/electron.svg"
    const [rotate, setRotate] = useState(90);

    const changeRotation = () => {
        if (rotate == 90) {
            setRotate(270);
        }else{
            setRotate(90);
        }
    }

    const [isOpen, setIsOpen] = useState(false);

    const toggleCommunity = () => {
        setIsOpen(!isOpen);
    }

    const handleClick = () => {
        changeRotation();
        toggleCommunity();
    }

    return <>
        <div className="border-b border-[var(--g-color)]">
            <div onClick={ handleClick } className="flex items-center gap-11 text-lg p-5 p-b-0 p-t-0 c-[var(--w-color)] cursor-pointer text-[var(--w-color)]">
                <p>COMMUNITIES </p>
                <svg style={{transform: `rotate(${rotate}deg)`}} className="w-7 h-7 transition-all duration-200 ease" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 20L7 12L15 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </div>
            {isOpen? 
                <CommunitiesContainer isOpen={isOpen} /> : <div className="div"></div>
            }
        </div>
    </>
}
export default Community;