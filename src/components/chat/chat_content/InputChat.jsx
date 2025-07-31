import Create from "../../common/iconButtons/Create";
import CreateKhatma from "../khatmas/CreateKhatma";
import { useState, useEffect, useRef } from "react";

export default function InputChat({ handleKeyPress, value, handleOnChange, handleSendMessage }) {
  const [showCreateKhatmaConfirmation, setShowCreateKhatmaConfirmation] =
    useState(false);
  const showKhatmaRef = useRef(null);

  // Close the modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        showKhatmaRef.current &&
        !showKhatmaRef.current.contains(event.target)
      ) {
        setShowCreateKhatmaConfirmation(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="border-t border-[var(--g-color)] flex items-center justify-center w-full py-4 px-4">
      <div className="w-full px-4">
        <input
          className="focus:outline-none px-2 py-1 rounded-sm border border-[var(--g-color)] placeholder-gray-500 bg-[var(--secondary-color)] text-[var(--w-color)] w-full"
          placeholder="Message..."
          type="text"
          value={value}
          onChange={handleOnChange}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => setShowCreateKhatmaConfirmation(true)}
          className="hover:opacity-80"
        >
          <Create fill={"#585858"} />
        </button>

        <button
        onClick={handleSendMessage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#585858"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>

        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#585858"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            />
          </svg>
        </button>
      </div>

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
