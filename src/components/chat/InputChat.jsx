import { useState } from "react";
import Create from "../common/iconButtons/Create";
import CreateKhatma from "./khatmas/CreateKhatma";

export default function InputChat({ onSendMessage }) {
  const [message, setMessage] = useState(""); 

  const [showCreateKhatmaConfirmation, setShowCreateKhatmaConfirmation] = useState(false);
  const showKhatmaRef = useRef(null);

  // Close the modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (showKhatmaRef.current && !showKhatmaRef.current.contains(event.target)) {
        setShowCreateKhatmaConfirmation(false);
      }

    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const handleClick = () => {
  }

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
      <button onClick={ () => setShowCreateKhatmaConfirmation(true)} className="hover:opacity-80">
        <Create fill={"#585858"} />
      </button>

      {showCreateKhatmaConfirmation && (
        <container className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center z-50">
          <div className="absolute inset-0 pointer-events-none"></div>
          <div ref={showKhatmaRef}>
            <CreateKhatma />
          </div>
        </container>
      )}

    </div>
  );
}