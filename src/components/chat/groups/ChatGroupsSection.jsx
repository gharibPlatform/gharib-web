// ChatGroupsSection component
import { useEffect, useState } from "react";
import ChatGroupCard from "./ChatGroupCard";
import { useRouter, useParams } from "next/navigation";
import useNameHeaderStore from "@/stores/nameHeaderStore";
import useKhatmasContentStore from "@/stores/khatmasContentStore";

export default function ChatGroupsSection() {
    const BACKGROUND_COLOR = "#212121";
    const BACKGROUND_COLOR_NEW = "#323232";

    const groupsDataArray = ["Muslims", "Brothers", "2CP5", "2CP1", "2CP3"];
    const nameStore = useParams();

    useEffect(()=> {
        let foundIndex = groupsDataArray.findIndex((data)=> data === nameStore.name);
        if (foundIndex !== -1) {
            console.log(foundIndex);
            setActiveIndex(foundIndex);
        }
    }, [nameStore])

    const setNameHeader = useNameHeaderStore((state) => state.setNameHeader);
    // const setGroupBool = useNameHeaderStore((state) => state.setGroupBool);
    const router = useRouter();
    const [activeIndex, setActiveIndex] = useState(null); 

    const updateKhatmasContent = useKhatmasContentStore((state) => state.updateKhatmasContent);
    const handleClick = (group, i) => {
        setActiveIndex(i);
        updateKhatmasContent({activeTabStore: "groups" });
        setNameHeader(group); 
        // setGroupBool(true); 
        router.push(`/chat/groups/${group}`);
    };

    return (
        <div>
            {groupsDataArray.map((group, index) => (
                <ChatGroupCard
                    backgroundColor={index === activeIndex ? BACKGROUND_COLOR_NEW : BACKGROUND_COLOR}
                    key={index}
                    index={index}
                    handleClick={handleClick}
                    Name={group}
                />
            ))}
        </div>
    );
}
