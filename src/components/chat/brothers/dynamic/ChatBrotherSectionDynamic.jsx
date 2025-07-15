import { useState, useEffect, use } from "react";
import ChatBrotherCard from "./ChatBrotherCard";
import { useRouter, useParams } from "next/navigation";
import useNameHeaderStore from "../../../../stores/nameHeaderStore";
import useKhatmasContentStore from "../../../../stores/khatmasStore";
import { useChatActions } from "../../../../context/ChatActionContext";

export default function ChatBrotherSection() {
    const BACKGROUND_COLOR = "#212121";
    const BACKGROUND_COLOR_NEW = "#323232";
    
    const {friends, loading} = useChatActions();
    
    const [activeIndex, setActiveIndex] = useState(null); 

    const setNameHeader = useNameHeaderStore((state) => state.setNameHeader);
    const router = useRouter();
    const updateKhatmasContent = useKhatmasContentStore((state) => state.updateKhatmasContent);

    const nameStore = useParams();

    useEffect(() => {
        if (!nameStore) return; 
        let foundIndex = brothersDataArray.findIndex((data) => data === nameStore.name);
        if (foundIndex !== -1) {
            setActiveIndex(foundIndex);
        }
    }, [nameStore]);

    const handleCardClick = (brother, i) => {
        setActiveIndex(i); 
        updateKhatmasContent({ activeTabStore: "brothers" });
        setNameHeader(brother);
        router.push(`/chat/brothers/${brother}`);
    };
    
    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                friends.map((brother, index) => (
                    <ChatBrotherCard
                        backgroundColor={index === activeIndex ? BACKGROUND_COLOR_NEW : BACKGROUND_COLOR}
                        key={index}
                        handleClick={handleCardClick}
                        Name={brother}
                        index={index}
                    />
                ))
            )}
        </div>
    );
}
