import { useEffect, useState } from "react";
import ChatGroupCard from "./ChatGroupCard";
import { useRouter, useParams } from "next/navigation";
import useNameHeaderStore from "@/stores/nameHeaderStore";
import useKhatmasContentStore from "@/stores/khatmasContentStore";
import { getGroups } from "@/utils/apiGroup";

export default function ChatGroupsSection() {
    const BACKGROUND_COLOR = "#212121";
    const BACKGROUND_COLOR_NEW = "#323232";

    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const nameStore = useParams();

    const setNameHeader = useNameHeaderStore((state) => state.setNameHeader);
    const router = useRouter();
    const [activeIndex, setActiveIndex] = useState(null);
    const updateKhatmasContent = useKhatmasContentStore((state) => state.updateKhatmasContent);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                setLoading(true);
                const groupsData = await getGroups();
                console.log(groupsData);
                setGroups(groupsData.results);
                
                if (nameStore.name) {
                    const foundIndex = groupsData.results.findIndex(group => 
                        group.name === nameStore.name || group.id === nameStore.name
                    );
                    if (foundIndex !== -1) {
                        setActiveIndex(foundIndex);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch groups:", err);
                setError("Failed to load groups. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchGroups();
    }, [nameStore.name]);

    const handleClick = (group, i) => {
        setActiveIndex(i);
        updateKhatmasContent({ activeTabStore: "groups" });
        setNameHeader(group); 
        router.push(`/chat/groups/${group.id}`); 
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-20">
                <p className="text-[var(--g-color)]">Loading groups...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-20">
                <p className="text-[var(--bright-r-color)]">{error}</p>
            </div>
        );
    }

    if (groups.length === 0) {
        return (
            <div className="flex justify-center items-center h-20">
                <p className="text-[var(--g-color)]">No groups found</p>
            </div>
        );
    }

    return (
        <div>
            {groups.map((group, index) => (
                <ChatGroupCard
                    backgroundColor={index === activeIndex ? BACKGROUND_COLOR_NEW : BACKGROUND_COLOR}
                    key={group.id}
                    index={index}
                    handleClick={() => handleClick(group, index)}
                    Name={group.name}
                />
            ))}
        </div>
    );
}