import { useEffect, useState, useRef } from "react";
import CreateDM from "./create dm/CreateDM";

export default function ChatRightBar() {
  const [showCreateDM, setShowCreateDM] = useState(false);
  const createDMRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (createDMRef.current && !createDMRef.current.contains(event.target)) {
        setShowCreateDM(false);
      }
    }
    if (showCreateDM) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCreateDM]);

  return (
    <div className=" w-[420px] border-r border-[var(--g-color)] bg-[var(--main-color)] h-[var(--height)]">
      <div className="flex flex-col px-4 gap-2 pt-4">
        <h2 className="text-[var(--lighter-color)] text-white text-xl font-bold">
          Messages
        </h2>
        <button
          className="text-white cursor-pointer bg-blue-600 p-2 rounded-[6px] hover:bg-blue-700"
          onClick={() => setShowCreateDM(true)}
        >
          Create New Group
        </button>
      </div>

      {showCreateDM && (
        <div className="fixed inset-0 bg-no-repeat bg-cover flex justify-center items-center z-50">
          <div className="absolute inset-0 pointer-events-none"></div>

          <div ref={createDMRef}>
            <CreateDM close={() => setShowCreateDM(false)} />
          </div>
        </div>
      )}

      <DirectMessagesSection />
    </div>
  );
}
