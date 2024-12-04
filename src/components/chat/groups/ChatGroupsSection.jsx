import ChatGroupCard from "./ChatGroupCard"
import { useState } from "react";
export default function ChatGroupsSection({ changeNameHeader }) {

    const ARRAY_LENGTH = 5;
    const BACKGROUND_COLOR = "#212121"
    const BACKGROUND_COLOR_NEW = "#323232"

    const groupsDataArray = ["Muslims", "Brothers", "2CP5", "2CP1", "2CP3"];
    const [backgroundColorArray, setBackgroundColorArray] = useState(Array(ARRAY_LENGTH).fill(BACKGROUND_COLOR))

    const handleClick = (group, i) => {

        setBackgroundColorArray(prevBackgroundColor => 
            prevBackgroundColor.map((element, index) => 
                (index === i ? `${BACKGROUND_COLOR_NEW}` : `${BACKGROUND_COLOR}`)
            )
        )

        changeNameHeader(group);
    }

    return(
        <div >
            {groupsDataArray.map( (group, index) => (
                <ChatGroupCard backgroundColor={backgroundColorArray[index]} key={index} index={index} handleClick={handleClick} Name={group} />))}
        </div>
    )
}