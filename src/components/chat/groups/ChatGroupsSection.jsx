"use client";
import { useEffect, useState } from "react";
import ChatGroupCard from "./ChatGroupCard";
import useNameHeaderStore from "../../../stores/nameHeaderStore";
import useGroupStore from "../../../stores/groupStore";
import { useRouter } from "next/navigation";
import useUiStore from "../../../stores/uiStoreStore";

export default function ChatGroupsSection() {
    const BACKGROUND_COLOR = "#212121";
    const BACKGROUND_COLOR_NEW = "#323232";

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const setNameHeader = useNameHeaderStore((state) => state.setNameHeader);
    const { setActiveTab } = useUiStore();
    const { groups, fetchGroups } = useGroupStore();
    const router = useRouter();
    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                await fetchGroups();
            } catch (err) {
                console.error("Error fetching groups:", err);
                setError("Failed to load groups. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    const handleClick = (group, index) => {
        setActiveIndex(index);
        setActiveTab("group");
        setNameHeader(group);
        router.push(`/chat/groups/${group.id}`);
    };

    const groupList = groups?.results || [];

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

    if (groupList.length === 0) {
        return (
            <div className="flex justify-center items-center h-20">
                <p className="text-[var(--g-color)]">No groups found</p>
            </div>
        );
    }

    return (
        <div>
            {groupList.map((group, index) => (
                <ChatGroupCard
                    key={group.id}
                    index={index}
                    Name={group.name}
                    backgroundColor={
                        index === activeIndex ? BACKGROUND_COLOR_NEW : BACKGROUND_COLOR
                    }
                    handleClick={() => handleClick(group, index)}
                />
            ))}
        </div>
    );
}
