import { useState } from "react";
import Create from "../common/iconButtons/Create";

export default function InputChat({ onSendMessage }) {
  const [message, setMessage] = useState(""); 

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message); 
      setMessage(""); 
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="border border-[var(--g-color)] rounded-xl flex items-center justify-center w-full p-1 pr-2 mb-2">
      <input
        className="focus:outline-none rounded-xl placeholder-gray-500 bg-[var(--dark-color)] h-9 pl-4 pr-4 text-[var(--w-color)] mr-6 w-full"
        placeholder="Message..."
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)} 
        onKeyPress={handleKeyPress} 
      />
      <button onClick={handleSend} className="hover:opacity-80">
        <Create fill={"#585858"} />
      </button>
    </div>
  );
}