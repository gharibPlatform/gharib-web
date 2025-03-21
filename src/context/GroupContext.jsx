import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { createGroup, getGroups } from "@/utils/apiGroup";

const GroupContext = createContext();

export function GroupProvider({ children }) {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGroups();
    }, []);

    async function fetchGroups() {
        try {
        const data = await getGroups();
            setGroups(data);
        } catch (error) {
            console.error("Failed to fetch groups: ", error);
        } finally {
            setLoading(false);
        }
    }    
           
    const handleCreateGroup = async (data) => {
        try {
            await createGroup(data);
            await fetchGroups();
        } catch (error) {
            console.error("Failed to block user:", error);
        }
    };

    return (
        <GroupContext.Provider value={{ handleCreateGroup, groups, loading }} >
            {children}
        </GroupContext.Provider>
    );
}

export function useGroupContext() {
  return useContext(GroupContext);
}
