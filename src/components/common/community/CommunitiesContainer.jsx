import CommunityButton from "./CommunityButton";
import { useRef } from "react";
function CommunitiesContainer( { isOpen }) {
    const iconPath = "./public/electron.svg"    

    return (
    <>
        <CommunityButton communityName="Muslims" communityIcon={iconPath} />
        <CommunityButton communityName="Gharibs" communityIcon={iconPath} />
        <CommunityButton communityName="Brothers" communityIcon={iconPath} />
    </>
    );
}

export default CommunitiesContainer;