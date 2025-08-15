"use client";
import { useParams, useRouter } from "next/navigation";
import ChatContent from "../../../../components/chat/chat_content/ChatContent";
import useNameHeaderStore from "../../../../stores/nameHeaderStore";
import { useEffect, useState } from "react";
import useGroupStore from "../../../../stores/groupStore";
import useChatStore from "../../../../stores/useChatStore";
import useChatWebSocket from "../../../../hooks/socket/useChatWebSocket.js";
import authMiddleware from "../../../../utils/authMiddleware";

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const { group, fetchOneGroup } = useGroupStore();
  const setNameHeader = useNameHeaderStore((state) => state.setNameHeader);

  useEffect(() => {
    const isAuthenticated = authMiddleware.checkAuth();
  }, []);

  useEffect(() => {
    fetchOneGroup(id);
  }, [id]);

  useEffect(() => {
    setNameHeader(group?.name);
  }, [group]);

  const { chats, openChat } = useChatStore();

  useEffect(() => {
    openChat(id);
  }, []);

  const messages = chats[id]?.messages || [];
  const [messageState, setMessageState] = useState({
    isLoading: true,
    hasMessages: false,
  });

  const { isConnected, sendMessage } = useChatWebSocket(id, true);

  useEffect(() => {
    if (!messages) return;
    if (messages.length > 0) {
      setMessageState({
        isLoading: false,
        hasMessages: true,
      });
    } else if (isConnected) {
      setMessageState({
        isLoading: false,
        hasMessages: false,
      });
    }
  }, [messages, isConnected]);

  return (
    <div className="h-full">
      <ChatContent
        sendMessage={sendMessage}
        nameHeader={group?.name}
        groupBool={true}
        chatId={id}
        messages={messages}
        isLoadingMessages={messageState.isLoading}
        isThereMessages={messageState.hasMessages}
      />
    </div>
  );
};

export default Page;
