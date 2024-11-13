import stylesSideBar from "../sidebar/Sidebar.module.css"
import { useState } from "react";
import CommunitiesContainer from "./CommunitiesContainer";
import "./Transition.css"

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
        <div className={stylesSideBar.community}>
            <div onClick={ handleClick } className={stylesSideBar.community_scrol}>
                <p>COMMUNITIES </p>
                <svg style={{transform: `rotate(${rotate}deg)`}} className={stylesSideBar.back_arrow} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 20L7 12L15 4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </div>

            <CommunitiesContainer isOpen={isOpen} />
        </div>
    </>
}
export default Community;