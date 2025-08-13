import useChatWebSocket from "../../../hooks/socket/useChatWebSocket.js";
import ChatUIContainer from "./ChatUIContainer.jsx";

export default function ChatContent({
  isLoadingMessages,
  groupBool,
  chatId,
  messages,
  isThereMessages,
}) {
  const { sendMessage } = useChatWebSocket(chatId, groupBool);

  return (
    <div className="h-full w-full">
      <ChatUIContainer
        sendMessage={sendMessage}
        isLoadingMessages={isLoadingMessages}
        messages={messages}
        chatId={chatId}
        isThereMessages={isThereMessages}
      />
    </div>
  );
}
