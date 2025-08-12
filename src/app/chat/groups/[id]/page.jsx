"use client";
import { useParams } from "next/navigation";
import ChatContent from "../../../../components/chat/chat_content/ChatContent";
import useNameHeaderStore from "../../../../stores/nameHeaderStore";
import { useEffect, useState } from "react";
import useGroupStore from "../../../../stores/groupStore";
import useChatStore from "../../../../stores/useChatStore";
import webSocketInstance from "@/utils/chat/socket/webSocketInstance";

const Page = () => {
  const { id } = useParams();
  const { group, fetchOneGroup } = useGroupStore();
  const setNameHeader = useNameHeaderStore((state) => state.setNameHeader);

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
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);

  useEffect(() => {
    if (messages.length > 0) {
      setIsLoadingMessages(false);
    }
  }, [messages]);

  return (
    <div className="h-full">
      <ChatContent
        nameHeader={group?.name}
        groupBool={true}
        chatId={id}
        messages={messages}
        isLoadingMessages={isLoadingMessages}
      />
    </div>
  );
};

export default Page;
