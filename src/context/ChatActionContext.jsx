import { createContext, useContext } from "react";
import { getFriends, blockUser, deleteBrother } from "@/utils/apiUser";
import { useState, useEffect } from "react";

const ChatActionsContext = createContext();

export function ChatActionsProvider({ children }) {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFriends() {
          try {
            const data = await getFriends();
            setFriends(data);
          } catch (error) {
            console.error("Failed to fetch friends:", error);
          } finally {
            setLoading(false);
          }
        }
    
        fetchFriends();
    }, []);
       
    const handleBlockUser = async (userId) => {
        try {
            await blockUser(userId);
            setFriends((prevFriends) => prevFriends.filter((friend) => friend.id !== userId));
        } catch (error) {
            console.error("Failed to block user:", error);
        }
    };
    
    const handleDeleteBrother = async (userId) => {
        try {
          await deleteBrother(userId);
          setFriends((prevFriends) => prevFriends.filter((friend) => friend.id !== userId));
        } catch (error) {
        console.error("Failed to delete chat:", error);
        }
    };

  return (
    <ChatActionsContext.Provider value={{ handleDeleteBrother, handleBlockUser, friends, loading }}>
      {children}
    </ChatActionsContext.Provider>
  );
}

export function useChatActions() {
  return useContext(ChatActionsContext);
}
